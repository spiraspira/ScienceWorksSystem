import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  CircularProgress
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReportActions from '../actions/ReportActions';
import ContestActions from '../actions/ContestActions';
import '../App.css';

const InvitedSecondTourSection = ({ contestId }) => {
    const [reports, setReports] = useState([]);
    const [contest, setContest] = useState(null);
    const [gradeInputs, setGradeInputs] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [allReports, contestInfo] = await Promise.all([
                    ReportActions.getAllReportsOfContest(contestId),
                    ContestActions.getContestInfo(contestId)
                ]);
                
                setReports(allReports);
                setContest(contestInfo);
                
                // Initialize all reports with empty grade inputs
                const initialGrades = {};
                allReports.forEach(report => {
                    initialGrades[report.id] = report.invitedTeacherGrade || '';
                });
                setGradeInputs(initialGrades);
            } catch (error) {
                toast.error(`Ошибка получения данных: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [contestId]);

    const handleGradeChange = (reportId, value) => {
        // Only allow numbers 1-5 or empty string
        if (value === '' || (value >= 1 && value <= 5)) {
            setGradeInputs(prev => ({
                ...prev,
                [reportId]: value === '' ? '' : Number(value)
            }));
        }
    };

    const handleGradeSubmit = async (report) => {
        const grade = gradeInputs[report.id];
        if (!grade || grade < 1 || grade > 5) {
            toast.error('Пожалуйста, введите оценку от 1 до 5');
            return;
        }

        try {
            const updatedReport = { 
                ...report, 
                invitedTeacherGrade: grade 
            };
            await ReportActions.update(updatedReport);
            
            // Update local state
            setReports(prev => prev.map(r => 
                r.id === report.id ? updatedReport : r
            ));
            
            toast.success('Оценка успешно сохранена!');
        } catch (error) {
            toast.error(`Ошибка сохранения оценки: ${error.message}`);
        }
    };

    const isGradingEnabled = contest && 
        new Date(contest.dateStartSecondTour) <= new Date() && 
        new Date(contest.dateEnd) >= new Date();

    if (loading) {
        return (
            <Box className="invited-second-tour-container">
                <CircularProgress className="loading-spinner" />
            </Box>
        );
    }

    return (
        <Box className="invited-second-tour-container">
            <ToastContainer limit={3} />
            <Card className="invited-second-tour-card">
                <CardContent>
                    <Typography variant="h5" className="section-title" sx={{paddingBottom:1}}>
                        Второй тур
                    </Typography>
                    
                    {reports.length === 0 ? (
                        <Typography variant="body2" className="no-reports-message">
                            Работы пока не загружены
                        </Typography>
                    ) : (
                        <TableContainer>
                            <Table className="grading-table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell className="table-header">Название работы</TableCell>
                                        <TableCell className="table-header">Автор</TableCell>
                                        <TableCell className="table-header">Текущая оценка</TableCell>
                                        <TableCell className="table-header">Новая оценка</TableCell>
                                        <TableCell className="table-header">Действия</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {reports.map((report) => (
                                        <TableRow key={report.id} className="table-row">
                                            <TableCell className="table-cell">
                                                <Typography className="report-name">
                                                    {report.name}
                                                </Typography>
                                            </TableCell>
                                            <TableCell className="table-cell">
                                                {report.team?.student?.user?.name || 'Неизвестно'}
                                            </TableCell>
                                            <TableCell className="table-cell">
                                                {report.invitedTeacherGrade !== null ? (
                                                    <Typography className="existing-grade">
                                                        {report.invitedTeacherGrade}
                                                    </Typography>
                                                ) : (
                                                    <Typography className="no-grade">
                                                        Не оценено
                                                    </Typography>
                                                )}
                                            </TableCell>
                                            <TableCell className="table-cell">
                                                <TextField
                                                    type="number"
                                                    variant="outlined"
                                                    size="small"
                                                    className="grade-input"
                                                    value={gradeInputs[report.id] || ''}
                                                    onChange={(e) => handleGradeChange(report.id, e.target.value)}
                                                    inputProps={{
                                                        min: 1,
                                                        max: 5,
                                                        step: 1
                                                    }}
                                                    disabled={!isGradingEnabled}
                                                />
                                            </TableCell>
                                            <TableCell className="table-cell">
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    onClick={() => handleGradeSubmit(report)}
                                                    disabled={
                                                        !isGradingEnabled || 
                                                        !gradeInputs[report.id] || 
                                                        gradeInputs[report.id] === report.invitedTeacherGrade
                                                    }
                                                    className="submit-grade-btn"
                                                >
                                                    {gradeInputs[report.id] === report.invitedTeacherGrade ? 'Сохранено' : 'Сохранить'}
                                                </Button>
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

export default InvitedSecondTourSection;