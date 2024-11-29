import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
  IconButton,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { Edit, Delete, Save } from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserActions from '../actions/UserActions';
import UniversityActions from '../actions/UniversityActions';
import { Document, Packer, Paragraph, Table, TableRow, TableCell, TextRun, AlignmentType, HeadingLevel } from "docx";
import * as FileSaver from 'file-saver';

const AdminUserSection = () => {
  const [users, setUsers] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [newUser, setNewUser] = useState({
    name: '',
    login: '',
    password: '',
    isStudent: false,
    universityId: '',
  });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await UserActions.getAll();
        setUsers(userData);
      } catch (error) {
        toast.error('Error fetching users: ' + error.message);
      }
    };

    const fetchUniversities = async () => {
      try {
        const universityData = await UniversityActions.getAll();
        setUniversities(universityData);
      } catch (error) {
        toast.error('Error fetching universities: ' + error.message);
      }
    };

    fetchUsers();
    fetchUniversities();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await UserActions.delete(userId);
      setUsers(users.filter((u) => u.id !== userId));
      toast.success('User deleted successfully');
    } catch (error) {
      toast.error('Error deleting user: ' + error.message);
    }
  };

  const handleCreate = async () => {
    try {
      const newUserData = { ...newUser };
      const createdUser = await UserActions.create(newUserData);
      setUsers([...users, createdUser]);
      setNewUser({
        name: '',
        login: '',
        password: '',
        isStudent: false,
        universityId: '',
      });
      toast.success('User created successfully');
    } catch (error) {
      toast.error('Error creating user: ' + error.message);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleSave = async (user) => {
    try {
      const updatedUser = await UserActions.update(user);
      setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));
      setEditingUser(null);
      toast.success('User updated successfully');
    } catch (error) {
      toast.error('Error updating user: ' + error.message);
    }
  };

  const generateReport = async () => {
    const currentDate = new Date().toLocaleDateString();

    const rows = [
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({
              children: [new TextRun({ text: "Name", bold: true, size: 28, font: "Times New Roman" })]
            })]
          }),
          new TableCell({
            children: [new Paragraph({
              children: [new TextRun({ text: "Login", bold: true, size: 28, font: "Times New Roman" })]
            })]
          }),
          new TableCell({
            children: [new Paragraph({
              children: [new TextRun({ text: "Is Student", bold: true, size: 28, font: "Times New Roman" })]
            })]
          }),
          new TableCell({
            children: [new Paragraph({
              children: [new TextRun({ text: "University", bold: true, size: 28, font: "Times New Roman" })]
            })]
          }),
        ],
      }),
      ...users.map(user => (
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph({
                children: [new TextRun({ text: user.name, size: 28, font: "Times New Roman" })]
              })]
            }),
            new TableCell({
              children: [new Paragraph({
                children: [new TextRun({ text: user.login, size: 28, font: "Times New Roman" })]
              })]
            }),
            new TableCell({
              children: [new Paragraph({
                children: [new TextRun({ text: user.isStudent ? 'Yes' : 'No', size: 28, font: "Times New Roman" })]
              })]
            }),
            new TableCell({
              children: [new Paragraph({
                children: [new TextRun({ text: universities.find((u) => u.id === user.universityId)?.name || '', size: 28, font: "Times New Roman" })]
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
                text: "User Report",
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
      FileSaver.saveAs(blob, "User_Report.docx");
    }).catch(err => {
      console.error("Error generating report:", err);
    });
  };

  return (
    <Box className="admin-section">
      <ToastContainer />
      <Grid container spacing={2}>
        {users.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <Box className="university-card">
              {editingUser?.id === user.id ? (
                <>
                  <TextField
                    label="Name"
                    value={editingUser.name}
                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  />
                  <TextField
                    label="Login"
                    value={editingUser.login}
                    onChange={(e) => setEditingUser({ ...editingUser, login: e.target.value })}
                  />
                  <TextField
                    label="Password"
                    value={editingUser.password}
                    onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={editingUser.isStudent}
                        onChange={(e) => setEditingUser({ ...editingUser, isStudent: e.target.checked })}
                      />
                    }
                    label="Is Student"
                  />
                  <Select
                    value={editingUser.universityId}
                    onChange={(e) => setEditingUser({ ...editingUser, universityId: e.target.value })}
                  >
                    <MenuItem value="">Select University</MenuItem>
                    {universities.map((university) => (
                      <MenuItem key={university.id} value={university.id}>
                        {university.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <Box className="university-actions">
                    <IconButton onClick={() => handleSave(editingUser)}>
                      <Save />
                    </IconButton>
                  </Box>
                </>
              ) : (
                <>
                  <h3>{user.name}</h3>
                  <p>Login: {user.login}</p>
                  <p>Password: {user.password}</p>
                  <p>Student: {user.isStudent ? 'Yes' : 'No'}</p>
                  <p>University: {universities.find((u) => u.id === user.universityId)?.name}</p>
                  <Box className="university-actions">
                    <IconButton onClick={() => handleEdit(user)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(user.id)}>
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
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <TextField
          label="Login"
          value={newUser.login}
          onChange={(e) => setNewUser({ ...newUser, login: e.target.value })}
        />
        <TextField
          label="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={newUser.isStudent}
              onChange={(e) => setNewUser({ ...newUser, isStudent: e.target.checked })}
            />
          }
          label="Is Student"
        />
        <Select
          value={newUser.universityId}
          onChange={(e) => setNewUser({ ...newUser, universityId: e.target.value })}
        >
          <MenuItem value="">Select University</MenuItem>
          {universities.map((university) => (
            <MenuItem key={university.id} value={university.id}>
              {university.name}
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

export default AdminUserSection;