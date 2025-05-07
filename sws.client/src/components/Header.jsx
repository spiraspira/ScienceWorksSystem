import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
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
        <AppBar position="static" className="app-header">
            <ToastContainer />
            <Toolbar className="header-toolbar">
                <Typography variant="h6" className="welcome-message">
                    {userData ? `Добро пожаловать, ${userData.name}!` : 'Добро пожаловать, администратор!'}
                </Typography>
                
                <Box className="header-buttons">
                    <Button 
                        color="inherit" 
                        onClick={() => navigate('/')}
                        className="header-button"
                    >
                        Главная
                    </Button>
                    <Button 
                        color="inherit" 
                        onClick={handleLogout}
                        className="header-button"
                    >
                        Выйти
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;