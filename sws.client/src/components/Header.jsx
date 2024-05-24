import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UserActions from '../actions/UserActions';
import '../App.css';

const Header = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const data = await UserActions.getUserData();
            setUserData(data);
        };
        fetchUserData();
    }, []);

    const handleLogout = async () => {
        await UserActions.logout();
        navigate('/');
    };

    return (
        <AppBar position="static" className="App-header">
            <Toolbar className="toolbar-content">
                {userData && (
                    <Typography variant="body1" className="welcome-text">
                        Добро пожаловать, {userData.name}.
                    </Typography>
                )}
                <Button color="inherit" onClick={() => navigate('/')} className="main-page-button">
                    Главная
                </Button>
                <Button color="inherit" onClick={handleLogout} className="logout-button">
                    Выйти
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;