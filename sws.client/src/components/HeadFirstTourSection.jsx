import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button,
  Card,
  CardContent,
  Divider,
  CircularProgress,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContestActions from '../actions/ContestActions';
import ReportActions from '../actions/ReportActions';
import ReviewActions from '../actions/ReviewActions';
import '../App.css';

const HeadFirstTourComponent = ({ contestId }) => {
    const [contestInfo, setContestInfo] = useState(null);
    const [reports, setReports] = useState([]);
    const [selectedReportId, setSelectedReportId] = useState('');
    const [reviews, setReviews] = useState([]);
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
                
                if (allReports.length > 0) {
                    setSelectedReportId(allReports[0].id);
                    await loadReviews(allReports[0].id);
                }
            } catch (error) {
                toast.error(`Ошибка при загрузке данных: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [contestId]);

    const loadReviews = async (reportId) => {
        try {
            const reportReviews = await ReviewActions.getReviewsOfReport(reportId);
            setReviews(reportReviews);
        } catch (error) {
            toast.error(`Ошибка при загрузке отзывов: ${error.message}`);
            setReviews([]);
        }
    };

    const handleReportChange = async (event) => {
        const reportId = event.target.value;
        setSelectedReportId(reportId);
        await loadReviews(reportId);
    };

    const handleAcceptReport = async (report) => {
        try {
            await ReportActions.update({
                ...report,
                isAccepted: true,
            });
            setReports(prev => prev.map(r => 
                r.id === report.id ? {...r, isAccepted: true} : r
            ));
            toast.success('Отчет успешно принят');
        } catch (error) {
            toast.error(`Ошибка при принятии отчета: ${error.message}`);
        }
    };

    if (loading) {
        return (
            <Box className="head-first-tour-container">
                <CircularProgress className="loading-spinner" />
            </Box>
        );
    }

    const selectedReport = reports.find(report => report.id === selectedReportId);

    return (
        <Box className="head-first-tour-container">
            <ToastContainer limit={3} />
            <Card className="head-first-tour-card">
                <CardContent>
                    <Typography variant="h5" className="section-title">
                        Первый тур (Режим председателя)
                    </Typography>
                    
                    {reports.length === 0 ? (
                        <Typography variant="body2" className="no-reports-message">
                            Работы пока не загружены
                        </Typography>
                    ) : (
                        <>
                            <FormControl fullWidth className="report-selector" sx={{ paddingBottom: '16px', paddingTop: '20px' }}>
                                <InputLabel id="report-select-label" sx={{ paddingTop: '30px' }}>Выберите работу</InputLabel>
                                <Select
                                    labelId="report-select-label"
                                    value={selectedReportId}
                                    onChange={handleReportChange}
                                    label="Выберите работу"
                                >
                                    {reports.map((report) => (
                                        <MenuItem key={report.id} value={report.id}>
                                            {report.name} ({report.team?.student?.user.name || 'Неизвестно'})
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            {selectedReport && (
                                <Card className="report-card">
                                    <CardContent>
                                        <Box className="report-header">
                                            <Typography variant="h6" className="report-title">
                                                {selectedReport.name}
                                            </Typography>
                                            {selectedReport.isAccepted && (
                                                <Chip 
                                                    label="Принято" 
                                                    color="success" 
                                                    size="small"
                                                    className="status-chip"
                                                />
                                            )}
                                        </Box>
                                        
                                        <Typography variant="body2" className="report-meta">
                                            Автор: {selectedReport.team?.student?.user.name || 'Неизвестно'}
                                        </Typography>
                                        <Typography variant="body2" className="report-meta">
                                            Дата обновления: {new Date(selectedReport.dateUpdated).toLocaleDateString('ru-RU')}
                                        </Typography>
                                        
                                        <Divider className="report-divider" />
                                        
                                        <Box className="reviews-container">
                                            {reviews.length > 0 ? (
                                                reviews.map((review) => (
                                                    <Card key={review.id} className="review-card">
                                                        <CardContent>
                                                            <Typography variant="body1" className="review-text">
                                                                {review.text}
                                                            </Typography>
                                                            <Box className="review-footer">
                                                                <Typography variant="body2" className="review-meta">
                                                                    {review.organizationCommitteeMember?.teacher?.user?.name || 'Неизвестно'}
                                                                </Typography>
                                                                <Typography variant="body2" className="review-meta">
                                                                    {new Date(review.date).toLocaleDateString('ru-RU', {
                                                                        day: '2-digit',
                                                                        month: '2-digit',
                                                                        year: 'numeric'
                                                                    })}
                                                                </Typography>
                                                            </Box>
                                                        </CardContent>
                                                    </Card>
                                                ))
                                            ) : (
                                                <Typography variant="body2" className="no-reviews-message">
                                                    Отзывов пока нет
                                                </Typography>
                                            )}
                                        </Box>

                                        {selectedReport.invitedTeacherReview && (
                                            <Card className="invited-review-card">
                                                <CardContent>
                                                    <Typography variant="subtitle2" className="invited-review-label">
                                                        Отзыв приглашенного преподавателя:
                                                    </Typography>
                                                    <Typography variant="body1" className="invited-review-text">
                                                        {selectedReport.invitedTeacherReview}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        )}

                                        {contestInfo?.dateStart <= new Date().toISOString() &&
                                            contestInfo?.dateStartSecondTour > new Date().toISOString() &&
                                            !selectedReport.isAccepted && (
                                                <Box className="accept-report-container">
                                                    <Button
                                                        variant="contained"
                                                        onClick={() => handleAcceptReport(selectedReport)}
                                                        className="accept-report-btn"
                                                    >
                                                        Принять работу
                                                    </Button>
                                                </Box>
                                            )}
                                    </CardContent>
                                </Card>
                            )}
                        </>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default HeadFirstTourComponent;