import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  Tabs, 
  Tab, 
  CircularProgress
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContestActions from '../actions/ContestActions';
import GradeActions from '../actions/GradeActions';
import ReportActions from '../actions/ReportActions';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";
import * as FileSaver from 'file-saver';
import '../App.css';

const StudentSecondTourSection = ({ contestId }) => {
  const [nominations, setNominations] = useState([]);
  const [report, setReport] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [containerHeight, setContainerHeight] = useState(400);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contestNominations = await ContestActions.getContestNominations(contestId);
        setNominations(contestNominations);

        const userReport = await ReportActions.getReportOfUser(userId, contestId);
        setReport(userReport);
      } catch (error) {
        toast.error(`Ошибка получения номинаций и отчета: ${error.message}`);
      }
    };

    fetchData();
  }, [contestId, userId]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const updateContainerHeight = (height) => {
    if (height > containerHeight) {
      setContainerHeight(height);
    }
  };

  const downloadGrades = async () => {
    try {
      const doc = new Document({
        sections: [{
          children: [
            new Paragraph({
              text: "Grades Report",
              heading: HeadingLevel.HEADING_1,
            }),
            new Paragraph({ text: "" }),
          ],
        }],
      });

      const sectionChildren = [];

      for (const nomination of nominations) {
        try {
          const nominationGrades = await GradeActions.getGradesOfNomination(nomination.id, report?.id);
          
          sectionChildren.push(
            new Paragraph({
              text: `Номинация: ${nomination.name}`,
              heading: HeadingLevel.HEADING_2,
            })
          );

          nominationGrades.forEach(grade => {
            sectionChildren.push(
              new Paragraph({
                children: [
                  new TextRun(`Оценка: ${grade.reportGrade}`),
                  new TextRun(` | Отзыв: ${grade.text}`),
                  new TextRun(` | Дата: ${grade.date}`),
                  new TextRun(` | Автор: ${grade.programCommitteeMember?.teacher?.user?.name || 'Неизвестно'}`),
                ],
                spacing: { after: 200 },
              })
            );
          });

          sectionChildren.push(new Paragraph({ text: "" }));
        } catch (error) {
          console.error(`Error loading grades for nomination ${nomination.id}:`, error);
          continue;
        }
      }

      doc.addSection({
        children: sectionChildren,
      });

      Packer.toBlob(doc).then(blob => {
        FileSaver.saveAs(blob, "Grades_Report.docx");
      });
    } catch (error) {
      toast.error(`Ошибка при создании документа: ${error.message}`);
    }
  };

  const TabPanel = ({ value, index, nomination, report }) => {
    const [grades, setGrades] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [contentHeight, setContentHeight] = useState(0);

    useEffect(() => {
      let isMounted = true;
      
      const fetchGrades = async () => {
        if (value !== index) return;
        
        setLoading(true);
        setError(null);
        try {
          const nominationGrades = await GradeActions.getGradesOfNomination(
            nomination.id, 
            report?.id
          );
          if (isMounted) {
            setGrades(nominationGrades);
          }
        } catch (err) {
          if (isMounted) {
            setError(err.message);
            console.error('Error loading grades:', err);
          }
        } finally {
          if (isMounted) {
            setLoading(false);
          }
        }
      };

      if (report?.id) {
        fetchGrades();
      } else {
        setLoading(false);
        setGrades([]);
      }

      return () => {
        isMounted = false;
      };
    }, [value, index, nomination.id, report?.id]);

    useEffect(() => {
      if (grades.length > 0) {
        // Calculate approximate content height
        const newHeight = 100 + (grades.length * 125); // Base height + 120px per grade card
        setContentHeight(newHeight);
        updateContainerHeight(newHeight);
      }
    }, [grades]);

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`nomination-tabpanel-${index}`}
        aria-labelledby={`nomination-tab-${index}`}
        className="student-second-tour-panel"
      >
        {loading ? (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            height: '100%'
          }}>
            <CircularProgress size={24} />
          </Box>
        ) : error ? (
          <Typography variant="body2" sx={{ color: 'error.main', textAlign: 'center' }}>
            Ошибка загрузки оценок
          </Typography>
        ) : grades.length === 0 ? (
          <Typography variant="body2" sx={{ color: '#616161', fontStyle: 'italic', textAlign: 'center' }}>
            Оценки пока не выставлены
          </Typography>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {grades.map((grade) => (
              <Card 
                key={grade.id} 
                sx={{ 
                  borderRadius: 1,
                  border: '1px solid #e0e0e0',
                  boxShadow: 'none'
                }}
              >
                <CardContent>
                  <Typography variant="body1" sx={{ fontSize: '0.875rem', mb: 1 }}>
                    <strong>Оценка:</strong> {grade.reportGrade}
                  </Typography>
                  {grade.text && (
                    <Typography variant="body1" sx={{ fontSize: '0.875rem', mb: 1, whiteSpace: 'pre-line' }}>
                      <strong>Отзыв:</strong> {grade.text}
                    </Typography>
                  )}
                  <Typography variant="body2" sx={{ fontSize: '0.8125rem', color: '#616161' }}>
                    <strong>Дата:</strong> {new Date(grade.date).toLocaleDateString('ru-RU', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '0.8125rem', color: '#616161' }}>
                    <strong>Автор:</strong> {grade.programCommitteeMember?.teacher?.user?.name || 'Неизвестно'}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </div>
    );
  };

  return (
    <Box className="student-second-tour-container">
      <ToastContainer limit={3} />
      <Card className="student-second-tour-card">
        <CardContent sx={{ p: { xs: 1.5, sm: 3 } }}>
          <Typography variant="h5" sx={{ 
            fontWeight: 600,
            fontSize: { xs: '1.1rem', sm: '1.25rem' },
            mb: 2,
            color: '#212121'
          }}>
            Второй тур
          </Typography>
          
          {nominations.length === 0 ? (
            <Typography variant="body2" sx={{ color: '#616161', fontStyle: 'italic' }}>
              Номинации пока не определены
            </Typography>
          ) : (
            <Box>
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
                className="student-second-tour-tabs"
              >
                {nominations.map((nomination, index) => (
                  <Tab
                    key={nomination.id}
                    label={nomination.name}
                    className="student-second-tour-tab"
                  />
                ))}
              </Tabs>
              
              <Box 
                className="student-second-tour-content"
                style={{ height: containerHeight }}
              >
                {report ? (
                  nominations.map((nomination, index) => (
                    <TabPanel 
                      key={nomination.id}
                      value={activeTab} 
                      index={index}
                      nomination={nomination}
                      report={report}
                    />
                  ))
                ) : (
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    height: '100%'
                  }}>
                    <Typography variant="body2" sx={{ color: '#616161', fontStyle: 'italic' }}>
                      Отчет не загружен
                    </Typography>
                  </Box>
                )}
              </Box>

              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'flex-end', 
                mt: 2,
                px: { xs: 1, sm: 0 }
              }}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={downloadGrades}
                  disabled={!report}
                  sx={{
                    fontSize: '0.8125rem',
                    px: 2,
                    py: 1,
                    textTransform: 'none',
                    borderColor: '#e0e0e0',
                    color: '#616161',
                    '&:hover': {
                      borderColor: '#bdbdbd',
                      backgroundColor: 'rgba(0, 0, 0, 0.04)'
                    },
                    '&:disabled': {
                      opacity: 0.5
                    }
                  }}
                >
                  Скачать все оценки
                </Button>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default StudentSecondTourSection;