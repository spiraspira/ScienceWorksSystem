import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, TextField, Button, Select, MenuItem } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContestActions from '../actions/ContestActions';
import ReportActions from '../actions/ReportActions';
import GradeActions from '../actions/GradeActions';

const TeacherSecondTourSection = ({ contestId, programCommitteeMemberId }) => {
    const [contest, setContest] = useState(null);
    const [nominations, setNominations] = useState([]);
    const [grades, setGrades] = useState([]);
    const [newGrades, setNewGrades] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const contestInfo = await ContestActions.getContestInfo(contestId);
                setContest(contestInfo);

                const allReports = await ReportActions.getAllReportsOfContest(contestId);

                const allNominations = await ContestActions.getContestNominations(contestId);
                setNominations(allNominations);

                const allGrades = await Promise.all(
                    allReports.map(async (report) => {
                        const reportGrades = await GradeActions.getGradesOfReportOfTeacher(report.id, programCommitteeMemberId);
                        return { ...report, grades: reportGrades };
                    })
                );
                setGrades(allGrades);
            } catch (error) {
                toast.error('Ошибка получения данных: ' + error.message);
            }
        };

        fetchData();
    }, [contestId, programCommitteeMemberId]);

    const handleGradeSubmit = async (reportId, newGrade) => {
        try {
            await GradeActions.create(newGrade);
            toast.success('Оценка добавлена!');
            setNewGrades((prevGrades) => ({
                ...prevGrades,
                [reportId]: { nominationId: '', reportGrade: 0, text: '' },
            }));
        } catch (error) {
            toast.error('Ошибка добавления оценки: ' + error.message);
        }
    };

    return (
        <Box className="teacher-second-tour-section">
            <ToastContainer />
            {contest && (
                <Box>
                    <Typography variant="h4" className="section-title">Teacher Second Tour Section</Typography>
                    <Grid container spacing={2} className="report-grid">
                        {grades.map((report) => (
                            <Grid item xs={12} key={report.id} className="report-item">
                                <Paper elevation={3} sx={{ p: 2 }} className="report-paper">
                                    <Typography variant="h6" className="report-name">{report.name}</Typography>
                                    <Typography variant="body1" className="report-author">Author: {report.author}</Typography>
                                    <Box>
                                        <Typography variant="h6" className="grades-title">Grades:</Typography>
                                        {report.grades.map((grade) => (
                                            <Box key={grade.id} className="grade-item">
                                                <Typography variant="body1" className="grade-info">
                                                    Report Grade: {grade.reportGrade}, Text: {grade.text}, Date: {grade.date}, Nomination: {grade.nomination?.name}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                    {contest?.dateStartSecondTour <= new Date().toISOString() && contest?.dateEnd >= new Date().toISOString() && (
                                        <Box>
                                            <Typography variant="h6" className="new-grade-title">Add New Grade:</Typography>
                                            <Grid container spacing={2} className="new-grade-form">
                                                <Grid item xs={4}>
                                                    <Select
                                                        value={newGrades[report.id]?.nominationId || ''}
                                                        onChange={(e) =>
                                                            setNewGrades((prevGrades) => ({
                                                                ...prevGrades,
                                                                [report.id]: { ...prevGrades[report.id], nominationId: e.target.value },
                                                            }))
                                                        }
                                                        className="nomination-select"
                                                    >
                                                        <MenuItem value="">Select Nomination</MenuItem>
                                                        {nominations.map((nomination) => (
                                                            <MenuItem key={nomination.id} value={nomination.id}>
                                                                {nomination.name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <TextField
                                                        label="Grade Text"
                                                        value={newGrades[report.id]?.text || ''}
                                                        onChange={(e) =>
                                                            setNewGrades((prevGrades) => ({
                                                                ...prevGrades,
                                                                [report.id]: { ...prevGrades[report.id], text: e.target.value },
                                                            }))
                                                        }
                                                        className="grade-text-input"
                                                    />
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <TextField
                                                        label="Report Grade"
                                                        type="number"
                                                        InputProps={{ inputProps: { min: 1, max: 10 } }}
                                                        value={newGrades[report.id]?.reportGrade || 0}
                                                        onChange={(e) =>
                                                            setNewGrades((prevGrades) => ({
                                                                ...prevGrades,
                                                                [report.id]: { ...prevGrades[report.id], reportGrade: parseInt(e.target.value) },
                                                            }))
                                                        }
                                                        className="report-grade-input"
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Button
                                                        variant="contained"
                                                        onClick={() =>
                                                            handleGradeSubmit(report.id, {
                                                                text: newGrades[report.id].text,
                                                                reportGrade: newGrades[report.id].reportGrade,
                                                                programCommitteeMemberId,
                                                                reportId: report.id,
                                                                nominationId: newGrades[report.id].nominationId,
                                                            })
                                                        }
                                                        className="submit-grade-button"
                                                    >
                                                        Submit Grade
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    )}
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}
        </Box>
    );
};

export default TeacherSecondTourSection;