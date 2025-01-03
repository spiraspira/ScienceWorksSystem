import React, { useState, useEffect } from 'react';
import { Box, Grid, Button, IconButton, MenuItem, Select, InputLabel } from '@mui/material';
import { Edit, Delete, Save } from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CommitteeActions from '../actions/CommitteeActions';
import CommitteeMemberActions from '../actions/CommitteeMemberActions';
import TeacherActions from '../actions/TeacherActions';
import { Document, Packer, Paragraph, Table, TableRow, TableCell, TextRun, AlignmentType, HeadingLevel } from "docx";
import * as FileSaver from 'file-saver';

const AdminCommitteeMemberSection = () => {
  const [committees, setCommittees] = useState([]);
  const [committeMembers, setCommitteeMembers] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [selectedCommittee, setSelectedCommittee] = useState(null);
  const [newCommitteeMember, setNewCommitteeMember] = useState({ committeeId: null, teacherId: null });
  const [editingCommitteeMember, setEditingCommitteeMember] = useState(null);

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
        toast.error('Error fetching data: ' + error.message);
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
      setCommitteeMembers(committeMembers.filter((cm) => cm.id !== committeeMemberId));
      toast.success('Committee member deleted successfully');
    } catch (error) {
      toast.error('Error deleting committee member: ' + error.message);
    }
  };

  const handleEdit = (committeeMember) => {
    setEditingCommitteeMember(committeeMember);
  };

  const handleSave = async (committeeMember) => {
    try {
      const updatedCommitteeMember = await CommitteeMemberActions.update(committeeMember);
      setCommitteeMembers(
        committeMembers.map((cm) => (cm.id === committeeMember.id ? updatedCommitteeMember : cm))
      );
      setEditingCommitteeMember(null);
      toast.success('Committee member updated successfully');
    } catch (error) {
      toast.error('Error updating committee member: ' + error.message);
    }
  };

  const handleCreate = async () => {
    try {
      const newCommitteeMemberData = { committeeId: newCommitteeMember.committeeId, teacherId: newCommitteeMember.teacherId };
      const createdCommitteeMember = await CommitteeMemberActions.create(newCommitteeMemberData);
      setCommitteeMembers([...committeMembers, createdCommitteeMember]);
      setNewCommitteeMember({ committeeId: null, teacherId: null });
      toast.success('Committee member created successfully');
    } catch (error) {
      toast.error('Error creating committee member: ' + error.message);
    }
  };

  const generateReport = async () => {
    const currentDate = new Date().toLocaleDateString();
  
    // Find the selected committee
    const selectedCommitteeData = committees.find(c => c.id === selectedCommittee);
  
    // Filter members for the selected committee
    const filteredMembers = committeMembers.filter(cm => cm.committeeId === selectedCommittee);
  
    const rows = [
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({
              children: [new TextRun({ text: "Teacher", bold: true, size: 28 })]
            })]
          }),
        ],
      }),
      ...filteredMembers.map(committeeMember => (
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph({
                children: [new TextRun({ text: teachers.find(t => t.id === committeeMember.teacherId)?.user?.name || '', size: 28 })]
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
                text: `Committee Members Report for ${selectedCommitteeData?.name || 'Selected Committee'}`,
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
      FileSaver.saveAs(blob, "Committee_Members_Report.docx");
    }).catch(err => {
      console.error("Error generating report:", err);
    });
  };

  return (
    <Box className="admin-section">
      <ToastContainer />
      <Box className="committee-selector">
        <InputLabel id="select-label">Select a committee</InputLabel>
        <Select label={"select-label"} value={selectedCommittee} onChange={handleCommitteeChange} name={'select'}>
          {committees.map((committee) => (
            <MenuItem key={committee.id} value={committee.id}>
              {committee.name}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Grid container spacing={2}>
        {committeMembers
          .filter((cm) => cm.committeeId === selectedCommittee)
          .map((committeeMember) => (
            <Grid item xs={12} sm={6} md={4} key={committeeMember.id}>
              <Box className="university-card">
                {editingCommitteeMember?.id === committeeMember.id ? (
                  <>
                    <Select
                      value={editingCommitteeMember.teacherId}
                      onChange={(e) =>
                        setEditingCommitteeMember({
                          ...editingCommitteeMember,
                          teacherId: e.target.value,
                        })
                      }
                    >
                      {teachers.map((teacher) => (
                        <MenuItem key={teacher.id} value={teacher.id}>
                          {teacher.user?.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <Box className="university-actions">
                      <IconButton onClick={() => handleSave(editingCommitteeMember)}>
                        <Save />
                      </IconButton>
                    </Box>
                  </>
                ) : (
                  <>
                    <p>Teacher: {teachers.find((t) => t.id === committeeMember.teacherId)?.user?.name}</p>
                    <Box className="university-actions">
                      <IconButton onClick={() => handleEdit(committeeMember)}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(committeeMember.id)}>
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
        <Select
          value={newCommitteeMember.committeeId}
          onChange={(e) => setNewCommitteeMember({ ...newCommitteeMember, committeeId: e.target.value })}
        >
          <MenuItem value={null}>Select a committee</MenuItem>
          {committees.map((committee) => (
            <MenuItem key={committee.id} value={committee.id}>
              {committee.name}
            </MenuItem>
          ))}
        </Select>
        <Select
          value={newCommitteeMember.teacherId}
          onChange={(e) => setNewCommitteeMember({ ...newCommitteeMember, teacherId: e.target.value })}
        >
          <MenuItem value={null}>Select a teacher</MenuItem>
          {teachers.map((teacher) => (
            <MenuItem key={teacher.id} value={teacher.id}>
              {teacher.user?.name}
            </MenuItem>
          ))}
        </Select>
        <Button onClick={handleCreate}>Create</Button>
      </Box>
      <Button variant="contained" color="primary" onClick={generateReport}>
        Download Report
      </Button>
    </Box>
  );
};

export default AdminCommitteeMemberSection;