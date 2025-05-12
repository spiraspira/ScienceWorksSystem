import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReviewActions from '../actions/ReviewActions';
import ReportActions from '../actions/ReportActions';
import { Document, Packer, Paragraph, HeadingLevel } from "docx";
import * as FileSaver from 'file-saver';
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

    const downloadReviews = async () => {
        const doc = new Document({
            sections: [{
                children: [
                    new Paragraph({
                        text: "Reviews",
                        heading: HeadingLevel.HEADING_1,
                    }),
                    ...reviews.map(review =>
                        new Paragraph({
                            text: `${review.text} - ${review.date} (Reviewer: ${review.organizationCommitteeMember?.teacher?.user?.name || 'Unknown'})`,
                        })
                    ),
                ],
            }],
        });

        Packer.toBlob(doc).then(blob => {
            FileSaver.saveAs(blob, "Reviews_Report.docx");
        }).catch(err => {
            console.error("Error generating report:", err);
        });
    };

    return (
        <Box className="contest-info-container">
            <ToastContainer />
            <Card className="contest-info-card">
                <CardContent className="contest-info-content">
                    <Typography variant="h5" className="contest-title">
                        Первый тур
                    </Typography>

                    {reviews.length === 0 ? (
                        <Typography variant="body2" className="no-reviews-message">
                            Отзывов пока нет
                        </Typography>
                    ) : (
                        <Box className="reviews-container">
                            {reviews.map((review, index) => (
                                <Card key={index} className="review-card">
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
                                            })} - {review.organizationCommitteeMember?.teacher?.user?.name || 'Анонимный рецензент'}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            ))}
                        </Box>
                    )}

                    {isAccepted && (
                        <Typography variant="body1" className="acceptance-message">
                            Ваш доклад был принят
                        </Typography>
                    )}

                    {reviews.length > 0 && (
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={downloadReviews}
                                className="download-reviews-btn"
                            >
                                Скачать отзывы
                            </Button>
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default StudentFirstTourSection;