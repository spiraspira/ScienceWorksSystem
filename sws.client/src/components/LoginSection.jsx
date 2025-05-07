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

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <Box className="login-container">
            <Box className="login-form-container">
                <Typography variant="h4" className="login-title">Авторизация</Typography>
                <TextField
                    label="Логин"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="login-input"
                    variant="outlined"
                    required
                    fullWidth
                />
                <TextField
                    label="Пароль"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="login-input"
                    variant="outlined"
                    required
                    fullWidth
                />
                <Button 
                    variant="contained" 
                    onClick={handleLogin} 
                    className="login-button"
                    size="large"
                >
                    Войти
                </Button>
            </Box>
            <ToastContainer position="top-center" autoClose={5000} />
        </Box>
    );
};

export default LoginPage;