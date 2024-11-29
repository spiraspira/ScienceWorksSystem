import React, { useState, useEffect } from 'react';
import { Box, Grid, Button, IconButton, Select, MenuItem } from '@mui/material';
import { Edit, Delete, Save } from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TeamActions from '../actions/TeamActions';
import TeacherActions from '../actions/TeacherActions';
import StudentActions from '../actions/StudentActions';
import { Document, Packer, Paragraph, Table, TableRow, TableCell, TextRun, AlignmentType, HeadingLevel } from "docx";
import * as FileSaver from 'file-saver';

const AdminTeamSection = () => {
  const [teams, setTeams] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [newTeam, setNewTeam] = useState({ studentId: '', teacherId: '' });
  const [editingTeam, setEditingTeam] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teamData = await TeamActions.getAll();
        setTeams(teamData);

        const teacherData = await TeacherActions.getAll();
        setTeachers(teacherData);

        const studentData = await StudentActions.getAll();
        setStudents(studentData);
      } catch (error) {
        toast.error('Error fetching data: ' + error.message);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (teamId) => {
    try {
      await TeamActions.delete(teamId);
      setTeams(teams.filter((t) => t.id !== teamId));
      toast.success('Team deleted successfully');
    } catch (error) {
      toast.error('Error deleting team: ' + error.message);
    }
  };

  const handleCreate = async () => {
    try {
      const newTeamData = { studentId: newTeam.studentId, teacherId: newTeam.teacherId };
      const createdTeam = await TeamActions.create(newTeamData);
      setTeams([...teams, createdTeam]);
      setNewTeam({ studentId: '', teacherId: '' });
      toast.success('Team created successfully');
    } catch (error) {
      toast.error('Error creating team: ' + error.message);
    }
  };

  const handleEdit = (team) => {
    setEditingTeam(team);
  };

  const handleSave = async (team) => {
    try {
      const updatedTeam = await TeamActions.update(team);
      setTeams(teams.map((t) => (t.id === team.id ? updatedTeam : t)));
      setEditingTeam(null);
      toast.success('Team updated successfully');
    } catch (error) {
      toast.error('Error updating team: ' + error.message);
    }
  };

  const generateReport = async () => {
    const currentDate = new Date().toLocaleDateString();

    const rows = [
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({
              children: [new TextRun({ text: "Student", bold: true, size: 28, font: "Times New Roman" })]
            })]
          }),
          new TableCell({
            children: [new Paragraph({
              children: [new TextRun({ text: "Teacher", bold: true, size: 28, font: "Times New Roman" })]
            })]
          }),
        ],
      }),
      ...teams.map(team => (
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph({
                children: [new TextRun({ text: students.find((s) => s.id === team.studentId)?.user?.name || '', size: 28, font: "Times New Roman" })]
              })]
            }),
            new TableCell({
              children: [new Paragraph({
                children: [new TextRun({ text: teachers.find((t) => t.id === team.teacherId)?.user?.name || '', size: 28, font: "Times New Roman" })]
              })]
            }),
          ],
        })
      )),
    ];

    const table = new Table({
      rows: rows,
      width: { size: 10000, type: 'dxa' },
    });

    const doc = new Document({
      sections: [{
        children: [
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: "Team Report",
                bold: true,
                size: 28,
                font: "Times New Roman"
              }),
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: currentDate, size: 28, font: "Times New Roman" })]
          }),
          new Paragraph({ text: "\n" }), // Add some spacing
          table, // Add the table to the document
        ],
      }],
    });

    Packer.toBlob(doc).then(blob => {
      FileSaver.saveAs(blob, "Team_Report.docx");
    }).catch(err => {
      console.error("Error generating report:", err);
    });
  };

  return (
    <Box className="admin-section">
      <ToastContainer />
      <Grid container spacing={2}>
        {teams.map((team) => (
          <Grid item xs={12} sm={6} md={4} key={team.id}>
            <Box className="university-card">
              {editingTeam?.id === team.id ? (
                <>
                  <Select
                    label="Student"
                    value={editingTeam.studentId}
                    onChange={(e) => setEditingTeam({ ...editingTeam, studentId: e.target.value })}
                  >
                    {students.map((student) => (
                      <MenuItem key={student.id} value={student.id}>
                        {student.user?.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <Select
                    label="Teacher"
                    value={editingTeam.teacherId}
                    onChange={(e) => setEditingTeam({ ...editingTeam, teacherId: e.target.value })}
                  >
                    {teachers.map((teacher) => (
                      <MenuItem key={teacher.id} value={teacher.id}>
                        {teacher.user?.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <Box className="university-actions">
                    <IconButton onClick={() => handleSave(editingTeam)}>
                      <Save />
                    </IconButton>
                  </Box>
                </>
              ) : (
                <>
                  <p>Student: {students.find((s) => s.id === team.studentId)?.user?.name}</p>
                  <p>Teacher: {teachers.find((t) => t.id === team.teacherId)?.user?.name}</p>
                  <Box className="university-actions">
                    <IconButton onClick={() => handleEdit(team)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(team.id)}>
                      <Delete />
                    </IconButton>
                  </Box>
                </>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>
      <Box className="university-form">
        <Select
          label="Student"
          value={newTeam.studentId}
          onChange={(e) => setNewTeam({ ...newTeam, studentId: e.target.value })}
        >
          {students.map((student) => (
            <MenuItem key={student.id} value={student.id}>
              {student.user?.name}
            </MenuItem>
          ))}
        </Select>
        <Select
          label="Teacher"
          value={newTeam.teacherId}
          onChange={(e) => setNewTeam({ ...newTeam, teacherId: e.target.value })}
        >
          {teachers.map((teacher) => (
            <MenuItem key={teacher.id} value={teacher.id}>
              {teacher.user?.name}
            </MenuItem>
          ))}
        </Select>
        <Button onClick={handleCreate}>Create</Button>
      </Box>
      <Button variant="contained" color="primary" onClick={generateReport}>
        Download Report
      </Button>
    </Box>
  );
};

export default AdminTeamSection;