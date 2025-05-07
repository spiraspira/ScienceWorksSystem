import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Select, 
  MenuItem, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  TextField,
  Button,
  CircularProgress,
  Divider,
  Collapse,
  IconButton
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContestActions from '../actions/ContestActions';
import ReportActions from '../actions/ReportActions';
import GradeActions from '../actions/GradeActions';
import '../App.css';

const HeadSecondTourSection = ({ contestId }) => {
  const [reports, setReports] = useState([]);
  const [contest, setContest] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [finalGradeInput, setFinalGradeInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [grades, setGrades] = useState([]);
  const [expandedNominations, setExpandedNominations] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [contestInfo, allReports] = await Promise.all([
          ContestActions.getContestInfo(contestId),
          ReportActions.getAllReportsOfContest(contestId)
        ]);

        setContest(contestInfo);
        setReports(allReports);

        // Fetch grades for all reports
        const gradesData = await Promise.all(
          allReports.map(report => 
            GradeActions.getGradesOfReport(report.id)
          )
        );
        
        // Create a map of reportId to grades
        const gradesMap = {};
        allReports.forEach((report, index) => {
          gradesMap[report.id] = gradesData[index];
        });
        setGrades(gradesMap);

        if (allReports.length > 0) {
          setSelectedReport(allReports[0]);
        }
      } catch (error) {
        toast.error('Ошибка при получении данных: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [contestId]);

  const isContestActive = () => {
    if (!contest) return false;
    const now = new Date();
    const start = new Date(contest.dateStartSecondTour);
    const end = new Date(contest.dateEnd);
    return now >= start && now <= end;
  };

  const toggleNominationExpand = (nominationId) => {
    setExpandedNominations(prev => ({
      ...prev,
      [nominationId]: !prev[nominationId]
    }));
  };

  const calculateGradeStats = (reportGrades) => {
    if (!reportGrades || reportGrades.length === 0) return null;

    // Group grades by nomination
    const byNomination = {};

    reportGrades.forEach(grade => {
      const nomId = grade.nominationId || 'unknown';
      if (!byNomination[nomId]) {
        byNomination[nomId] = {
          id: nomId,
          name: grade.nomination?.name || 'Без номинации',
          grades: [],
          teachers: []
        };
      }
      byNomination[nomId].grades.push(grade.reportGrade);
      byNomination[nomId].teachers.push({
        name: grade.programCommitteeMember?.teacher?.user?.name || 'Анонимный член жюри',
        grade: grade.reportGrade,
        comment: grade.text || '-'
      });
    });

    // Calculate averages
    const nominationStats = Object.values(byNomination).map(nomination => ({
      ...nomination,
      average: nomination.grades.reduce((a, b) => a + b, 0) / nomination.grades.length,
      gradeCount: nomination.grades.length
    }));

    const overallAverage = nominationStats.length > 0 
      ? nominationStats.reduce((sum, nom) => sum + nom.average, 0) / nominationStats.length
      : 0;

    return {
      byNomination: nominationStats,
      overallAverage
    };
  };

  const handleFinalGradeSubmit = async () => {
    if (!isContestActive()) {
      toast.error('Добавление оценок доступно только в период проведения конкурса');
      return;
    }

    if (!finalGradeInput || finalGradeInput < 1 || finalGradeInput > 5) {
      toast.error('Оценка должна быть от 1 до 5');
      return;
    }

    try {
      const updatedReport = { 
        ...selectedReport, 
        grade: Number(finalGradeInput) 
      };
      await ReportActions.update(updatedReport);
      
      // Update local state
      setReports(prev => prev.map(r => 
        r.id === selectedReport.id ? updatedReport : r
      ));
      setSelectedReport(updatedReport);
      
      toast.success('Итоговая оценка сохранена!');
      setFinalGradeInput('');
    } catch (error) {
      toast.error('Ошибка при добавлении оценки: ' + error.message);
    }
  };

  const handleEditFinalGrade = () => {
    if (selectedReport?.grade) {
      setFinalGradeInput(selectedReport.grade.toString());
    }
  };

  if (loading) {
    return (
      <Box className="head-second-tour-container">
        <CircularProgress className="loading-spinner" />
      </Box>
    );
  }

  const currentGrades = selectedReport ? grades[selectedReport.id] || [] : [];
  const gradeStats = calculateGradeStats(currentGrades);

  return (
    <Box className="head-second-tour-container">
      <ToastContainer limit={3} />
      <Card className="head-second-tour-card">
        <CardContent>
          <Typography variant="h5" className="section-title">
            Второй тур (Председатель жюри)
            {contest && !isContestActive() && (
              <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                Конкурс завершен. Редактирование оценок недоступно.
              </Typography>
            )}
          </Typography>

          {reports.length === 0 ? (
            <Typography variant="body2" className="no-reports-message">
              Доклады пока не загружены
            </Typography>
          ) : (
            <>
              <Box className="report-selector" sx={{ mb: 3 }}>
                <Select
                  value={selectedReport?.id || ''}
                  onChange={(e) => {
                    const report = reports.find(r => r.id === e.target.value);
                    setSelectedReport(report);
                    setExpandedNominations({});
                  }}
                  fullWidth
                  size="small"
                >
                  {reports.map((report) => (
                    <MenuItem key={report.id} value={report.id}>
                      {report.name} ({report.team?.student?.user?.name || 'Неизвестный автор'})
                    </MenuItem>
                  ))}
                </Select>
              </Box>

              {selectedReport && (
                <Box>
                  <Typography variant="subtitle1" sx={{ mb: 2 }}>
                    Автор: {selectedReport.team?.student?.user?.name || 'Неизвестно'}
                  </Typography>

                  {currentGrades.length > 0 ? (
                    <>
                      <Typography variant="subtitle1" sx={{ mb: 1 }}>
                        Оценки по номинациям:
                      </Typography>
                      <TableContainer className="grades-table" sx={{ mb: 3 }}>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell className="table-header">Номинация</TableCell>
                              <TableCell className="table-header" align="right">Средний балл</TableCell>
                              <TableCell className="table-header" align="right">Кол-во оценок</TableCell>
                              <TableCell className="table-header" align="right"></TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {gradeStats?.byNomination?.map((nomination) => (
                              <React.Fragment key={nomination.id}>
                                <TableRow>
                                  <TableCell>{nomination.name}</TableCell>
                                  <TableCell align="right">{nomination.average.toFixed(2)}</TableCell>
                                  <TableCell align="right">{nomination.gradeCount}</TableCell>
                                  <TableCell align="right">
                                    <IconButton
                                      size="small"
                                      onClick={() => toggleNominationExpand(nomination.id)}
                                    >
                                      {expandedNominations[nomination.id] ? (
                                        <KeyboardArrowUp />
                                      ) : (
                                        <KeyboardArrowDown />
                                      )}
                                    </IconButton>
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell colSpan={4} sx={{ py: 0 }}>
                                    <Collapse in={expandedNominations[nomination.id]} timeout="auto" unmountOnExit>
                                      <Box sx={{ margin: 1 }}>
                                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                          Оценки членов жюри:
                                        </Typography>
                                        <Table size="small">
                                          <TableHead>
                                            <TableRow>
                                              <TableCell>Член жюри</TableCell>
                                              <TableCell align="right">Оценка</TableCell>
                                              <TableCell>Комментарий</TableCell>
                                            </TableRow>
                                          </TableHead>
                                          <TableBody>
                                            {nomination.teachers.map((teacher, index) => (
                                              <TableRow key={index}>
                                                <TableCell>{teacher.name}</TableCell>
                                                <TableCell align="right">{teacher.grade}</TableCell>
                                                <TableCell>{teacher.comment}</TableCell>
                                              </TableRow>
                                            ))}
                                          </TableBody>
                                        </Table>
                                      </Box>
                                    </Collapse>
                                  </TableCell>
                                </TableRow>
                              </React.Fragment>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>

                      <Typography variant="subtitle1" sx={{ mb: 1 }}>
                        Общий средний балл: {gradeStats?.overallAverage.toFixed(2)}
                      </Typography>
                    </>
                  ) : (
                    <Typography variant="body2" sx={{ mb: 3 }}>
                      Нет данных об оценках для этого доклада
                    </Typography>
                  )}

                  <Divider sx={{ my: 3 }} />

                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <Typography variant="subtitle1" sx={{ mr: 2 }}>
                      Итоговая оценка:
                    </Typography>
                    {selectedReport.grade !== null && !finalGradeInput ? (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography fontWeight="bold" sx={{ fontSize: '1.2rem', mr: 2 }}>
                          {selectedReport.grade}
                        </Typography>
                        {isContestActive() && (
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={handleEditFinalGrade}
                          >
                            Изменить
                          </Button>
                        )}
                      </Box>
                    ) : isContestActive() ? (
                      <>
                        <TextField
                          type="number"
                          size="small"
                          placeholder="1-5"
                          value={finalGradeInput}
                          onChange={(e) => setFinalGradeInput(e.target.value)}
                          inputProps={{ min: 1, max: 5 }}
                          sx={{ width: '80px', mr: 2 }}
                        />
                        <Button
                          variant="contained"
                          size="small"
                          onClick={handleFinalGradeSubmit}
                          disabled={!finalGradeInput}
                        >
                          Сохранить
                        </Button>
                        {finalGradeInput && (
                          <Button
                            variant="text"
                            size="small"
                            onClick={() => setFinalGradeInput('')}
                            sx={{ ml: 1 }}
                          >
                            Отмена
                          </Button>
                        )}
                      </>
                    ) : (
                      <Typography color="text.secondary">
                        Не выставлена
                      </Typography>
                    )}
                  </Box>
                </Box>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default HeadSecondTourSection;