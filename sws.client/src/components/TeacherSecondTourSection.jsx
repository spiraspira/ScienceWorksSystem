import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Select, 
  MenuItem, 
  TextField, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  CircularProgress,
  IconButton
} from '@mui/material';
import { Edit as EditIcon, Save as SaveIcon, Close as CloseIcon } from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContestActions from '../actions/ContestActions';
import ReportActions from '../actions/ReportActions';
import GradeActions from '../actions/GradeActions';

const TeacherSecondTourSection = ({ contestId, programCommitteeMemberId }) => {
    const [contest, setContest] = useState(null);
    const [reports, setReports] = useState([]);
    const [nominations, setNominations] = useState([]);
    const [grades, setGrades] = useState([]);
    const [selectedReport, setSelectedReport] = useState('');
    const [editingGrade, setEditingGrade] = useState(null);
    const [gradeValue, setGradeValue] = useState(0);
    const [gradeComment, setGradeComment] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [contestInfo, allReports, allNominations] = await Promise.all([
                    ContestActions.getContestInfo(contestId),
                    ReportActions.getAllReportsOfContest(contestId),
                    ContestActions.getContestNominations(contestId)
                ]);

                setContest(contestInfo);
                setReports(allReports);
                setNominations(allNominations);

                if (allReports.length > 0) {
                    setSelectedReport(allReports[0].id);
                }

                const gradesData = await Promise.all(
                    allReports.map(report => 
                        GradeActions.getGradesOfReportOfTeacher(report.id, programCommitteeMemberId)
                    )
                );
                setGrades(gradesData.flat());
            } catch (error) {
                toast.error('Ошибка получения данных: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [contestId, programCommitteeMemberId]);

    const handleEditGrade = (grade) => {
        setEditingGrade(grade.id);
        setGradeValue(grade.reportGrade);
        setGradeComment(grade.text);
    };

    const handleCancelEdit = () => {
        setEditingGrade(null);
        setGradeValue(0);
        setGradeComment('');
    };

    const handleSaveGrade = async (nominationId) => {
        if (gradeValue < 1 || gradeValue > 5) {
            toast.error('Оценка должна быть от 1 до 5');
            return;
        }
    
        try {
            const existingGrade = grades.find(g => 
                g.reportId === selectedReport && 
                g.nominationId === nominationId
            );
    
            if (existingGrade) {
                // Update existing grade with ALL required fields
                await GradeActions.update({
                    id: existingGrade.id,
                    reportGrade: gradeValue,
                    text: gradeComment,
                    reportId: selectedReport,
                    programCommitteeMemberId,
                    nominationId,
                    date: new Date().toISOString() // Include if required
                    // Include other required fields from GradeViewModel
                });
                toast.success('Оценка обновлена!');
            } else {
                // Create new grade (already correct)
                await GradeActions.create({
                    reportGrade: gradeValue,
                    text: gradeComment,
                    programCommitteeMemberId,
                    reportId: selectedReport,
                    nominationId
                });
                toast.success('Оценка добавлена!');
            }
    
            // Refresh grades
            const updatedGrades = await GradeActions.getGradesOfReportOfTeacher(
                selectedReport, 
                programCommitteeMemberId
            );
            
            setGrades(prev => [
                ...prev.filter(g => !(
                    g.reportId === selectedReport && 
                    g.nominationId === nominationId
                )),
                ...updatedGrades
            ]);
    
            handleCancelEdit();
        } catch (error) {
            toast.error('Ошибка сохранения оценки: ' + error.message);
        }
    };

    const isGradingEnabled = contest && 
        new Date(contest.dateStartSecondTour) <= new Date() && 
        new Date(contest.dateEnd) >= new Date();

    if (loading) {
        return (
            <Box className="teacher-second-tour-container">
                <CircularProgress className="loading-spinner" />
            </Box>
        );
    }

    return (
        <Box className="teacher-second-tour-container">
            <ToastContainer limit={3} />
            <Card className="teacher-second-tour-card">
                <CardContent>
                    <Typography variant="h5" className="section-title" sx={{paddingBottom:1}}>
                        Второй тур
                    </Typography>

                    {reports.length === 0 ? (
                        <Typography variant="body2" className="no-reports-message">
                            Доклады пока не загружены
                        </Typography>
                    ) : (
                        <>
                            <Box className="report-selector" sx={{ mb: 3 }}>
                                <Select
                                    value={selectedReport}
                                    onChange={(e) => setSelectedReport(e.target.value)}
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
                                <TableContainer className="grades-table">
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className="table-header">Номинация</TableCell>
                                                <TableCell className="table-header" align="center">Оценка</TableCell>
                                                <TableCell className="table-header">Комментарий</TableCell>
                                                <TableCell className="table-header" align="right">Действия</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {nominations.map((nomination) => {
                                                const grade = grades.find(g => 
                                                    g.reportId === selectedReport && 
                                                    g.nominationId === nomination.id
                                                );

                                                return (
                                                    <TableRow key={nomination.id}>
                                                        <TableCell>{nomination.name}</TableCell>
                                                        
                                                        {editingGrade === (grade?.id || nomination.id) ? (
                                                            <>
                                                                <TableCell align="center">
                                                                    <TextField
                                                                        type="number"
                                                                        value={gradeValue}
                                                                        onChange={(e) => setGradeValue(parseInt(e.target.value) || 0)}
                                                                        size="small"
                                                                        inputProps={{ 
                                                                            min: 1, 
                                                                            max: 10,
                                                                            style: { textAlign: 'center', width: '60px' }
                                                                        }}
                                                                        className="grade-input"
                                                                    />
                                                                </TableCell>
                                                                <TableCell>
                                                                    <TextField
                                                                        value={gradeComment}
                                                                        onChange={(e) => setGradeComment(e.target.value)}
                                                                        size="small"
                                                                        fullWidth
                                                                        className="grade-comment"
                                                                    />
                                                                </TableCell>
                                                                <TableCell align="right">
                                                                    <IconButton
                                                                        onClick={() => handleSaveGrade(nomination.id)}
                                                                        color="primary"
                                                                    >
                                                                        <SaveIcon />
                                                                    </IconButton>
                                                                    <IconButton
                                                                        onClick={handleCancelEdit}
                                                                        color="secondary"
                                                                    >
                                                                        <CloseIcon />
                                                                    </IconButton>
                                                                </TableCell>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <TableCell align="center">
                                                                    {grade?.reportGrade || '-'}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {grade?.text || '-'}
                                                                </TableCell>
                                                                <TableCell align="right">
                                                                    {isGradingEnabled && (
                                                                        <IconButton
                                                                            onClick={() => grade ? 
                                                                                handleEditGrade(grade) : 
                                                                                (() => {
                                                                                    setEditingGrade(nomination.id);
                                                                                    setGradeValue(0);
                                                                                    setGradeComment('');
                                                                                })()
                                                                            }
                                                                            color="primary"
                                                                        >
                                                                            <EditIcon />
                                                                        </IconButton>
                                                                    )}
                                                                </TableCell>
                                                            </>
                                                        )}
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            )}
                        </>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default TeacherSecondTourSection;