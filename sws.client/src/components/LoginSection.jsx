import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Button, TextField, Typography } from '@mui/material';
import UserActions from '../actions/UserActions';

const LoginPage = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (login === '' || password === '') {
            toast.error('Заполните все поля.');
            return;
        }

        try {
            await UserActions.login(login, password);
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <Box className="login-container">
            <Typography variant="h4" className="login-title">Авторизация</Typography>
            <TextField
                label="Логин"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                className="login-input"
                required
            />
            <TextField
                label="Пароль"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
                required
            />
            <Button variant="contained" onClick={handleLogin} className="login-button">
                Войти
            </Button>
            <ToastContainer />
        </Box>
    );
};

export default LoginPage;