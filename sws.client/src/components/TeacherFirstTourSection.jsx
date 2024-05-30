import React, { useState, useEffect } from 'react';
import ContestActions from '../actions/ContestActions';
import ReportActions from '../actions/ReportActions';
import ReviewActions from '../actions/ReviewActions';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Typography, TextField, Button } from '@mui/material';
import '../App.css';

const TeacherFirstTourSection = ({ contestId, organizationCommitteeMemberId }) => {
    const userId = localStorage.getItem('userId');
    const [contestInfo, setContestInfo] = useState(null);
    const [reports, setReports] = useState([]);
    const [reviews, setReviews] = useState({});
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

                const reportReviews = {};
                for (const report of allReports) {
                    const reviewsForReport = await ReviewActions.getReviewsOfReportOfTeacher(report.id, userId);
                    reportReviews[report.id] = reviewsForReport;
                }
                setReviews(reportReviews);
            } catch (error) {
                toast.error('Ошибка при получении отчетов и отзывов: ' + error.message);
            }
        };

        fetchContestInfo();
        fetchReports();
    }, [contestId, userId]);

    const handleNewReviewSubmit = async (reportId) => {
        try {
            await ReviewActions.create({ text: newReviewTexts[reportId], reportId, organizationCommitteeMemberId });
            setNewReviewTexts((prevTexts) => ({
                ...prevTexts,
                [reportId]: '',
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

                    {reviews[report.id]?.length > 0 ? (
                        reviews[report.id].map((review) => (
                            <Box key={review.id} className="review-container">
                                <Typography>{review.text} {review.date}</Typography>
                            </Box>
                        ))
                    ) : (
                        <Typography>Отзывов нет.</Typography>
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
                                    onClick={() => handleNewReviewSubmit(report.id)}
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

export default TeacherFirstTourSection;