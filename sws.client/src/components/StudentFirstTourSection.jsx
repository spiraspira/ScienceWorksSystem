import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Container } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReviewActions from '../actions/ReviewActions';
import ReportActions from '../actions/ReportActions';
import '../App.css';

const StudentFirstTourSection = ({ contestId }) => {
    const [reviews, setReviews] = useState([]);
    const userId = localStorage.getItem('userId');
    const [isAccepted, setIsAccepted] = useState("");

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const report = await ReportActions.getReportOfUser(userId, contestId);
                if (!report) {
                    return;
                }
                setIsAccepted(report.isAccepted);
                const reviewsData = await ReviewActions.getReviewsOfReport(report.id);
                setReviews(reviewsData);
            } catch (error) {
                toast.error('Error fetching reviews: ' + error.message);
            }
        };

        fetchReviews();
    }, [contestId, userId]);

    return (
        <Box>
            <ToastContainer />
            <Typography variant="h3" className="page-title">
                Первый тур
            </Typography>
            <Container maxWidth="md" className="review-section">
                {reviews.length === 0 ? (
                    <div>Отзывов нет.</div>
                ) : (
                    reviews.map((review, index) => (
                        <Card key={index} className="review-card">
                            <CardContent>
                                <Typography variant="body1" gutterBottom>
                                    {review.text}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {review.date} - {review.organizationCommitteeMember?.teacher?.user?.name}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))
                )}
                {isAccepted && (
                    <Typography>Доклад принят.</Typography>
                )}
            </Container>
        </Box>
    );
};

export default StudentFirstTourSection;