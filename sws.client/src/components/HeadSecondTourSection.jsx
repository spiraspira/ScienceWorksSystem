import React, { useState, useEffect } from 'react';
import ContestActions from '../actions/ContestActions';
import ReportActions from '../actions/ReportActions';
import GradeActions from '../actions/GradeActions';
import '../App.css';
import { Box, Typography, TextField, Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HeadSecondTourSection = ({ contestId }) => {
  const [reports, setReports] = useState([]);
  const [contest, setContest] = useState(null);
  const [gradeInputs, setGradeInputs] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contestInfo = await ContestActions.getContestInfo(contestId);
        setContest(contestInfo);

        const allReports = await ReportActions.getAllReportsOfContest(contestId);
        const reportsWithGrades = await Promise.all(
          allReports.map(async (report) => {
            const grades = await GradeActions.getGradesOfReport(report.id);
            return { ...report, grades };
          })
        );
        setReports(reportsWithGrades);
      } catch (error) {
        toast.error('Ошибка при получении данных: ' + error.message);
      }
    };

    fetchData();
  }, [contestId]);

  const handleGradeChange = (reportId, grade) => {
    setGradeInputs((prevInputs) => ({
      ...prevInputs,
      [reportId]: grade,
    }));
  };

  const handleGradeSubmit = async (report) => {
    try {
      const updatedReport = { ...report, grade: gradeInputs[report.id] };
      await ReportActions.update(updatedReport);
      toast.success('Оценка успешно добавлена!');
    } catch (error) {
      toast.error('Ошибка при добавлении оценки: ' + error.message);
    }
  };

  return (
    <Box className="head-second-tour-section">
      <Typography variant="h3">Второй тур</Typography>
      {reports.map((report) => (
        <Box key={report.id} className="report-item">
          <Typography variant="h3">{report.name}</Typography>
          <Typography>Автор доклада: {report.team?.student?.user?.name}</Typography>
          <Typography>Оценки:</Typography>
          {report.grades?.map((grade) => (
            <Box key={grade.id} className="grade-item">
              <Typography>Номинация: {grade.nomination?.name} | Оценка: {grade.reportGrade} | Комментарий: {grade.text} | Дата: {grade?.date}</Typography>
            </Box>
          ))}
          {report.grade !== null ? (
            <Typography>Итоговая оценка: {report.grade}</Typography>
          ) : contest?.dateStartSecondTour <= new Date().toISOString() &&
            contest?.dateEnd >= new Date().toISOString() ? (
            <Box className="grade-form">
              <TextField
                type="number"
                placeholder="Grade"
                value={gradeInputs[report.id] || ''}
                onChange={(e) => handleGradeChange(report.id, e.target.value)}
              />
              <Button onClick={() => handleGradeSubmit(report)}>Submit</Button>
            </Box>
          ) : null}
        </Box>
      ))}
      <ToastContainer />
    </Box>
  );
};

export default HeadSecondTourSection;