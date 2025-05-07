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
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContestActions from '../actions/ContestActions';
import ReportActions from '../actions/ReportActions';
import '../App.css';

const InvitedFirstTourSection = ({ contestId }) => {
    const [contestInfo, setContestInfo] = useState(null);
    const [reports, setReports] = useState([]);
    const [selectedReportId, setSelectedReportId] = useState('');
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
                }
            } catch (error) {
                toast.error(`Ошибка при загрузке данных: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [contestId]);

    const handleReportChange = (event) => {
        setSelectedReportId(event.target.value);
        setNewReviewText('');
    };

    const handleNewReviewSubmit = async () => {
        const report = reports.find(r => r.id === selectedReportId);
        if (!report) return;

        try {
            await ReportActions.update({
                ...report,
                invitedTeacherReview: newReviewText,
            });
            
            // Update local state to show the new review
            setReports(prev => prev.map(r => 
                r.id === selectedReportId ? {...r, invitedTeacherReview: newReviewText} : r
            ));
            
            setNewReviewText('');
            toast.success('Отзыв успешно отправлен');
        } catch (error) {
            toast.error(`Ошибка при отправке отзыва: ${error.message}`);
        }
    };

    if (loading) {
        return (
            <Box className="invited-first-tour-container">
                <CircularProgress className="loading-spinner" />
            </Box>
        );
    }

    const selectedReport = reports.find(report => report.id === selectedReportId);

    return (
        <Box className="invited-first-tour-container">
            <ToastContainer limit={3} />
            <Card className="invited-first-tour-card">
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
                                        <Typography variant="h6" className="report-title">
                                            {selectedReport.name}
                                        </Typography>
                                        
                                        <Typography variant="body2" className="report-meta">
                                            Автор: {selectedReport.team?.student?.user.name || 'Неизвестно'}
                                        </Typography>
                                        <Typography variant="body2" className="report-meta">
                                            Дата обновления: {new Date(selectedReport.dateUpdated).toLocaleDateString('ru-RU')}
                                        </Typography>
                                        
                                        <Divider className="report-divider" />
                                        
                                        {selectedReport.invitedTeacherReview ? (
                                            <Card className="review-card">
                                                <CardContent>
                                                    <Typography variant="subtitle2" className="review-label">
                                                        Ваш отзыв:
                                                    </Typography>
                                                    <Typography variant="body1" className="review-text">
                                                        {selectedReport.invitedTeacherReview}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        ) : (
                                            <Typography variant="body2" className="no-review-message">
                                                Вы еще не оставляли отзыв на эту работу
                                            </Typography>
                                        )}

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
                                                        disabled={!!selectedReport.invitedTeacherReview}
                                                    />
                                                    <Button
                                                        variant="contained"
                                                        onClick={handleNewReviewSubmit}
                                                        disabled={!newReviewText.trim() || !!selectedReport.invitedTeacherReview}
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

export default InvitedFirstTourSection;