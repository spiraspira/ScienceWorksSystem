import React, { useState, useEffect } from 'react';
import { Box, Grid, TextField, Button, IconButton, Select, MenuItem } from '@mui/material';
import { Edit, Delete, Save } from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CommitteeActions from '../actions/CommitteeActions';
import TeacherActions from '../actions/TeacherActions';

const AdminCommitteeSection = () => {
  const [committees, setCommittees] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [newCommittee, setNewCommittee] = useState({ teacherId: '' });
  const [editingCommittee, setEditingCommittee] = useState(null);

  useEffect(() => {
    const fetchCommittees = async () => {
      try {
        const data = await CommitteeActions.getAll();
        setCommittees(data);
      } catch (error) {
        toast.error('Error fetching committees: ' + error.message);
      }
    };

    const fetchTeachers = async () => {
      try {
        const data = await TeacherActions.getAll();
        setTeachers(data);
      } catch (error) {
        toast.error('Error fetching teachers: ' + error.message);
      }
    };

    fetchCommittees();
    fetchTeachers();
  }, []);

  const handleDelete = async (committeeId) => {
    try {
      await CommitteeActions.delete(committeeId);
      setCommittees(committees.filter((c) => c.id !== committeeId));
      toast.success('Committee deleted successfully');
    } catch (error) {
      toast.error('Error deleting committee: ' + error.message);
    }
  };

  const handleCreate = async () => {
    try {
      const newCommitteeData = { teacherId: newCommittee.teacherId };
      const createdCommittee = await CommitteeActions.create(newCommitteeData);
      setCommittees([...committees, createdCommittee]);
      setNewCommittee({ teacherId: '' });
      toast.success('Committee created successfully');
    } catch (error) {
      toast.error('Error creating committee: ' + error.message);
    }
  };

  const handleEdit = (committee) => {
    setEditingCommittee(committee);
  };

  const handleSave = async (committee) => {
    try {
      const updatedCommittee = await CommitteeActions.update(committee);
      setCommittees(committees.map((c) => (c.id === committee.id ? updatedCommittee : c)));
      setEditingCommittee(null);
      toast.success('Committee updated successfully');
    } catch (error) {
      toast.error('Error updating committee: ' + error.message);
    }
  };

  return (
    <Box className="admin-section">
      <ToastContainer />
      <Grid container spacing={2}>
        {committees.map((committee) => (
          <Grid item xs={12} sm={6} md={4} key={committee.id}>
            <Box className="university-card">
              {editingCommittee?.id === committee.id ? (
                <>
                  <TextField label="ID" value={committee.id} disabled />
                  <Select
                    label="Teacher"
                    value={editingCommittee.teacherId}
                    onChange={(e) => setEditingCommittee({ ...editingCommittee, teacherId: e.target.value })}
                  >
                    {teachers.map((teacher) => (
                      <MenuItem key={teacher.id} value={teacher.id}>
                        {teacher.user?.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <Box className="university-actions">
                    <IconButton onClick={() => handleSave(editingCommittee)}>
                      <Save />
                    </IconButton>
                  </Box>
                </>
              ) : (
                <>
                  <p>{committee.name}</p>
                  <p>Id: {committee.id}</p>
                  <p>Teacher: {committee.teacher?.user?.name}</p>
                  <Box className="university-actions">
                    <IconButton onClick={() => handleEdit(committee)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(committee.id)}>
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
          label="Teacher"
          value={newCommittee.teacherId}
          onChange={(e) => setNewCommittee({ teacherId: e.target.value })}
        >
          {teachers.map((teacher) => (
            <MenuItem key={teacher.id} value={teacher.id}>
              {teacher.user?.name}
            </MenuItem>
          ))}
        </Select>
        <Button onClick={handleCreate}>Create</Button>
      </Box>
    </Box>
  );
};

export default AdminCommitteeSection;