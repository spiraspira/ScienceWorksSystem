import React, { useState, useEffect } from 'react';
import ContestActions from '../actions/ContestActions';
import ReportActions from '../actions/ReportActions';
import ReviewActions from '../actions/ReviewActions';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Typography, Button } from '@mui/material';
import '../App.css';

const HeadFirstTourComponent = ({ contestId }) => {
    const [contestInfo, setContestInfo] = useState(null);
    const [reports, setReports] = useState([]);
    const [reviews, setReviews] = useState({});

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
                await fetchReviewsForReports(allReports);
            } catch (error) {
                toast.error('Ошибка при получении отчетов: ' + error.message);
            }
        };

        const fetchReviewsForReports = async (reportsData) => {
            const reviewsData = {};
            for (const report of reportsData) {
                try {
                    const reportReviews = await ReviewActions.getReviewsOfReport(report.id);
                    reviewsData[report.id] = reportReviews;
                } catch (error) {
                    toast.error(`Ошибка при получении отзывов для отчета ${report.name}: ${error.message}`);
                }
            }
            setReviews(reviewsData);
        };

        fetchContestInfo();
        fetchReports();
    }, [contestId]);

    const handleAcceptReport = async (report) => {
        try {
            await ReportActions.update({
                ...report,
                isAccepted: true,
            });
            toast.success('Отчет принят');
        } catch (error) {
            toast.error('Ошибка при принятии отчета: ' + error.message);
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

                    {reviews[report.id]?.map((review) => (
                        <Box key={review.id} className="review-container">
                            <Typography>{review.text}</Typography>
                            <Typography>Автор: {review.organizationCommitteeMember?.teacher?.user?.name}</Typography>
                            <Typography>Дата: {review.date}</Typography>
                            {review.isAccepted && (
                                <Typography>Отчет принят</Typography>
                            )}
                        </Box>
                    ))}

                    {report.invitedTeacherReview && (
                        <Box className="review-container">
                            <Typography>Отзыв приглашенного преподавателя: {report.invitedTeacherReview}</Typography>
                        </Box>
                    )}

                    {contestInfo?.dateStart <= new Date().toISOString() &&
                        contestInfo?.dateStartSecondTour > new Date().toISOString() &&
                        !report.isAccepted && (
                            <Box className="new-review-container">
                                <Button
                                    variant="contained"
                                    onClick={() => handleAcceptReport(report)}
                                >
                                    Принять
                                </Button>
                            </Box>
                        )}
                    {report.isAccepted && (
                        <Typography>Доклад принят.</Typography>
                    )}
                </Box>
            ))}
        </Box>
    );
};

export default HeadFirstTourComponent;