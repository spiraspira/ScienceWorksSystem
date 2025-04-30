import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button,
  Card,
  CardContent,
  Divider,
  CircularProgress
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContestActions from '../actions/ContestActions';
import ReportActions from '../actions/ReportActions';
import ReviewActions from '../actions/ReviewActions';
import '../App.css';

const TeacherFirstTourSection = ({ contestId, organizationCommitteeMemberId }) => {
    const userId = localStorage.getItem('userId');
    const [contestInfo, setContestInfo] = useState(null);
    const [reports, setReports] = useState([]);
    const [reviews, setReviews] = useState({});
    const [newReviewTexts, setNewReviewTexts] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [contest, allReports] = await Promise.all([
                    ContestActions.getContestInfo(contestId),
                    ReportActions.getAllReportsOfContest(contestId)
                ]);
                
                setContestInfo(contest);
                setReports(allReports);

                const reportReviews = {};
                const reviewPromises = allReports.map(async (report) => {
                    const reviewsForReport = await ReviewActions.getReviewsOfReportOfTeacher(report.id, userId);
                    reportReviews[report.id] = reviewsForReport;
                });
                
                await Promise.all(reviewPromises);
                setReviews(reportReviews);
            } catch (error) {
                toast.error(`Ошибка при загрузке данных: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [contestId, userId]);

    const handleNewReviewSubmit = async (reportId) => {
        try {
            await ReviewActions.create({ 
                text: newReviewTexts[reportId], 
                reportId, 
                organizationCommitteeMemberId 
            });
            
            // Refresh reviews for this report
            const updatedReviews = await ReviewActions.getReviewsOfReportOfTeacher(reportId, userId);
            setReviews(prev => ({...prev, [reportId]: updatedReviews}));
            
            // Clear the text field
            setNewReviewTexts(prev => ({...prev, [reportId]: ''}));
            
            toast.success('Отзыв успешно отправлен');
        } catch (error) {
            toast.error(`Ошибка при отправке отзыва: ${error.message}`);
        }
    };

    if (loading) {
        return (
            <Box className="teacher-first-tour-container">
                <CircularProgress className="loading-spinner" />
            </Box>
        );
    }

    return (
        <Box className="teacher-first-tour-container">
            <ToastContainer limit={3} />
            <Card className="teacher-first-tour-card">
                <CardContent>
                    <Typography variant="h5" className="section-title">
                        Первый тур
                    </Typography>
                    
                    {reports.length === 0 ? (
                        <Typography variant="body2" className="no-reports-message">
                            Работы пока не загружены
                        </Typography>
                    ) : (
                        <Box className="reports-list">
                            {reports.map((report) => (
                                <Card key={report.id} className="report-card">
                                    <CardContent>
                                        <Typography variant="h6" className="report-title">
                                            {report.name}
                                        </Typography>
                                        <Typography variant="body2" className="report-meta">
                                            Автор: {report.team?.student?.user.name || 'Неизвестно'}
                                        </Typography>
                                        <Typography variant="body2" className="report-meta">
                                            Дата обновления: {new Date(report.dateUpdated).toLocaleDateString('ru-RU')}
                                        </Typography>
                                        
                                        <Divider className="report-divider" />
                                        
                                        <Box className="reviews-container">
                                            {reviews[report.id]?.length > 0 ? (
                                                reviews[report.id].map((review) => (
                                                    <Card key={review.id} className="review-card">
                                                        <CardContent>
                                                            <Typography variant="body1" className="review-text">
                                                                {review.text}
                                                            </Typography>
                                                            <Typography variant="body2" className="review-meta">
                                                                {new Date(review.date).toLocaleDateString('ru-RU', {
                                                                    day: '2-digit',
                                                                    month: '2-digit',
                                                                    year: 'numeric',
                                                                    hour: '2-digit',
                                                                    minute: '2-digit'
                                                                })}
                                                            </Typography>
                                                        </CardContent>
                                                    </Card>
                                                ))
                                            ) : (
                                                <Typography variant="body2" className="no-reviews-message">
                                                    Отзывов пока нет
                                                </Typography>
                                            )}
                                        </Box>

                                        {contestInfo?.dateStart <= new Date().toISOString() &&
                                            contestInfo?.dateStartSecondTour > new Date().toISOString() && (
                                                <Box className="new-review-form">
                                                    <TextField
                                                        label="Ваш отзыв"
                                                        variant="outlined"
                                                        fullWidth
                                                        multiline
                                                        rows={4}
                                                        value={newReviewTexts[report.id] || ''}
                                                        onChange={(e) =>
                                                            setNewReviewTexts(prev => ({
                                                                ...prev,
                                                                [report.id]: e.target.value
                                                            }))
                                                        }
                                                        className="review-textfield"
                                                    />
                                                    <Button
                                                        variant="contained"
                                                        onClick={() => handleNewReviewSubmit(report.id)}
                                                        disabled={!newReviewTexts[report.id]?.trim()}
                                                        className="submit-review-btn"
                                                    >
                                                        Отправить отзыв
                                                    </Button>
                                                </Box>
                                            )}
                                    </CardContent>
                                </Card>
                            ))}
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default TeacherFirstTourSection;