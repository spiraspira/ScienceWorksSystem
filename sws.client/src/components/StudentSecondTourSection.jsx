import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Divider, Button } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContestActions from '../actions/ContestActions';
import GradeActions from '../actions/GradeActions';
import ReportActions from '../actions/ReportActions';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";
import * as FileSaver from 'file-saver';

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

  const downloadGrades = async () => {
    const doc = new Document({
      sections: [{
        children: [
          // Add title without creating a new section
          new Paragraph({
            text: "Grades Report",
            heading: HeadingLevel.HEADING_1,
          }),
          // Add a blank paragraph after the title for spacing
          new Paragraph({ text: "" }),
        ],
      }],
    });

    // Keep everything in a single section
    const sectionChildren = [];

    for (const nomination of nominations) {
      // Fetch grades for the current nomination
      const nominationGrades = await GradeActions.getGradesOfNomination(nomination.id, report?.id);

      // Add nomination title
      sectionChildren.push(
        new Paragraph({
          text: `Номинация: ${nomination.name}`,
          heading: HeadingLevel.HEADING_2,
        })
      );

      // Add each grade to the section
      nominationGrades.forEach(grade => {
        sectionChildren.push(
          new Paragraph({
            children: [
              new TextRun(`Оценка: ${grade.reportGrade}`),
              new TextRun(` | Отзыв: ${grade.text}`),
              new TextRun(` | Дата: ${grade.date}`),
              new TextRun(` | Автор: ${grade.programCommitteeMember?.teacher?.user?.name || 'Неизвестно'}`),
            ],
            spacing: { after: 200 }, // Add spacing after each grade entry for readability
          })
        );
      });

      // Add a blank paragraph for spacing between nominations
      sectionChildren.push(new Paragraph({ text: "" }));
    }

    // Append all children to the document section
    doc.addSection({
      children: sectionChildren,
    });

    Packer.toBlob(doc).then(blob => {
      FileSaver.saveAs(blob, "Grades_Report.docx");
    }).catch(err => {
      console.error("Error generating report:", err);
    });
  };

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
      <Button 
        variant="contained" 
        color="primary" 
        onClick={downloadGrades} 
        style={{ marginTop: '20px' }}
      >
        Download Grades
      </Button>
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