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
  MenuItem,
  TextField
} from '@mui/material';
import { Edit, Delete, Save, Cancel } from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CommitteeActions from '../actions/CommitteeActions';
import TeacherActions from '../actions/TeacherActions';
import { Document, Packer, Paragraph, Table as DocxTable, TableRow as DocxRow, TableCell as DocxCell, TextRun, AlignmentType, HeadingLevel } from "docx";
import * as FileSaver from 'file-saver';

const AdminCommitteeSection = () => {
  const [committees, setCommittees] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [newCommittee, setNewCommittee] = useState({ teacherId: '' });
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    teacherId: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [committeeData, teacherData] = await Promise.all([
          CommitteeActions.getAll(),
          TeacherActions.getAll()
        ]);
        setCommittees(committeeData);
        setTeachers(teacherData);
      } catch (error) {
        toast.error('Ошибка загрузки данных: ' + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (committeeId) => {
    try {
      await CommitteeActions.delete(committeeId);
      setCommittees(committees.filter((c) => c.id !== committeeId));
      toast.success('Комиссия успешно удалена');
    } catch (error) {
      toast.error('Ошибка удаления комиссии: ' + error.message);
    }
  };

  const handleCreate = async () => {
    if (!newCommittee.teacherId) {
      toast.error('Пожалуйста, выберите преподавателя');
      return;
    }

    try {
      const createdCommittee = await CommitteeActions.create(newCommittee);
      setCommittees([...committees, createdCommittee]);
      setNewCommittee({ teacherId: '' });
      toast.success('Комиссия успешно создана');
    } catch (error) {
      toast.error('Ошибка создания комиссии: ' + error.message);
    }
  };

  const startEditing = (committee) => {
    setEditingId(committee.id);
    setEditData({
      teacherId: committee.teacherId
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const handleSave = async (id) => {
    if (!editData.teacherId) {
      toast.error('Пожалуйста, выберите преподавателя');
      return;
    }

    try {
      const updatedCommittee = await CommitteeActions.update({ id, ...editData });
      setCommittees(committees.map((c) => (c.id === id ? updatedCommittee : c)));
      setEditingId(null);
      toast.success('Комиссия успешно обновлена');
    } catch (error) {
      toast.error('Ошибка обновления комиссии: ' + error.message);
    }
  };

  const generateReport = async () => {
    const currentDate = new Date().toLocaleDateString();

    const rows = [
      new DocxRow({
        children: [
          new DocxCell({
            children: [new Paragraph({
              children: [new TextRun({ text: "ID", bold: true, size: 28, font: "Times New Roman" })]
            })]
          }),
          new DocxCell({
            children: [new Paragraph({
              children: [new TextRun({ text: "Преподаватель", bold: true, size: 28, font: "Times New Roman" })]
            })]
          }),
        ],
      }),
      ...committees.map(committee => (
        new DocxRow({
          children: [
            new DocxCell({
              children: [new Paragraph({
                children: [new TextRun({ 
                  text: committee.id.toString(), 
                  size: 28, 
                  font: "Times New Roman" 
                })]
              })]
            }),
            new DocxCell({
              children: [new Paragraph({
                children: [new TextRun({ 
                  text: committee.teacher?.user?.name || 'Не указан', 
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
                text: "Отчет по комиссиям",
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
      FileSaver.saveAs(blob, "Отчет_по_комиссиям.docx");
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
      
      {/* Add new committee form */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item xs={12} sm={8}>
            <Select
              value={newCommittee.teacherId}
              onChange={(e) => setNewCommittee({ teacherId: e.target.value })}
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
          <Grid item xs={12} sm={4}>
            <Button 
              variant="contained" 
              onClick={handleCreate}
              fullWidth
              sx={{ height: '40px' }}
            >
              Добавить комиссию
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Committees table */}
      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Преподаватель</TableCell>
              <TableCell align="right">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {committees.map((committee) => (
              <TableRow key={committee.id}>
                {editingId === committee.id ? (
                  <>
                    <TableCell>
                      <TextField
                        value={committee.id}
                        disabled
                        fullWidth
                        size="small"
                      />
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
                      <IconButton onClick={() => handleSave(committee.id)}>
                        <Save color="primary" />
                      </IconButton>
                      <IconButton onClick={cancelEditing}>
                        <Cancel color="error" />
                      </IconButton>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>{committee.id}</TableCell>
                    <TableCell>
                      {committee.teacher?.user?.name || 'Не указан'}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => startEditing(committee)}>
                        <Edit color="primary" />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(committee.id)}>
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

      {/* Download report button */}
      <Button 
        variant="contained" 
        color="primary" 
        onClick={generateReport}
        sx={{ mb: 2 }}
      >
        Скачать отчет
      </Button>
    </Box>
  );
};

export default AdminCommitteeSection;