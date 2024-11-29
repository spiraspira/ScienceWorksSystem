import React, { useState, useEffect } from 'react';
import { Box, Grid, TextField, Button, IconButton } from '@mui/material';
import { Edit, Delete, Save } from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UniversityActions from '../actions/UniversityActions';
import { Document, Packer, Paragraph, Table, TableRow, TableCell, TextRun, AlignmentType, HeadingLevel } from "docx";
import * as FileSaver from 'file-saver';

const AdminUniversitySection = () => {
  const [universities, setUniversities] = useState([]);
  const [newUniversity, setNewUniversity] = useState({ name: '', location: '' });
  const [editingUniversity, setEditingUniversity] = useState(null);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const data = await UniversityActions.getAll();
        setUniversities(data);
      } catch (error) {
        toast.error('Error fetching universities: ' + error.message);
      }
    };
    fetchUniversities();
  }, []);

  const handleDelete = async (universityId) => {
    try {
      await UniversityActions.delete(universityId);
      setUniversities(universities.filter((u) => u.id !== universityId));
      toast.success('University deleted successfully');
    } catch (error) {
      toast.error('Error deleting university: ' + error.message);
    }
  };

  const handleCreate = async () => {
    try {
      const newUniversityData = { name: newUniversity.name, location: newUniversity.location };
      const createdUniversity = await UniversityActions.create(newUniversityData);
      setUniversities([...universities, createdUniversity]);
      setNewUniversity({ name: '', location: '' });
      toast.success('University created successfully');
    } catch (error) {
      toast.error('Error creating university: ' + error.message);
    }
  };

  const handleEdit = (university) => {
    setEditingUniversity(university);
  };

  const handleSave = async (university) => {
    try {
      const updatedUniversity = await UniversityActions.update(university);
      setUniversities(universities.map((u) => (u.id === university.id ? updatedUniversity : u)));
      setEditingUniversity(null);
      toast.success('University updated successfully');
    } catch (error) {
      toast.error('Error updating university: ' + error.message);
    }
  };

  const generateReport = async () => {
    const currentDate = new Date().toLocaleDateString();

    const rows = [
        new TableRow({
            children: [
                new TableCell({
                    children: [new Paragraph({
                        children: [new TextRun({ text: "Университет", bold: true, size: 28, font: "Times New Roman" })]
                    })]
                }),
                new TableCell({
                    children: [new Paragraph({
                        children: [new TextRun({ text: "Город", bold: true, size: 28, font: "Times New Roman" })]
                    })]
                }),
            ],
        }),
        ...universities.map(university => (
            new TableRow({
                children: [
                    new TableCell({
                        children: [new Paragraph({
                            children: [new TextRun({ text: university.name, size: 28, font: "Times New Roman" })]
                        })]
                    }),
                    new TableCell({
                        children: [new Paragraph({
                            children: [new TextRun({ text: university.location, size: 28, font: "Times New Roman" })]
                        })]
                    }),
                ],
            })
        )),
    ];

    const table = new Table({
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
                            text: "Отчет по университетам",
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
                new Paragraph({ text: "\n" }), // Add some spacing
                table, // Add the table to the document
            ],
        }],
    });

    Packer.toBlob(doc).then(blob => {
        FileSaver.saveAs(blob, "University_Report.docx");
    }).catch(err => {
        console.error("Error generating report:", err);
    });
};

  return (
    <Box className="admin-section">
      <ToastContainer />
      <Grid container spacing={2}>
        {universities.map((university) => (
          <Grid item xs={12} sm={6} md={4} key={university.id}>
            <Box className="university-card">
              {editingUniversity?.id === university.id ? (
                <>
                  <TextField
                    label="Name"
                    value={editingUniversity.name}
                    onChange={(e) => setEditingUniversity({ ...editingUniversity, name: e.target.value })}
                  />
                  <TextField
                    label="Location"
                    value={editingUniversity.location}
                    onChange={(e) => setEditingUniversity({ ...editingUniversity, location: e.target.value })}
                  />
                  <Box className="university-actions">
                    <IconButton onClick={() => handleSave(editingUniversity)}>
                      <Save />
                    </IconButton>
                  </Box>
                </>
              ) : (
                <>
                  <h3>{university.name}</h3>
                  <p>Location: {university.location}</p>
                  <Box className="university-actions">
                    <IconButton onClick={() => handleEdit(university)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(university.id)}>
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
          value={newUniversity.name}
          onChange={(e) => setNewUniversity({ ...newUniversity, name: e.target.value })}
        />
        <TextField
          label="Location"
          value={newUniversity.location}
          onChange={(e) => setNewUniversity({ ...newUniversity, location: e.target.value })}
        />
        <Button onClick={handleCreate}>Create</Button>
      </Box>
      <Button variant="contained" color="primary" onClick={generateReport}>
        Download Report
      </Button>
    </Box>
  );
};

export default AdminUniversitySection;