import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, TextField, Typography, Select, MenuItem, InputLabel, FormControl, Card, CardContent } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';
import ReportActions from '../actions/ReportActions';
import TeamActions from '../actions/TeamActions';

const UploadReportSection = ({isContestFinished}) => {
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
    const [uploadedFile, setUploadedFile] = useState(null);

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

    const convertToBytes = async (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result.split(',')[1]);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        setUploadedFile(file);
        const fileBytes = await convertToBytes(file);

        setUserReport({ ...userReport, file: fileBytes });
    };

    const handleNewFileUpload = async (event) => {
        const file = event.target.files[0];
        setUploadedFile(file);
        const fileBytes = await convertToBytes(file);

        setNewReport({ ...newReport, file: fileBytes });
    };

    return (
        <Box className="contest-info-container">
            <ToastContainer />
            <Card className="contest-info-card">
                <CardContent className="contest-info-content">
                    <Typography variant="h5" className="contest-title">
                        Ваш доклад
                    </Typography>

                    {userReport ? (
                        <Box className="report-container">
                            <Typography variant="body1" className="report-name">
                                <strong>Название:</strong> {userReport.name}
                            </Typography>
                            <Typography variant="body2" className="report-meta">
                                <strong>Загружен:</strong> {userReport.dateUploaded?.substring(0, 10) || 'N/A'}
                            </Typography>
                            <Typography variant="body2" className="report-meta">
                                <strong>Обновлен:</strong> {userReport.dateUpdated?.substring(0, 10) || 'N/A'}
                            </Typography>
                            
                            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    onClick={() => downloadReport(userReport.file)}
                                    className="download-btn"
                                >
                                    Скачать
                                </Button>
                                
                                {!isContestFinished && (
                                    <>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            component="label"
                                            className="upload-btn"
                                        >
                                            Обновить файл
                                            <input type="file" hidden onChange={handleFileUpload} />
                                        </Button>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            onClick={handleUpdate}
                                            className="save-btn"
                                        >
                                            Сохранить
                                        </Button>
                                    </>
                                )}
                            </Box>
                            {uploadedFile && (
                                <Typography variant="caption" className="file-name">
                                    Выбран файл: {uploadedFile.name}
                                </Typography>
                            )}
                        </Box>
                    ) : (
                        <Box>
                            {!isContestFinished ? (
                                <Box className="new-report-form">
                                    <TextField
                                        label="Название доклада"
                                        value={newReport.name}
                                        onChange={(e) => setNewReport({ ...newReport, name: e.target.value })}
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        size="small"
                                        className="report-name-input"
                                    />
                                    
                                    <FormControl fullWidth margin="normal" size="small">
                                        <InputLabel>Команда</InputLabel>
                                        <Select
                                            value={newReport.teamId || ''}
                                            onChange={(e) => setNewReport({ ...newReport, teamId: e.target.value })}
                                            label="Команда"
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

                                    <Box sx={{ mt: 2, mb: 2 }}>
                                        <Button
                                            variant="outlined"
                                            component="label"
                                            size="small"
                                            className="file-upload-btn"
                                        >
                                            Выбрать файл
                                            <input type="file" hidden onChange={handleNewFileUpload} />
                                        </Button>
                                        {uploadedFile && (
                                            <Typography variant="caption" className="file-name">
                                                {uploadedFile.name}
                                            </Typography>
                                        )}
                                    </Box>

                                    <Button
                                        variant="contained"
                                        onClick={handleCreate}
                                        size="small"
                                        className="submit-btn"
                                        disabled={!newReport.name || !newReport.teamId || !newReport.file}
                                    >
                                        Отправить доклад
                                    </Button>
                                </Box>
                            ) : (
                                <Typography variant="body2" className="contest-closed-message">
                                    Этап приема работ завершен
                                </Typography>
                            )}
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default UploadReportSection;