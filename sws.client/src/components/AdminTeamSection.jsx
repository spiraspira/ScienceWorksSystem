import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Button, 
  IconButton,
  Paper,
  CircularProgress,
  Grid,
  Select,
  MenuItem
} from '@mui/material';
import { Edit, Delete, Save, Cancel } from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TeamActions from '../actions/TeamActions';
import TeacherActions from '../actions/TeacherActions';
import StudentActions from '../actions/StudentActions';
import { Document, Packer, Paragraph, Table as DocxTable, TableRow as DocxRow, TableCell as DocxCell, TextRun, AlignmentType, HeadingLevel } from "docx";
import * as FileSaver from 'file-saver';

const AdminTeamSection = () => {
  const [teams, setTeams] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [newTeam, setNewTeam] = useState({ studentId: '', teacherId: '' });
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    studentId: '',
    teacherId: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teamData, teacherData, studentData] = await Promise.all([
          TeamActions.getAll(),
          TeacherActions.getAll(),
          StudentActions.getAll()
        ]);
        setTeams(teamData);
        setTeachers(teacherData);
        setStudents(studentData);
      } catch (error) {
        toast.error('Ошибка загрузки данных: ' + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (teamId) => {
    try {
      await TeamActions.delete(teamId);
      setTeams(teams.filter((t) => t.id !== teamId));
      toast.success('Команда успешно удалена');
    } catch (error) {
      toast.error('Ошибка удаления команды: ' + error.message);
    }
  };

  const handleCreate = async () => {
    if (!newTeam.studentId || !newTeam.teacherId) {
      toast.error('Пожалуйста, выберите студента и преподавателя');
      return;
    }

    try {
      const createdTeam = await TeamActions.create(newTeam);
      setTeams([...teams, createdTeam]);
      setNewTeam({ studentId: '', teacherId: '' });
      toast.success('Команда успешно создана');
    } catch (error) {
      toast.error('Ошибка создания команды: ' + error.message);
    }
  };

  const startEditing = (team) => {
    setEditingId(team.id);
    setEditData({
      studentId: team.studentId,
      teacherId: team.teacherId
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const handleSave = async (id) => {
    if (!editData.studentId || !editData.teacherId) {
      toast.error('Пожалуйста, выберите студента и преподавателя');
      return;
    }

    try {
      const updatedTeam = await TeamActions.update({ id, ...editData });
      setTeams(teams.map((t) => (t.id === id ? updatedTeam : t)));
      setEditingId(null);
      toast.success('Команда успешно обновлена');
    } catch (error) {
      toast.error('Ошибка обновления команды: ' + error.message);
    }
  };

  const generateReport = async () => {
    const currentDate = new Date().toLocaleDateString();

    const rows = [
      new DocxRow({
        children: [
          new DocxCell({
            children: [new Paragraph({
              children: [new TextRun({ text: "Студент", bold: true, size: 28, font: "Times New Roman" })]
            })]
          }),
          new DocxCell({
            children: [new Paragraph({
              children: [new TextRun({ text: "Преподаватель", bold: true, size: 28, font: "Times New Roman" })]
            })]
          }),
        ],
      }),
      ...teams.map(team => (
        new DocxRow({
          children: [
            new DocxCell({
              children: [new Paragraph({
                children: [new TextRun({ 
                  text: students.find((s) => s.id === team.studentId)?.user?.name || 'Не указан', 
                  size: 28, 
                  font: "Times New Roman" 
                })]
              })]
            }),
            new DocxCell({
              children: [new Paragraph({
                children: [new TextRun({ 
                  text: teachers.find((t) => t.id === team.teacherId)?.user?.name || 'Не указан', 
                  size: 28, 
                  font: "Times New Roman" 
                })]
              })]
            }),
          ],
        })
      )),
    ];

    const table = new DocxTable({
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
                text: "Отчет по командам",
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
          new Paragraph({ text: "\n" }),
          table,
        ],
      }],
    });

    Packer.toBlob(doc).then(blob => {
      FileSaver.saveAs(blob, "Отчет_по_командам.docx");
    }).catch(err => {
      console.error("Ошибка генерации отчета:", err);
      toast.error('Ошибка генерации отчета');
    });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <ToastContainer />
      
      {/* Add new team form */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item xs={12} sm={6}>
            <Select
              value={newTeam.studentId}
              onChange={(e) => setNewTeam({ ...newTeam, studentId: e.target.value })}
              fullWidth
              size="small"
              displayEmpty
            >
              <MenuItem value="">Выберите студента</MenuItem>
              {students.map((student) => (
                <MenuItem key={student.id} value={student.id}>
                  {student.user?.name || 'Без имени'}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              value={newTeam.teacherId}
              onChange={(e) => setNewTeam({ ...newTeam, teacherId: e.target.value })}
              fullWidth
              size="small"
              displayEmpty
            >
              <MenuItem value="">Выберите преподавателя</MenuItem>
              {teachers.map((teacher) => (
                <MenuItem key={teacher.id} value={teacher.id}>
                  {teacher.user?.name || 'Без имени'}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <Button 
              variant="contained" 
              onClick={handleCreate}
              fullWidth
              sx={{ height: '40px' }}
            >
              Добавить команду
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Teams table */}
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Студент</TableCell>
              <TableCell>Преподаватель</TableCell>
              <TableCell align="right">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teams.map((team) => (
              <TableRow key={team.id}>
                {editingId === team.id ? (
                  <>
                    <TableCell>
                      <Select
                        value={editData.studentId}
                        onChange={(e) => setEditData({...editData, studentId: e.target.value})}
                        fullWidth
                        size="small"
                      >
                        {students.map((student) => (
                          <MenuItem key={student.id} value={student.id}>
                            {student.user?.name || 'Без имени'}
                          </MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={editData.teacherId}
                        onChange={(e) => setEditData({...editData, teacherId: e.target.value})}
                        fullWidth
                        size="small"
                      >
                        {teachers.map((teacher) => (
                          <MenuItem key={teacher.id} value={teacher.id}>
                            {teacher.user?.name || 'Без имени'}
                          </MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleSave(team.id)}>
                        <Save color="primary" />
                      </IconButton>
                      <IconButton onClick={cancelEditing}>
                        <Cancel color="error" />
                      </IconButton>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>
                      {students.find((s) => s.id === team.studentId)?.user?.name || 'Не указан'}
                    </TableCell>
                    <TableCell>
                      {teachers.find((t) => t.id === team.teacherId)?.user?.name || 'Не указан'}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => startEditing(team)}>
                        <Edit color="primary" />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(team.id)}>
                        <Delete color="error" />
                      </IconButton>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button 
        variant="contained" 
        color="primary" 
        onClick={generateReport}
        fullWidth
        sx={{ mb: 2 }}
      >
        Скачать отчет
      </Button>
    </Box>
  );
};

export default AdminTeamSection;