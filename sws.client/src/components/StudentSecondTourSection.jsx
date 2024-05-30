import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Divider } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContestActions from '../actions/ContestActions';
import GradeActions from '../actions/GradeActions';

const StudentSecondTourSection = ({ contestId }) => {
    const [nominations, setNominations] = useState([]);

    useEffect(() => {
        const fetchNominations = async () => {
            try {
                const contestNominations = await ContestActions.getContestNominations(contestId);
                setNominations(contestNominations);
            } catch (error) {
                toast.error(`Error fetching nominations: ${error.message}`);
            }
        };

        fetchNominations();
    }, [contestId]);

    return (
        <Box className="student-second-tour-section">
            <ToastContainer />
            <Typography variant="h3" className="page-title">
                Второй тур
            </Typography>
            {nominations.map((nomination) => (
                <Box key={nomination.id} className="nomination-container">
                    <Card className="nomination-card">
                        <CardContent>
                            <Typography variant="h5">{nomination.name}</Typography>
                            <Divider className="divider" />
                            <NominationGrades nominationId={nomination.id} />
                        </CardContent>
                    </Card>
                </Box>
            ))}
        </Box>
    );
};

const NominationGrades = ({ nominationId }) => {
    const [grades, setGrades] = useState([]);

    useEffect(() => {
        const fetchGrades = async () => {
            try {
                const nominationGrades = await GradeActions.getGradesOfNomination(nominationId);
                setGrades(nominationGrades);
            } catch (error) {
                toast.error(`Error fetching grades: ${error.message}`);
            }
        };

        fetchGrades();
    }, [nominationId]);

    return (
        <>
            {grades.map((grade) => (
                <Box key={grade.id} className="grade-container">
                    <Typography>Оценка: {grade.reportGrade}</Typography>
                    <Typography>Отзыв: {grade.text}</Typography>
                    <Typography>Дата: {grade.date}</Typography>
                    <Typography>Автор: {grade.author}</Typography>
                </Box>
            ))}
        </>
    );
};

export default StudentSecondTourSection;