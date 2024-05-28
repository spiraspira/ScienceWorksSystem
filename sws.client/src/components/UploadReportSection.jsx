import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, TextField, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ReportActions from '../actions/ReportActions';
import TeamActions from '../actions/TeamActions';

const UploadReportSection = () => {
    const { contestId } = useParams();
    const userId = localStorage.getItem('userId');
    const [userReport, setUserReport] = useState(null);
    const [teams, setTeams] = useState([]);
    const [newReport, setNewReport] = useState({
        name: '',
        teamId: null,
        contestId: contestId,
        file: null,
    });

    useEffect(() => {
        const fetchUserReport = async () => {
            try {
                const report = await ReportActions.getReportOfUser(userId, contestId);
                setUserReport(report);
            } catch (error) {
                toast.error(error.message);
            }
        };

        const fetchTeams = async () => {
            try {
                const teamsList = await TeamActions.getTeamsOfStudent(userId);

                setTeams(teamsList);
            } catch (error) {
                toast.error(error.message);
            }
        };

        fetchUserReport();
        fetchTeams();
    }, [userId, contestId]);

    const handleUpdate = async () => {
        try {
            await ReportActions.update(userReport);
            toast.success('Доклад обновлен успешно!');
        } catch (error) {
            toast.error('Ошибка обновления: ' + error.message);
        }
    };

    const handleCreate = async () => {
        try {
            await ReportActions.create(newReport);
            toast.success('Доклад загружен успешно!');
        } catch (error) {
            toast.error('Ошибка добавления доклада: ' + error.message);
        }
    };

    const downloadReport = (file) => {
        if (file) {
            const binaryData = atob(file);
            const arrayBuffer = new ArrayBuffer(binaryData.length);
            const uint8Array = new Uint8Array(arrayBuffer);

            for (let i = 0; i < binaryData.length; i++) {
                uint8Array[i] = binaryData.charCodeAt(i);
            }

            const blob = new Blob([uint8Array], { type: 'application/octet-stream' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'report.docx');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const handleFileUpload = (event) => {
        setNewReport({ ...newReport, file: event.target.files[0] });
    };

    return (
        <Box>
            <ToastContainer />
            <Typography variant="h3">
                Ваш доклад
            </Typography>
            {userReport ? (
                <Box>
                    <Typography variant="h4">
                        {userReport.name}
                    </Typography>
                    <Typography variant="body1">
                        Загружен: {userReport.dateUploaded?.substring(0, 10)}
                    </Typography>
                    <Typography variant="body1">
                        Обновлен: {userReport.dateUpdated?.substring(0, 10)}
                    </Typography>
                    <Box display="flex" justifyContent="space-between" mt={2}>
                        <Button variant="contained" onClick={() => downloadReport(userReport.file)}>
                            Скачать
                        </Button>
                        <Button variant="contained" component="label">
                            Обновить
                            <input type="file" hidden onChange={handleFileUpload} />
                        </Button>
                        <Button variant="contained" onClick={handleUpdate}>
                            Сохранить
                        </Button>
                    </Box>
                </Box>
            ) : (
                <Box>
                    <TextField
                        label="Заголовок"
                        value={newReport.name}
                        onChange={(e) => setNewReport({ ...newReport, name: e.target.value })}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Команда</InputLabel>
                        <Select
                            value={teams.find((team) => team.id === newReport.teamId)?.id || ''}
                            onChange={(event) => {
                                const selectedTeam = teams.find((team) => team.id === event.target.value);
                                setNewReport({ ...newReport, teamId: selectedTeam?.id });
                            }}
                        >
                            <MenuItem value="">
                                <em>Не выбрано</em>
                            </MenuItem>
                            {teams.map((team) => (
                                <MenuItem key={team.id} value={team.id}>
                                    {`${team.student?.user?.name || ''} | ${team.teacher?.user?.name || ''}`}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button variant="contained" component="label">
                        Загрузить файл
                        <input type="file" hidden onChange={handleFileUpload} />
                    </Button>
                    <Box display="flex" justifyContent="flex-end" mt={2}>
                        <Button variant="contained" onClick={handleCreate}>
                            Добавить доклад
                        </Button>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default UploadReportSection;