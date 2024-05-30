import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Divider } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContestActions from '../actions/ContestActions';
import GradeActions from '../actions/GradeActions';
import ReportActions from '../actions/ReportActions';

const StudentSecondTourSection = ({ contestId }) => {
  const [nominations, setNominations] = useState([]);
  const [report, setReport] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contestNominations = await ContestActions.getContestNominations(contestId);
        setNominations(contestNominations);

        const userReport = await ReportActions.getReportOfUser(userId, contestId);
        setReport(userReport);
      } catch (error) {
        toast.error(`Ошибка получения номинаций и отчета: ${error.message}`);
      }
    };

    fetchData();
  }, [contestId, userId]);

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
              {report && (<NominationGrades nominationId={nomination.id} reportId={report?.id} />)}
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  );
};

const NominationGrades = ({ nominationId, reportId }) => {
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const nominationGrades = await GradeActions.getGradesOfNomination(nominationId, reportId);
        setGrades(nominationGrades);
      } catch (error) {
        toast.error(`Ошибка получения оценок: ${error.message}`);
      }
    };

    fetchGrades();
  }, [nominationId, reportId]);

  return (
    <>
      {grades.map((grade) => (
        <Box key={grade.id} className="grade-container">
          <Typography>Оценка: {grade.reportGrade}</Typography>
          <Typography>Отзыв: {grade.text}</Typography>
          <Typography>Дата: {grade.date}</Typography>
          <Typography>Автор: {grade.programCommitteeMember?.teacher?.user?.name}</Typography>
        </Box>
      ))}
    </>
  );
};

export default StudentSecondTourSection;