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
  TextField,
  FormControl,
  InputLabel,
  Typography
} from '@mui/material';
import { Edit, Delete, Save, Cancel } from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContestActions from '../actions/ContestActions';
import NominationActions from '../actions/NominationActions';
import { Document, Packer, Paragraph, Table as DocxTable, TableRow as DocxRow, TableCell as DocxCell, TextRun, AlignmentType, HeadingLevel } from "docx";
import * as FileSaver from 'file-saver';

const AdminNominationSection = () => {
  const [contests, setContests] = useState([]);
  const [nominations, setNominations] = useState([]);
  const [selectedContestId, setSelectedContestId] = useState('');
  const [newNomination, setNewNomination] = useState({ name: '' });
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contestsData, nominationsData] = await Promise.all([
          ContestActions.getAll(),
          NominationActions.getAll()
        ]);
        setContests(contestsData);
        setNominations(nominationsData);
      } catch (error) {
        toast.error('Ошибка загрузки данных: ' + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleContestChange = (event) => {
    setSelectedContestId(event.target.value);
  };

  const handleDelete = async (nominationId) => {
    try {
      await NominationActions.delete(nominationId);
      setNominations(nominations.filter((n) => n.id !== nominationId));
      toast.success('Номинация успешно удалена');
    } catch (error) {
      toast.error('Ошибка удаления номинации: ' + error.message);
    }
  };

  const handleCreate = async () => {
    if (!newNomination.name || !selectedContestId) {
      toast.error('Пожалуйста, заполните все обязательные поля');
      return;
    }

    try {
      const createdNomination = await NominationActions.create({ 
        name: newNomination.name, 
        contestId: selectedContestId 
      });
      setNominations([...nominations, createdNomination]);
      setNewNomination({ name: '' });
      toast.success('Номинация успешно создана');
    } catch (error) {
      toast.error('Ошибка создания номинации: ' + error.message);
    }
  };

  const startEditing = (nomination) => {
    setEditingId(nomination.id);
    setEditData({ name: nomination.name });
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const handleSave = async (id) => {
    if (!editData.name) {
      toast.error('Пожалуйста, введите название номинации');
      return;
    }

    try {
      const updatedNomination = await NominationActions.update({ 
        id, 
        name: editData.name 
      });
      setNominations(nominations.map((n) => (n.id === id ? updatedNomination : n)));
      setEditingId(null);
      toast.success('Номинация успешно обновлена');
    } catch (error) {
      toast.error('Ошибка обновления номинации: ' + error.message);
    }
  };

  const generateReport = async () => {
    if (!selectedContestId) {
      toast.error('Пожалуйста, выберите конкурс для генерации отчета');
      return;
    }

    const currentDate = new Date().toLocaleDateString();
    const contestName = contests.find(c => c.id === selectedContestId)?.name || 'Не указан';

    const rows = [
      new DocxRow({
        children: [
          new DocxCell({
            children: [new Paragraph({
              children: [new TextRun({ text: "Конкурс:", bold: true, size: 28, font: "Times New Roman" })]
            })]
          }),
          new DocxCell({
            children: [new Paragraph({
              children: [new TextRun({ text: contestName, size: 28, font: "Times New Roman" })]
            })]
          }),
        ],
      }),
      new DocxRow({
        children: [
          new DocxCell({
            children: [new Paragraph({
              children: [new TextRun({ text: "Номинации:", bold: true, size: 28, font: "Times New Roman" })]
            })]
          }),
          new DocxCell({
            children: [new Paragraph({
              children: [new TextRun({ text: "", size: 28, font: "Times New Roman" })]
            })]
          }),
        ],
      }),
      ...nominations
        .filter(nomination => nomination.contestId === selectedContestId)
        .map(nomination => (
          new DocxRow({
            children: [
              new DocxCell({
                children: [new Paragraph({
                  children: [new TextRun({ text: "", size: 28, font: "Times New Roman" })]
                })]
              }),
              new DocxCell({
                children: [new Paragraph({
                  children: [new TextRun({ 
                    text: nomination.name, 
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
                text: "Отчет по номинациям",
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
      FileSaver.saveAs(blob, `Отчет_по_номинациям_${contestName}.docx`);
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
      
      {/* Contest selection and add new nomination form */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="contest-select-label">Выберите конкурс</InputLabel>
              <Select
                labelId="contest-select-label"
                value={selectedContestId}
                onChange={handleContestChange}
                label="Выберите конкурс"
              >
                {contests.map((contest) => (
                  <MenuItem key={contest.id} value={contest.id}>
                    {contest.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Название номинации"
              value={newNomination.name}
              onChange={(e) => setNewNomination({ name: e.target.value })}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button 
              variant="contained" 
              onClick={handleCreate}
              fullWidth
              sx={{ height: '56px' }}
              disabled={!selectedContestId}
            >
              Добавить
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Nominations table */}
      {selectedContestId && (
        <>
          <TableContainer component={Paper} sx={{ mb: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Название номинации</TableCell>
                  <TableCell>Конкурс</TableCell>
                  <TableCell align="right">Действия</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {nominations
                  .filter((nomination) => nomination.contestId === selectedContestId)
                  .map((nomination) => (
                    <TableRow key={nomination.id}>
                      {editingId === nomination.id ? (
                        <>
                          <TableCell>
                            <TextField
                              value={editData.name}
                              onChange={(e) => setEditData({...editData, name: e.target.value})}
                              fullWidth
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            {contests.find(c => c.id === selectedContestId)?.name || '—'}
                          </TableCell>
                          <TableCell align="right">
                            <IconButton onClick={() => handleSave(nomination.id)}>
                              <Save color="primary" />
                            </IconButton>
                            <IconButton onClick={cancelEditing}>
                              <Cancel color="error" />
                            </IconButton>
                          </TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell>{nomination.name}</TableCell>
                          <TableCell>
                            {contests.find(c => c.id === nomination.contestId)?.name || '—'}
                          </TableCell>
                          <TableCell align="right">
                            <IconButton onClick={() => startEditing(nomination)}>
                              <Edit color="primary" />
                            </IconButton>
                            <IconButton onClick={() => handleDelete(nomination.id)}>
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
            fullWidth
            sx={{ mb: 2 }}
          >
            Скачать отчет
          </Button>
        </>
      )}
    </Box>
  );
};

export default AdminNominationSection;