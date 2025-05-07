import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  TextField,
  Button,
  CircularProgress
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
  const [gradeInputs, setGradeInputs] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [contestInfo, allReports] = await Promise.all([
          ContestActions.getContestInfo(contestId),
          ReportActions.getAllReportsOfContest(contestId)
        ]);

        setContest(contestInfo);

        const reportsWithGrades = await Promise.all(
          allReports.map(async (report) => {
            const grades = await GradeActions.getGradesOfReport(report.id);
            return { ...report, grades };
          })
        );
        setReports(reportsWithGrades);
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

  const handleGradeChange = (reportId, grade) => {
    if (!isContestActive()) {
      toast.error('Добавление оценок доступно только в период проведения конкурса');
      return;
    }
    setGradeInputs((prevInputs) => ({
      ...prevInputs,
      [reportId]: grade,
    }));
  };

  const handleGradeSubmit = async (report) => {
    if (!isContestActive()) {
      toast.error('Добавление оценок доступно только в период проведения конкурса');
      return;
    }

    if (!gradeInputs[report.id] || gradeInputs[report.id] < 1 || gradeInputs[report.id] > 5) {
      toast.error('Оценка должна быть от 1 до 5');
      return;
    }

    try {
      const updatedReport = { ...report, grade: gradeInputs[report.id] };
      await ReportActions.update(updatedReport);
      
      // Update local state
      setReports(prev => prev.map(r => 
        r.id === report.id ? updatedReport : r
      ));
      
      toast.success('Итоговая оценка сохранена!');
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
            <TableContainer className="reports-table">
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell className="table-header">Доклад</TableCell>
                    <TableCell className="table-header">Автор</TableCell>
                    <TableCell className="table-header">Оценки жюри</TableCell>
                    <TableCell className="table-header">Итоговая оценка</TableCell>
                    <TableCell className="table-header">Действия</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reports.map((report) => (
                    <TableRow key={report.id} className="report-row">
                      <TableCell>
                        <Typography className="report-name">
                          {report.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {report.team?.student?.user?.name || 'Неизвестно'}
                      </TableCell>
                      <TableCell>
                        {report.grades?.length > 0 ? (
                          <Box className="grades-container">
                            {report.grades.map((grade) => (
                              <Typography key={grade.id} variant="body2" className="grade-item">
                                <strong>{grade.nomination?.name}:</strong> {grade.reportGrade} ({grade.text})
                              </Typography>
                            ))}
                          </Box>
                        ) : (
                          <Typography variant="body2" className="no-grades">
                            Оценки отсутствуют
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        {report.grade !== null ? (
                          <Typography className="final-grade">
                            {report.grade}
                          </Typography>
                        ) : (
                          <Typography className="no-final-grade">
                            Не выставлена
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        {isContestActive() && (
                          <Box className="grade-form">
                            <TextField
                              type="number"
                              size="small"
                              placeholder="Оценка"
                              value={gradeInputs[report.id] || ''}
                              onChange={(e) => handleGradeChange(report.id, e.target.value)}
                              inputProps={{ min: 1, max: 5 }}
                              sx={{ width: '80px', mr: 1 }}
                            />
                            <Button
                              variant="contained"
                              size="small"
                              onClick={() => handleGradeSubmit(report)}
                              disabled={!gradeInputs[report.id]}
                            >
                              Сохранить
                            </Button>
                          </Box>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default HeadSecondTourSection;