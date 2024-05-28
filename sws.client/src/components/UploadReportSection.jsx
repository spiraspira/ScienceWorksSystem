import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, TextField, Autocomplete, Typography } from '@mui/material';
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
      toast.success('Report updated successfully');
    } catch (error) {
      toast.error('Error updating report: ' + error.message);
    }
  };

  const handleCreate = async () => {
    try {
      await ReportActions.create(newReport);
      toast.success('Report created successfully');
    } catch (error) {
      toast.error('Error creating report: ' + error.message);
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
      {userReport ? (
        <Box>
          <TextField
            label="Name"
            defaultValue={userReport.name}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Typography variant="body1">
            Uploaded: {new Date(userReport.dateUploaded).toLocaleString()}
          </Typography>
          <Typography variant="body1">
            Updated: {new Date(userReport.dateUpdated).toLocaleString()}
          </Typography>
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button variant="contained" onClick={() => downloadReport(userReport.file)}>
              Download
            </Button>
            <Button variant="contained" component="label">
              Reupload
              <input type="file" hidden onChange={handleFileUpload} />
            </Button>
            <Button variant="contained" onClick={handleUpdate}>
              Update
            </Button>
          </Box>
        </Box>
      ) : (
        <Box>
          <TextField
            label="Name"
            value={newReport.name}
            onChange={(e) => setNewReport({ ...newReport, name: e.target.value })}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Autocomplete
            options={teams}
            getOptionLabel={(option) => option.name}
            value={teams.find((team) => team.id === newReport.teamId)}
            onChange={(_, team) => setNewReport({ ...newReport, teamId: team?.id })}
            renderInput={(params) => <TextField {...params} label="Team" variant="outlined" />}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" component="label">
            Upload
            <input type="file" hidden onChange={handleFileUpload} />
          </Button>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button variant="contained" onClick={handleCreate}>
              Submit
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default UploadReportSection;