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
import CommitteeActions from '../actions/CommitteeActions';
import TeacherActions from '../actions/TeacherActions';
import { Document, Packer, Paragraph, Table as DocxTable, TableRow as DocxRow, TableCell as DocxCell, TextRun, AlignmentType, HeadingLevel } from "docx";
import * as FileSaver from 'file-saver';

const AdminContestSection = () => {
    const [contests, setContests] = useState([]);
    const [committees, setCommittees] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [newContest, setNewContest] = useState({
        name: '',
        description: '',
        dateStart: '',
        dateStartSecondTour: '',
        dateEnd: '',
        organizationCommitteeId: '',
        programCommitteeId: '',
        invitedTeacherId: '',
    });
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({
        name: '',
        description: '',
        dateStart: '',
        dateStartSecondTour: '',
        dateEnd: '',
        organizationCommitteeId: '',
        programCommitteeId: '',
        invitedTeacherId: '',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [contestsData, committeesData, teachersData] = await Promise.all([
                    ContestActions.getAll(),
                    CommitteeActions.getAll(),
                    TeacherActions.getAll()
                ]);
                setContests(contestsData);
                setCommittees(committeesData);
                setTeachers(teachersData);
            } catch (error) {
                toast.error('Ошибка загрузки данных: ' + error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (contestId) => {
        try {
            await ContestActions.delete(contestId);
            setContests(contests.filter((c) => c.id !== contestId));
            toast.success('Конкурс успешно удален');
        } catch (error) {
            toast.error('Ошибка удаления конкурса: ' + error.message);
        }
    };

    const handleCreate = async () => {
        if (!newContest.name || !newContest.dateStart || !newContest.dateEnd) {
            toast.error('Пожалуйста, заполните обязательные поля');
            return;
        }

        try {
            const createdContest = await ContestActions.create({
                ...newContest,
                dateStart: new Date(newContest.dateStart).toISOString(),
                dateStartSecondTour: new Date(newContest.dateStartSecondTour).toISOString(),
                dateEnd: new Date(newContest.dateEnd).toISOString()
            });
            setContests([...contests, createdContest]);
            setNewContest({
                name: '',
                description: '',
                dateStart: '',
                dateStartSecondTour: '',
                dateEnd: '',
                organizationCommitteeId: '',
                programCommitteeId: '',
                invitedTeacherId: '',
            });
            toast.success('Конкурс успешно создан');
        } catch (error) {
            toast.error('Ошибка создания конкурса: ' + error.message);
        }
    };

    const startEditing = (contest) => {
        setEditingId(contest.id);
        setEditData({
            name: contest.name,
            description: contest.description,
            dateStart: contest.dateStart.slice(0, 16),
            dateStartSecondTour: contest.dateStartSecondTour?.slice(0, 16) || '',
            dateEnd: contest.dateEnd.slice(0, 16),
            organizationCommitteeId: contest.organizationCommitteeId,
            programCommitteeId: contest.programCommitteeId,
            invitedTeacherId: contest.invitedTeacherId,
        });
    };

    const cancelEditing = () => {
        setEditingId(null);
    };

    const handleSave = async (id) => {
        if (!editData.name || !editData.dateStart || !editData.dateEnd) {
            toast.error('Пожалуйста, заполните обязательные поля');
            return;
        }

        try {
            const updatedContest = await ContestActions.update({
                id,
                ...editData,
                dateStart: new Date(editData.dateStart).toISOString(),
                dateStartSecondTour: new Date(editData.dateStartSecondTour).toISOString(),
                dateEnd: new Date(editData.dateEnd).toISOString()
            });
            setContests(contests.map((c) => (c.id === id ? updatedContest : c)));
            setEditingId(null);
            toast.success('Конкурс успешно обновлен');
        } catch (error) {
            toast.error('Ошибка обновления конкурса: ' + error.message);
        }
    };

    const generateReport = async () => {
        const currentDate = new Date().toLocaleDateString();
    
        const rows = [
            new DocxRow({
                children: [
                    new DocxCell({
                        children: [new Paragraph({
                            children: [new TextRun({ text: "Название", bold: true, size: 28, font: "Times New Roman" })]
                        })]
                    }),
                    new DocxCell({
                        children: [new Paragraph({
                            children: [new TextRun({ text: "Описание", bold: true, size: 28, font: "Times New Roman" })]
                        })]
                    }),
                    new DocxCell({
                        children: [new Paragraph({
                            children: [new TextRun({ text: "Дата начала", bold: true, size: 28, font: "Times New Roman" })]
                        })]
                    }),
                    new DocxCell({
                        children: [new Paragraph({
                            children: [new TextRun({ text: "Дата окончания", bold: true, size: 28, font: "Times New Roman" })]
                        })]
                    }),
                ],
            }),
            ...contests.map(contest => (
                new DocxRow({
                    children: [
                        new DocxCell({
                            children: [new Paragraph({
                                children: [new TextRun({ text: contest.name, size: 28, font: "Times New Roman" })]
                            })]
                        }),
                        new DocxCell({
                            children: [new Paragraph({
                                children: [new TextRun({ text: contest.description || '—', size: 28, font: "Times New Roman" })]
                            })]
                        }),
                        new DocxCell({
                            children: [new Paragraph({
                                children: [new TextRun({ text: new Date(contest.dateStart).toLocaleString(), size: 28, font: "Times New Roman" })]
                            })]
                        }),
                        new DocxCell({
                            children: [new Paragraph({
                                children: [new TextRun({ text: new Date(contest.dateEnd).toLocaleString(), size: 28, font: "Times New Roman" })]
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
                                text: "Отчет по конкурсам",
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
            FileSaver.saveAs(blob, "Отчет_по_конкурсам.docx");
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
            
            {/* Add new contest form */}
            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>Добавить новый конкурс</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Название"
                            value={newContest.name}
                            onChange={(e) => setNewContest({ ...newContest, name: e.target.value })}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Описание"
                            value={newContest.description}
                            onChange={(e) => setNewContest({ ...newContest, description: e.target.value })}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            label="Дата начала"
                            type="datetime-local"
                            value={newContest.dateStart}
                            onChange={(e) => setNewContest({ ...newContest, dateStart: e.target.value })}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            label="Дата начала второго тура"
                            type="datetime-local"
                            value={newContest.dateStartSecondTour}
                            onChange={(e) => setNewContest({ ...newContest, dateStartSecondTour: e.target.value })}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            label="Дата окончания"
                            type="datetime-local"
                            value={newContest.dateEnd}
                            onChange={(e) => setNewContest({ ...newContest, dateEnd: e.target.value })}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <InputLabel>Орг. комитет</InputLabel>
                            <Select
                                value={newContest.organizationCommitteeId}
                                onChange={(e) => setNewContest({ ...newContest, organizationCommitteeId: e.target.value })}
                                label="Орг. комитет"
                            >
                                {committees.map((committee) => (
                                    <MenuItem key={committee.id} value={committee.id}>
                                        {committee.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <InputLabel>Програм. комитет</InputLabel>
                            <Select
                                value={newContest.programCommitteeId}
                                onChange={(e) => setNewContest({ ...newContest, programCommitteeId: e.target.value })}
                                label="Програм. комитет"
                            >
                                {committees.map((committee) => (
                                    <MenuItem key={committee.id} value={committee.id}>
                                        {committee.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <InputLabel>Приглашенный преподаватель</InputLabel>
                            <Select
                                value={newContest.invitedTeacherId}
                                onChange={(e) => setNewContest({ ...newContest, invitedTeacherId: e.target.value })}
                                label="Приглашенный преподаватель"
                            >
                                {teachers.map((teacher) => (
                                    <MenuItem key={teacher.id} value={teacher.id}>
                                        {teacher.user?.name || 'Без имени'}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button 
                            variant="contained" 
                            onClick={handleCreate}
                            fullWidth
                            size="large"
                        >
                            Создать конкурс
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            {/* Contests table */}
            <TableContainer component={Paper} sx={{ mb: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Название</TableCell>
                            <TableCell>Дата начала</TableCell>
                            <TableCell>Дата окончания</TableCell>
                            <TableCell>Орг. комитет</TableCell>
                            <TableCell align="right">Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {contests.map((contest) => (
                            <TableRow key={contest.id}>
                                {editingId === contest.id ? (
                                    <>
                                        <TableCell>
                                            <TextField
                                                value={editData.name}
                                                onChange={(e) => setEditData({...editData, name: e.target.value})}
                                                fullWidth
                                                size="small"
                                                required
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                type="datetime-local"
                                                value={editData.dateStart}
                                                onChange={(e) => setEditData({...editData, dateStart: e.target.value})}
                                                fullWidth
                                                size="small"
                                                InputLabelProps={{ shrink: true }}
                                                required
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                type="datetime-local"
                                                value={editData.dateEnd}
                                                onChange={(e) => setEditData({...editData, dateEnd: e.target.value})}
                                                fullWidth
                                                size="small"
                                                InputLabelProps={{ shrink: true }}
                                                required
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Select
                                                value={editData.organizationCommitteeId}
                                                onChange={(e) => setEditData({...editData, organizationCommitteeId: e.target.value})}
                                                fullWidth
                                                size="small"
                                            >
                                                {committees.map((committee) => (
                                                    <MenuItem key={committee.id} value={committee.id}>
                                                        {committee.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </TableCell>
                                        <TableCell align="right">
                                            <IconButton onClick={() => handleSave(contest.id)}>
                                                <Save color="primary" />
                                            </IconButton>
                                            <IconButton onClick={cancelEditing}>
                                                <Cancel color="error" />
                                            </IconButton>
                                        </TableCell>
                                    </>
                                ) : (
                                    <>
                                        <TableCell>{contest.name}</TableCell>
                                        <TableCell>{new Date(contest.dateStart).toLocaleString()}</TableCell>
                                        <TableCell>{new Date(contest.dateEnd).toLocaleString()}</TableCell>
                                        <TableCell>
                                            {committees.find(c => c.id === contest.organizationCommitteeId)?.name || '—'}
                                        </TableCell>
                                        <TableCell align="right">
                                            <IconButton onClick={() => startEditing(contest)}>
                                                <Edit color="primary" />
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete(contest.id)}>
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
        </Box>
    );
};

export default AdminContestSection;