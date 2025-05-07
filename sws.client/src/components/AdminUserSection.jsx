import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  TextField, 
  Button, 
  IconButton,
  Paper,
  CircularProgress,
  Grid,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem
} from '@mui/material';
import { Edit, Delete, Save, Cancel } from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserActions from '../actions/UserActions';
import UniversityActions from '../actions/UniversityActions';

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
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    name: '',
    login: '',
    password: '',
    isStudent: false,
    universityId: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, universityData] = await Promise.all([
          UserActions.getAll(),
          UniversityActions.getAll()
        ]);
        setUsers(userData);
        setUniversities(universityData);
      } catch (error) {
        toast.error('Ошибка загрузки данных: ' + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await UserActions.delete(userId);
      setUsers(users.filter((u) => u.id !== userId));
      toast.success('Пользователь успешно удален');
    } catch (error) {
      toast.error('Ошибка удаления пользователя: ' + error.message);
    }
  };

  const handleCreate = async () => {
    if (!newUser.name || !newUser.login || !newUser.password) {
      toast.error('Пожалуйста, заполните все обязательные поля');
      return;
    }

    try {
      const createdUser = await UserActions.create(newUser);
      setUsers([...users, createdUser]);
      setNewUser({
        name: '',
        login: '',
        password: '',
        isStudent: false,
        universityId: '',
      });
      toast.success('Пользователь успешно создан');
    } catch (error) {
      toast.error('Ошибка создания пользователя: ' + error.message);
    }
  };

  const startEditing = (user) => {
    setEditingId(user.id);
    setEditData({
      name: user.name,
      login: user.login,
      password: user.password,
      isStudent: user.isStudent,
      universityId: user.universityId
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const handleSave = async (id) => {
    if (!editData.name || !editData.login || !editData.password) {
      toast.error('Пожалуйста, заполните все обязательные поля');
      return;
    }

    try {
      const updatedUser = await UserActions.update({ id, ...editData });
      setUsers(users.map((u) => (u.id === id ? updatedUser : u)));
      setEditingId(null);
      toast.success('Пользователь успешно обновлен');
    } catch (error) {
      toast.error('Ошибка обновления пользователя: ' + error.message);
    }
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
      
      {/* Add new user form */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="ФИО"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              label="Логин"
              value={newUser.login}
              onChange={(e) => setNewUser({ ...newUser, login: e.target.value })}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              label="Пароль"
              type="password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={newUser.isStudent}
                  onChange={(e) => setNewUser({ ...newUser, isStudent: e.target.checked })}
                />
              }
              label="Студент"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Select
              value={newUser.universityId}
              onChange={(e) => setNewUser({ ...newUser, universityId: e.target.value })}
              fullWidth
              size="small"
              displayEmpty
            >
              <MenuItem value="">Университет</MenuItem>
              {universities.map((university) => (
                <MenuItem key={university.id} value={university.id}>
                  {university.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={6} md={1}>
            <Button 
              variant="contained" 
              onClick={handleCreate}
              fullWidth
              sx={{ height: '40px' }}
            >
              Добавить
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Users table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ФИО</TableCell>
              <TableCell>Логин</TableCell>
              <TableCell>Пароль</TableCell>
              <TableCell>Студент</TableCell>
              <TableCell>Университет</TableCell>
              <TableCell align="right">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                {editingId === user.id ? (
                  <>
                    <TableCell>
                      <TextField
                        value={editData.name}
                        onChange={(e) => setEditData({...editData, name: e.target.value})}
                        fullWidth
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={editData.login}
                        onChange={(e) => setEditData({...editData, login: e.target.value})}
                        fullWidth
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={editData.password}
                        onChange={(e) => setEditData({...editData, password: e.target.value})}
                        fullWidth
                        size="small"
                        type="password"
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={editData.isStudent}
                        onChange={(e) => setEditData({...editData, isStudent: e.target.checked})}
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        value={editData.universityId}
                        onChange={(e) => setEditData({...editData, universityId: e.target.value})}
                        fullWidth
                        size="small"
                      >
                        <MenuItem value="">Не выбрано</MenuItem>
                        {universities.map((university) => (
                          <MenuItem key={university.id} value={university.id}>
                            {university.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleSave(user.id)}>
                        <Save color="primary" />
                      </IconButton>
                      <IconButton onClick={cancelEditing}>
                        <Cancel color="error" />
                      </IconButton>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.login}</TableCell>
                    <TableCell>••••••••</TableCell>
                    <TableCell>{user.isStudent ? 'Да' : 'Нет'}</TableCell>
                    <TableCell>
                      {universities.find(u => u.id === user.universityId)?.name || '-'}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => startEditing(user)}>
                        <Edit color="primary" />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(user.id)}>
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
    </Box>
  );
};

export default AdminUserSection;