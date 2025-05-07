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
  Divider
} from '@mui/material';
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

  const calculateGradeStats = (reportGrades) => {
    if (!reportGrades || reportGrades.length === 0) return null;

    // Group grades by nomination and teacher
    const byNomination = {};
    const byTeacher = {};

    reportGrades.forEach(grade => {
      // Group by nomination
      const nomId = grade.nominationId || 'unknown';
      if (!byNomination[nomId]) {
        byNomination[nomId] = {
          name: grade.nomination?.name || 'Без номинации',
          grades: [],
          teachers: new Set()
        };
      }
      byNomination[nomId].grades.push(grade.reportGrade);
      byNomination[nomId].teachers.add(grade.programCommitteeMemberId);

      // Group by teacher
      const teacherId = grade.programCommitteeMemberId || 'unknown';
      if (!byTeacher[teacherId]) {
        byTeacher[teacherId] = {
          name: grade.programCommitteeMember?.teacher?.user?.name || 'Анонимный член жюри',
          grades: []
        };
      }
      byTeacher[teacherId].grades.push(grade.reportGrade);
    });

    // Calculate averages
    const nominationStats = Object.entries(byNomination).map(([id, data]) => ({
      id,
      name: data.name,
      average: data.grades.reduce((a, b) => a + b, 0) / data.grades.length,
      teacherCount: data.teachers.size,
      gradeCount: data.grades.length
    }));

    const teacherStats = Object.entries(byTeacher).map(([id, data]) => ({
      id,
      name: data.name,
      average: data.grades.reduce((a, b) => a + b, 0) / data.grades.length
    }));

    const overallAverage = nominationStats.length > 0 
      ? nominationStats.reduce((sum, nom) => sum + nom.average, 0) / nominationStats.length
      : 0;

    return {
      byNomination: nominationStats,
      byTeacher: teacherStats,
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
          <Typography variant="h5" className="section-title" sx={{paddingBottom:1}}>
            Второй тур
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
                      <TableContainer className="grades-table" sx={{ mb: 3 }}>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell colSpan={3} className="table-header">
                                Статистика оценок
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              <TableCell>
                                <Typography fontWeight="bold">Общий средний балл:</Typography>
                              </TableCell>
                              <TableCell colSpan={2}>
                                {gradeStats ? gradeStats.overallAverage.toFixed(2) : 'Нет данных'}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>

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
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {gradeStats?.byNomination?.map((nomination) => (
                              <TableRow key={nomination.id}>
                                <TableCell>{nomination.name}</TableCell>
                                <TableCell align="right">{nomination.average.toFixed(2)}</TableCell>
                                <TableCell align="right">{nomination.gradeCount}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>

                      <Typography variant="subtitle1" sx={{ mb: 1 }}>
                        Оценки членов жюри:
                      </Typography>
                      <TableContainer className="grades-table" sx={{ mb: 3 }}>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell className="table-header">Член жюри</TableCell>
                              <TableCell className="table-header">Номинация</TableCell>
                              <TableCell className="table-header" align="right">Оценка</TableCell>
                              <TableCell className="table-header">Комментарий</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {currentGrades.map((grade) => (
                              <TableRow key={grade.id}>
                                <TableCell>
                                  {grade.programCommitteeMember?.teacher?.user?.name || 'Анонимный член жюри'}
                                </TableCell>
                                <TableCell>
                                  {grade.nomination?.name || 'Без номинации'}
                                </TableCell>
                                <TableCell align="right">
                                  {grade.reportGrade}
                                </TableCell>
                                <TableCell>
                                  {grade.text || '-'}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
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
                    {selectedReport.grade !== null ? (
                      <Typography fontWeight="bold" sx={{ fontSize: '1.2rem' }}>
                        {selectedReport.grade}
                      </Typography>
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