import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button,
  Card,
  CardContent,
  Divider,
  CircularProgress,
  MenuItem,
  Select,
  InputLabel,
  FormControl
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
    const [selectedReportId, setSelectedReportId] = useState('');
    const [reviews, setReviews] = useState([]);
    const [newReviewText, setNewReviewText] = useState('');
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
    }, [contestId, userId]);

    const loadReviews = async (reportId) => {
        try {
            const reviewsForReport = await ReviewActions.getReviewsOfReportOfTeacher(reportId, userId);
            setReviews(reviewsForReport);
        } catch (error) {
            toast.error(`Ошибка при загрузке отзывов: ${error.message}`);
        }
    };

    const handleReportChange = async (event) => {
        const reportId = event.target.value;
        setSelectedReportId(reportId);
        await loadReviews(reportId);
    };

    const handleNewReviewSubmit = async () => {
        try {
            await ReviewActions.create({ 
                text: newReviewText, 
                reportId: selectedReportId, 
                organizationCommitteeMemberId 
            });
            
            // Refresh reviews
            await loadReviews(selectedReportId);
            
            // Clear the text field
            setNewReviewText('');
            
            toast.success('Отзыв успешно отправлен');
        } catch (error) {
            toast.error(`Ошибка при отправке отзыва: ${error.message}`);
        }
    };

    const downloadReport = async (reportId) => {
        try {
            const report = reports.find(r => r.id === reportId);
            if (report?.file) {
                const binaryData = atob(report.file);
                const arrayBuffer = new ArrayBuffer(binaryData.length);
                const uint8Array = new Uint8Array(arrayBuffer);

                for (let i = 0; i < binaryData.length; i++) {
                    uint8Array[i] = binaryData.charCodeAt(i);
                }

                const blob = new Blob([uint8Array], { type: 'application/octet-stream' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `${report.name}.docx`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                toast.error('Файл отчета не найден');
            }
        } catch (error) {
            toast.error(`Ошибка при скачивании отчета: ${error.message}`);
        }
    };

    if (loading) {
        return (
            <Box className="teacher-first-tour-container">
                <CircularProgress className="loading-spinner" />
            </Box>
        );
    }

    const selectedReport = reports.find(report => report.id === selectedReportId);

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
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                onClick={() => downloadReport(selectedReportId)}
                                                className="download-report-btn"
                                            >
                                                Скачать работу
                                            </Button>
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
                                                        value={newReviewText}
                                                        onChange={(e) => setNewReviewText(e.target.value)}
                                                        className="review-textfield"
                                                    />
                                                    <Button
                                                        variant="contained"
                                                        onClick={handleNewReviewSubmit}
                                                        disabled={!newReviewText.trim()}
                                                        className="submit-review-btn"
                                                    >
                                                        Отправить отзыв
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

export default TeacherFirstTourSection;