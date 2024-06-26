import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UserActions from '../actions/UserActions';
import '../App.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const isAdmin = localStorage.getItem('isAdmin');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await UserActions.getUserData();
                setUserData(data);
            }
            catch (error) {
                toast.error(error.message);
            }
        };

        if (!isAdmin) {
            fetchUserData();
        }
    }, [isAdmin]);

    const handleLogout = async () => {
        try {
            if (isAdmin) {
                await UserActions.logoutAdmin();
            }
            else {
                await UserActions.logout();
            }
            navigate('/');
        }
        catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <AppBar position="static" className="App-header">
            <ToastContainer />
            <Toolbar className="toolbar-content">
                {userData ? (
                    <Typography variant="body1" className="welcome-text">
                        Добро пожаловать, {userData.name}.
                    </Typography>
                )
                    : (
                        <Typography variant="body1" className="welcome-text">
                            Добро пожаловать, администратор.
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