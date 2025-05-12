import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  TextField, 
  Button, 
  IconButton,
  Paper,
  CircularProgress,
  Grid
} from '@mui/material';
import { Edit, Delete, Save, Cancel } from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UniversityActions from '../actions/UniversityActions';
import { Document, Packer, Paragraph, Table as DocxTable, TableRow as DocxRow, TableCell as DocxCell, TextRun, AlignmentType, HeadingLevel } from "docx";
import * as FileSaver from 'file-saver';

const AdminUniversitySection = () => {
  const [universities, setUniversities] = useState([]);
  const [newUniversity, setNewUniversity] = useState({ name: '', location: '' });
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: '', location: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const data = await UniversityActions.getAll();
        setUniversities(data);
      } catch (error) {
        toast.error('Ошибка загрузки университетов: ' + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUniversities();
  }, []);

  const handleDelete = async (universityId) => {
    try {
      await UniversityActions.delete(universityId);
      setUniversities(universities.filter((u) => u.id !== universityId));
      toast.success('Университет успешно удален');
    } catch (error) {
      toast.error('Ошибка удаления университета: ' + error.message);
    }
  };

  const handleCreate = async () => {
    if (!newUniversity.name || !newUniversity.location) {
      toast.error('Пожалуйста, заполните все поля');
      return;
    }

    try {
      const createdUniversity = await UniversityActions.create(newUniversity);
      setUniversities([...universities, createdUniversity]);
      setNewUniversity({ name: '', location: '' });
      toast.success('Университет успешно создан');
    } catch (error) {
      toast.error('Ошибка создания университета: ' + error.message);
    }
  };

  const startEditing = (university) => {
    setEditingId(university.id);
    setEditData({ name: university.name, location: university.location });
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const handleSave = async (id) => {
    if (!editData.name || !editData.location) {
      toast.error('Пожалуйста, заполните все поля');
      return;
    }

    try {
      const updatedUniversity = await UniversityActions.update({ id, ...editData });
      setUniversities(universities.map((u) => (u.id === id ? updatedUniversity : u)));
      setEditingId(null);
      toast.success('Университет успешно обновлен');
    } catch (error) {
      toast.error('Ошибка обновления университета: ' + error.message);
    }
  };

  const generateReport = async () => {
    const currentDate = new Date().toLocaleDateString('ru-RU');

    const rows = [
      new DocxRow({
        children: [
          new DocxCell({
            children: [new Paragraph({
              children: [new TextRun({ text: "Университет", bold: true })]
            })]
          }),
          new DocxCell({
            children: [new Paragraph({
              children: [new TextRun({ text: "Город", bold: true })]
            })]
          }),
        ],
      }),
      ...universities.map(university => (
        new DocxRow({
          children: [
            new DocxCell({
              children: [new Paragraph({
                children: [new TextRun({ text: university.name })]
              })]
            }),
            new DocxCell({
              children: [new Paragraph({
                children: [new TextRun({ text: university.location })]
              })]
            }),
          ],
        })
      )),
    ];

    const table = new DocxTable({
      rows: rows,
      width: { size: 100, type: 'pct' },
    });

    const doc = new Document({
      sections: [{
        children: [
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: "Отчет по университетам", bold: true })]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: `Дата: ${currentDate}` })]
          }),
          new Paragraph({ text: "" }),
          table,
        ],
      }],
    });

    Packer.toBlob(doc).then(blob => {
      FileSaver.saveAs(blob, "Университеты_отчет.docx");
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
      
      {/* Add new university form */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={5}>
            <TextField
              label="Название университета"
              value={newUniversity.name}
              onChange={(e) => setNewUniversity({ ...newUniversity, name: e.target.value })}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              label="Город"
              value={newUniversity.location}
              onChange={(e) => setNewUniversity({ ...newUniversity, location: e.target.value })}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button 
              variant="contained" 
              onClick={handleCreate}
              fullWidth
              sx={{ height: '40px' }}
            >
              Добавить
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Universities table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Название университета</TableCell>
              <TableCell>Город</TableCell>
              <TableCell align="right">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {universities.map((university) => (
              <TableRow key={university.id}>
                {editingId === university.id ? (
                  <>
                    <TableCell>
                      <TextField
                        value={editData.name}
                        onChange={(e) => setEditData({...editData, name: e.target.value})}
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={editData.location}
                        onChange={(e) => setEditData({...editData, location: e.target.value})}
                        fullWidth
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleSave(university.id)}>
                        <Save color="primary" />
                      </IconButton>
                      <IconButton onClick={cancelEditing}>
                        <Cancel color="error" />
                      </IconButton>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>{university.name}</TableCell>
                    <TableCell>{university.location}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => startEditing(university)}>
                        <Edit color="primary" />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(university.id)}>
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

      {/* Report button */}
      <Box mt={3} display="flex" justifyContent="flex-end">
        <Button 
          variant="contained" 
          onClick={generateReport}
          disabled={universities.length === 0}
        >
          Скачать отчет
        </Button>
      </Box>
    </Box>
  );
};

export default AdminUniversitySection;