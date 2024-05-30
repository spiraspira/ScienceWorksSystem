import React, { useState, useEffect } from 'react';
import ReportActions from '../actions/ReportActions';
import ContestActions from '../actions/ContestActions';
import GradeActions from '../actions/GradeActions';
import '../App.css';
import { Box, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const InvitedSecondTourSection = ({ contestId }) => {
    const [reports, setReports] = useState([]);
    const [contest, setContest] = useState(null);
    const [gradeInputs, setGradeInputs] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const allReports = await ReportActions.getAllReportsOfContest(contestId);
                setReports(allReports);

                const contestInfo = await ContestActions.getContestInfo(contestId);
                setContest(contestInfo);
            } catch (error) {
                console.error('Ошибка получения данных: ', error.message);
                toast.error('Произошла ошибка при получении данных');
            }
        };

        fetchData();
    }, [contestId]);

    const handleGradeChange = (reportId, grade) => {
        setGradeInputs((prevInputs) => ({
            ...prevInputs,
            [reportId]: grade,
        }));
    };

    const handleGradeSubmit = async (report) => {
        try {
            const updatedReport = { ...report, invitedTeacherGrade: gradeInputs[report.id] };
            await ReportActions.update(updatedReport);
            toast.success('Оценка успешно обновлена!');
        } catch (error) {
            console.error('Ошибка добавления оценки: ', error.message);
            toast.error('Произошла ошибка при обновлении оценки');
        }
    };

    return (
        <Box className="invited-second-tour-section">
            <Typography variant="h2">Второй тур</Typography>
            {reports.map((report) => (
                <Box key={report.id} className="report-item">
                    <Typography variant="h3">{report.name}</Typography>
                    <Typography>Автор: {report.team?.student?.user?.name}</Typography>
                    {report.invitedTeacherGrade !== null ? (
                        <Typography>Ваша оценка: {report.invitedTeacherGrade}</Typography>
                    ) : contest?.dateStartSecondTour <= new Date().toISOString() && contest?.dateEnd >= new Date().toISOString() ? (
                        <Box className="grade-form">
                            <TextField
                                type="number"
                                placeholder="Оценка"
                                value={gradeInputs[report.id] || ''}
                                onChange={(e) => handleGradeChange(report.id, e.target.value)}
                            />
                            <Button onClick={() => handleGradeSubmit(report)}>
                                Отправить
                            </Button>
                        </Box>
                    ) : null}
                </Box>
            ))}
            <ToastContainer />
        </Box>
    );
};

export default InvitedSecondTourSection;