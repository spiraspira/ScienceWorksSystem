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
  Typography,
  InputLabel,
  FormControl
} from '@mui/material';
import { Edit, Delete, Save, Cancel } from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CommitteeActions from '../actions/CommitteeActions';
import CommitteeMemberActions from '../actions/CommitteeMemberActions';
import TeacherActions from '../actions/TeacherActions';
import { Document, Packer, Paragraph, Table as DocxTable, TableRow as DocxRow, TableCell as DocxCell, TextRun, AlignmentType, HeadingLevel } from "docx";
import * as FileSaver from 'file-saver';

const AdminCommitteeMemberSection = () => {
  const [committees, setCommittees] = useState([]);
  const [committeeMembers, setCommitteeMembers] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [selectedCommittee, setSelectedCommittee] = useState(null);
  // And in the state initialization:
const [newCommitteeMember, setNewCommitteeMember] = useState({ 
  committeeId: '',  // Changed from null to empty string
  teacherId: ''     // Changed from null to empty string
});
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    teacherId: null
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [committeeData, committeeMemberData, teacherData] = await Promise.all([
          CommitteeActions.getAll(),
          CommitteeMemberActions.getAll(),
          TeacherActions.getAll(),
        ]);
        setCommittees(committeeData);
        setCommitteeMembers(committeeMemberData);
        setTeachers(teacherData);
      } catch (error) {
        toast.error('Ошибка загрузки данных: ' + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCommitteeChange = (event) => {
    setSelectedCommittee(event.target.value);
  };

  const handleDelete = async (committeeMemberId) => {
    try {
      await CommitteeMemberActions.delete(committeeMemberId);
      setCommitteeMembers(committeeMembers.filter((cm) => cm.id !== committeeMemberId));
      toast.success('Член комиссии успешно удален');
    } catch (error) {
      toast.error('Ошибка удаления члена комиссии: ' + error.message);
    }
  };

  const startEditing = (committeeMember) => {
    setEditingId(committeeMember.id);
    setEditData({
      teacherId: committeeMember.teacherId
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
      const updatedCommitteeMember = await CommitteeMemberActions.update({ 
        id, 
        teacherId: editData.teacherId 
      });
      setCommitteeMembers(
        committeeMembers.map((cm) => (cm.id === id ? updatedCommitteeMember : cm))
      );
      setEditingId(null);
      toast.success('Член комиссии успешно обновлен');
    } catch (error) {
      toast.error('Ошибка обновления члена комиссии: ' + error.message);
    }
  };

  const handleCreate = async () => {
    if (!newCommitteeMember.committeeId || !newCommitteeMember.teacherId) {
      toast.error('Пожалуйста, выберите комиссию и преподавателя');
      return;
    }
  
    try {
      const createdCommitteeMember = await CommitteeMemberActions.create({
        committeeId: newCommitteeMember.committeeId,
        teacherId: newCommitteeMember.teacherId
      });
      setCommitteeMembers([...committeeMembers, createdCommitteeMember]);
      setNewCommitteeMember({ committeeId: '', teacherId: '' }); // Changed from null to empty string
      toast.success('Член комиссии успешно добавлен');
    } catch (error) {
      toast.error('Ошибка добавления члена комиссии: ' + error.message);
    }
  };

  const generateReport = async () => {
    if (!selectedCommittee) {
      toast.error('Пожалуйста, выберите комиссию для генерации отчета');
      return;
    }

    const currentDate = new Date().toLocaleDateString();
    const selectedCommitteeData = committees.find(c => c.id === selectedCommittee);
    const committeeHead = teachers.find(t => t.id === selectedCommitteeData?.teacherId)?.user?.name || 'Не указан';
    const filteredMembers = committeeMembers.filter(cm => cm.committeeId === selectedCommittee);

    const rows = [
      new DocxRow({
        children: [
          new DocxCell({
            children: [new Paragraph({
              children: [new TextRun({ text: "Комиссия:", bold: true, size: 28, font: "Times New Roman" })]
            })]
          }),
          new DocxCell({
            children: [new Paragraph({
              children: [new TextRun({ text: selectedCommitteeData?.name || 'Не указана', size: 28, font: "Times New Roman" })]
            })]
          }),
        ],
      }),
      new DocxRow({
        children: [
          new DocxCell({
            children: [new Paragraph({
              children: [new TextRun({ text: "Председатель:", bold: true, size: 28, font: "Times New Roman" })]
            })]
          }),
          new DocxCell({
            children: [new Paragraph({
              children: [new TextRun({ text: committeeHead, size: 28, font: "Times New Roman" })]
            })]
          }),
        ],
      }),
      new DocxRow({
        children: [
          new DocxCell({
            children: [new Paragraph({
              children: [new TextRun({ text: "Члены комиссии:", bold: true, size: 28, font: "Times New Roman" })]
            })]
          }),
          new DocxCell({
            children: [new Paragraph({
              children: [new TextRun({ text: "", size: 28, font: "Times New Roman" })]
            })]
          }),
        ],
      }),
      ...filteredMembers.map(committeeMember => (
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
                  text: teachers.find(t => t.id === committeeMember.teacherId)?.user?.name || 'Не указан', 
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
                text: "Отчет по составу комиссии",
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
      FileSaver.saveAs(blob, `Отчет_по_комиссии_${selectedCommitteeData?.name || ''}.docx`);
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

  const selectedCommitteeData = committees.find(c => c.id === selectedCommittee);
  const committeeHead = selectedCommitteeData 
    ? teachers.find(t => t.id === selectedCommitteeData.teacherId)?.user?.name 
    : null;

  return (
    <Box sx={{ p: 3 }}>
      <ToastContainer />

      {/* Committee selection */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <FormControl fullWidth>
          <InputLabel id="committee-select-label">Выберите комиссию</InputLabel>
          <Select
            labelId="committee-select-label"
            value={selectedCommittee || ''}
            onChange={handleCommitteeChange}
            label="Выберите комиссию"
            fullWidth
          >
            {committees.map((committee) => (
              <MenuItem key={committee.id} value={committee.id}>
                {committee.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {selectedCommitteeData && (
          <Box mt={2}>
            <Typography variant="h6" gutterBottom>
              Информация о комиссии
            </Typography>
            <Typography>
              <strong>Название:</strong> {selectedCommitteeData.name}
            </Typography>
            <Typography>
              <strong>Председатель:</strong> {committeeHead || 'Не назначен'}
            </Typography>
          </Box>
        )}
      </Paper>

      {/* Add new member form */}
      {selectedCommittee && (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Grid container spacing={2} alignItems="flex-end">
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="teacher-select-label">Выберите преподавателя</InputLabel>
                <Select
                  labelId="teacher-select-label"
                  value={newCommitteeMember.teacherId || ''}
                  onChange={(e) => setNewCommitteeMember({ 
                    ...newCommitteeMember, 
                    teacherId: e.target.value 
                  })}
                  label="Выберите преподавателя"
                >
                  {teachers.map((teacher) => (
                    <MenuItem key={teacher.id} value={teacher.id}>
                      {teacher.user?.name || 'Без имени'}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button 
                variant="contained" 
                onClick={handleCreate}
                fullWidth
                sx={{ height: '56px' }}
              >
                Добавить в комиссию
              </Button>
            </Grid>
          </Grid>
        </Paper>
      )}

      {/* Members table */}
      {selectedCommittee && (
        <>
          <TableContainer component={Paper} sx={{ mb: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Преподаватель</TableCell>
                  <TableCell align="right">Действия</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {committeeMembers
                  .filter((cm) => cm.committeeId === selectedCommittee)
                  .map((committeeMember) => (
                    <TableRow key={committeeMember.id}>
                      {editingId === committeeMember.id ? (
                        <>
                          <TableCell>
                            <Select
                              value={editData.teacherId || ''}
                              onChange={(e) => setEditData({...editData, teacherId: e.target.value})}
                              fullWidth
                            >
                              {teachers.map((teacher) => (
                                <MenuItem key={teacher.id} value={teacher.id}>
                                  {teacher.user?.name || 'Без имени'}
                                </MenuItem>
                              ))}
                            </Select>
                          </TableCell>
                          <TableCell align="right">
                            <IconButton onClick={() => handleSave(committeeMember.id)}>
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
                            {teachers.find((t) => t.id === committeeMember.teacherId)?.user?.name || 'Не указан'}
                          </TableCell>
                          <TableCell align="right">
                            <IconButton onClick={() => startEditing(committeeMember)}>
                              <Edit color="primary" />
                            </IconButton>
                            <IconButton onClick={() => handleDelete(committeeMember.id)}>
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

export default AdminCommitteeMemberSection;