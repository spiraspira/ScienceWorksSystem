import React, { useState, useEffect } from 'react';
import ContestActions from '../actions/ContestActions';
import ReportActions from '../actions/ReportActions';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Typography, TextField, Button } from '@mui/material';
import '../App.css';

const InvitedFirstTourSection = ({ contestId }) => {
    const [contestInfo, setContestInfo] = useState(null);
    const [reports, setReports] = useState([]);
    const [newReviewTexts, setNewReviewTexts] = useState({});

    useEffect(() => {
        const fetchContestInfo = async () => {
            try {
                const contest = await ContestActions.getContestInfo(contestId);
                setContestInfo(contest);
            } catch (error) {
                toast.error('Ошибка при получении информации о конкурсе: ' + error.message);
            }
        };

        const fetchReports = async () => {
            try {
                const allReports = await ReportActions.getAllReportsOfContest(contestId);
                setReports(allReports);
            } catch (error) {
                toast.error('Ошибка при получении отчетов: ' + error.message);
            }
        };

        fetchContestInfo();
        fetchReports();
    }, [contestId]);

    const handleNewReviewSubmit = async (report) => {
        try {
            await ReportActions.update({
                ...report,
                invitedTeacherReview: newReviewTexts[report.id],
            });
            setNewReviewTexts((prevTexts) => ({
                ...prevTexts,
                [report.id]: '',
            }));
            toast.success('Отзыв отправлен');
        } catch (error) {
            toast.error('Ошибка при отправке отзыва: ' + error.message);
        }
    };

    return (
        <Box>
            <ToastContainer />
            <Typography variant="h3" className="page-title">
                Первый тур
            </Typography>
            {reports.map((report) => (
                <Box key={report.id} className="report-container">
                    <Typography variant="h5">{report.name}</Typography>
                    <Typography>Автор: {report.team?.student?.user.name}</Typography>
                    <Typography>Дата последнего обновления: {report.dateUpdated}</Typography>

                    {report.invitedTeacherReview && (
                        <Box className="review-container">
                            <Typography>{report.invitedTeacherReview}</Typography>
                        </Box>
                    )}

                    {contestInfo?.dateStart <= new Date().toISOString() &&
                        contestInfo?.dateStartSecondTour > new Date().toISOString() && (
                            <Box className="new-review-container">
                                <TextField
                                    label="Отзыв"
                                    value={newReviewTexts[report.id] || ''}
                                    onChange={(e) =>
                                        setNewReviewTexts((prevTexts) => ({
                                            ...prevTexts,
                                            [report.id]: e.target.value,
                                        }))
                                    }
                                    fullWidth
                                />
                                <Button
                                    variant="contained"
                                    onClick={() => handleNewReviewSubmit(report)}
                                >
                                    Отправить
                                </Button>
                            </Box>
                        )}
                </Box>
            ))}
        </Box>
    );
};

export default InvitedFirstTourSection;