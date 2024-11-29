import React, { useState, useEffect } from 'react';
import { Box, Grid, TextField, Button, IconButton, Select, MenuItem, InputLabel } from '@mui/material';
import { Edit, Delete, Save } from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContestActions from '../actions/ContestActions';
import NominationActions from '../actions/NominationActions';
import { Document, Packer, Paragraph, Table, TableRow, TableCell, TextRun, AlignmentType, HeadingLevel } from "docx";
import * as FileSaver from 'file-saver';

const AdminNominationSection = () => {
  const [contests, setContests] = useState([]);
  const [nominations, setNominations] = useState([]);
  const [selectedContestId, setSelectedContestId] = useState(null);
  const [newNomination, setNewNomination] = useState({ name: '' });
  const [editingNomination, setEditingNomination] = useState(null);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const data = await ContestActions.getAll();
        setContests(data);
      } catch (error) {
        toast.error('Error fetching contests: ' + error.message);
      }
    };

    const fetchNominations = async () => {
      try {
        const data = await NominationActions.getAll();
        setNominations(data);
      } catch (error) {
        toast.error('Error fetching nominations: ' + error.message);
      }
    };

    fetchContests();
    fetchNominations();
  }, []);

  const handleContestChange = (event) => {
    setSelectedContestId(event.target.value);
  };

  const handleDelete = async (nominationId) => {
    try {
      await NominationActions.delete(nominationId);
      setNominations(nominations.filter((n) => n.id !== nominationId));
      toast.success('Nomination deleted successfully');
    } catch (error) {
      toast.error('Error deleting nomination: ' + error.message);
    }
  };

  const handleCreate = async () => {
    try {
      const newNominationData = { name: newNomination.name, contestId: selectedContestId };
      const createdNomination = await NominationActions.create(newNominationData);
      setNominations([...nominations, createdNomination]);
      setNewNomination({ name: '' });
      toast.success('Nomination created successfully');
    } catch (error) {
      toast.error('Error creating nomination: ' + error.message);
    }
  };

  const handleEdit = (nomination) => {
    setEditingNomination(nomination);
  };

  const handleSave = async (nomination) => {
    try {
      const updatedNomination = await NominationActions.update(nomination);
      setNominations(nominations.map((n) => (n.id === nomination.id ? updatedNomination : n)));
      setEditingNomination(null);
      toast.success('Nomination updated successfully');
    } catch (error) {
      toast.error('Error updating nomination: ' + error.message);
    }
  };

  const generateReport = async () => {
    const currentDate = new Date().toLocaleDateString();

    const rows = nominations
      .filter(nomination => nomination.contestId === selectedContestId)
      .map(nomination => (
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph({ text: nomination.name, size: 28 })]
            }),
            new TableCell({
              children: [new Paragraph({ text: contests.find(c => c.id === selectedContestId)?.name || 'N/A', size: 28 })]
            }),
          ],
        })
      ));

    const table = new Table({
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph({ children: [new TextRun({ text: "Nomination Name", bold: true })] })]
            }),
            new TableCell({
              children: [new Paragraph({ children: [new TextRun({ text: "Contest Name", bold: true })] })]
            }),
          ],
        }),
        ...rows,
      ],
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
                text: "Nominations Report",
                bold: true,
                size: 28,
              }),
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: currentDate, size: 28 })]
          }),
          new Paragraph({ text: "\n" }),
          table,
        ],
      }],
    });

    Packer.toBlob(doc).then(blob => {
      FileSaver.saveAs(blob, "Nominations_Report.docx");
    }).catch(err => {
      console.error("Error generating report:", err);
    });
  };

  return (
    <Box className="admin-section">
      <ToastContainer />
      <InputLabel id="select-label">Select a contest</InputLabel>
      <Select label="select-label" value={selectedContestId} onChange={handleContestChange}>
        {contests.map((contest) => (
          <MenuItem key={contest.id} value={contest.id}>
            {contest.name}
          </MenuItem>
        ))}
      </Select>
      <Grid container spacing={2}>
        {nominations
          .filter((nomination) => nomination.contestId === selectedContestId)
          .map((nomination) => (
            <Grid item xs={12} sm={6} md={4} key={nomination.id}>
              <Box className="university-card">
                {editingNomination?.id === nomination.id ? (
                  <>
                    <TextField
                      label="Name"
                      value={editingNomination.name}
                      onChange={(e) => setEditingNomination({ ...editingNomination, name: e.target.value })}
                    />
                    <Box className="university-actions">
                      <IconButton onClick={() => handleSave(editingNomination)}>
                        <Save />
                      </IconButton>
                    </Box>
                  </>
                ) : (
                  <>
                    <h3>{nomination.name}</h3>
                    <Box className="university-actions">
                      <IconButton onClick={() => handleEdit(nomination)}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(nomination.id)}>
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
        <TextField
          label="Name"
          value={newNomination.name}
          onChange={(e) => setNewNomination({ name: e.target.value })}
        />
        <Button onClick={handleCreate}>Create</Button>
      </Box>
      <Button variant="contained" color="primary" onClick={generateReport}>
        Download Report
      </Button>
    </Box>
  );
};

export default AdminNominationSection;