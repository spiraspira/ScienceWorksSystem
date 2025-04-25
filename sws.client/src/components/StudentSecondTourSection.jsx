import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Divider, Button } from '@mui/material';
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

  const downloadGrades = async () => {
    const doc = new Document({
      sections: [{
        children: [
          // Add title without creating a new section
          new Paragraph({
            text: "Grades Report",
            heading: HeadingLevel.HEADING_1,
          }),
          // Add a blank paragraph after the title for spacing
          new Paragraph({ text: "" }),
        ],
      }],
    });

    // Keep everything in a single section
    const sectionChildren = [];

    for (const nomination of nominations) {
      // Fetch grades for the current nomination
      const nominationGrades = await GradeActions.getGradesOfNomination(nomination.id, report?.id);

      // Add nomination title
      sectionChildren.push(
        new Paragraph({
          text: `Номинация: ${nomination.name}`,
          heading: HeadingLevel.HEADING_2,
        })
      );

      // Add each grade to the section
      nominationGrades.forEach(grade => {
        sectionChildren.push(
          new Paragraph({
            children: [
              new TextRun(`Оценка: ${grade.reportGrade}`),
              new TextRun(` | Отзыв: ${grade.text}`),
              new TextRun(` | Дата: ${grade.date}`),
              new TextRun(` | Автор: ${grade.programCommitteeMember?.teacher?.user?.name || 'Неизвестно'}`),
            ],
            spacing: { after: 200 }, // Add spacing after each grade entry for readability
          })
        );
      });

      // Add a blank paragraph for spacing between nominations
      sectionChildren.push(new Paragraph({ text: "" }));
    }

    // Append all children to the document section
    doc.addSection({
      children: sectionChildren,
    });

    Packer.toBlob(doc).then(blob => {
      FileSaver.saveAs(blob, "Grades_Report.docx");
    }).catch(err => {
      console.error("Error generating report:", err);
    });
  };

  return (
    <Box className="contest-info-container">
      <ToastContainer />
      <Card className="contest-info-card">
        <CardContent className="contest-info-content">
          <Typography variant="h5" className="contest-title">
            Второй тур
          </Typography>
          
          {nominations.length === 0 ? (
            <Typography variant="body2" className="no-nominations-message">
              Номинации пока не определены
            </Typography>
          ) : (
            <Box className="nominations-container">
              {nominations.map((nomination) => (
                <Box key={nomination.id} className="nomination-item">
                  <Typography variant="h6" className="nomination-title">
                    {nomination.name}
                  </Typography>
                  <Divider className="nomination-divider" />
                  {report && (
                    <NominationGrades 
                      nominationId={nomination.id} 
                      reportId={report?.id} 
                    />
                  )}
                </Box>
              ))}
            </Box>
          )}

          {nominations.length > 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              <Button
                variant="outlined"
                size="small"
                onClick={downloadGrades}
                className="download-grades-btn"
              >
                Скачать оценки
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

const NominationGrades = ({ nominationId, reportId }) => {
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const nominationGrades = await GradeActions.getGradesOfNomination(nominationId, reportId);
        setGrades(nominationGrades);
      } catch (error) {
        toast.error(`Ошибка получения оценок: ${error.message}`);
      }
    };

    fetchGrades();
  }, [nominationId, reportId]);

  return (
    <>
      {grades.length === 0 ? (
        <Typography variant="body2" className="no-grades-message">
          Оценки пока не выставлены
        </Typography>
      ) : (
        <Box className="grades-container">
          {grades.map((grade) => (
            <Card key={grade.id} className="grade-card">
              <CardContent>
                <Typography variant="body1" className="grade-value">
                  <strong>Оценка:</strong> {grade.reportGrade}
                </Typography>
                {grade.text && (
                  <Typography variant="body1" className="grade-text">
                    <strong>Отзыв:</strong> {grade.text}
                  </Typography>
                )}
                <Typography variant="body2" className="grade-meta">
                  <strong>Дата:</strong> {new Date(grade.date).toLocaleDateString('ru-RU', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </Typography>
                <Typography variant="body2" className="grade-meta">
                  <strong>Автор:</strong> {grade.programCommitteeMember?.teacher?.user?.name || 'Неизвестно'}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </>
  );
};

export default StudentSecondTourSection;