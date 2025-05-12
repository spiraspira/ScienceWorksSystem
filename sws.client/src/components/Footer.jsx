import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import '../App.css';

const Footer = () => {
    return (
        <AppBar position="static" className="app-footer">
            <Toolbar className="footer-toolbar">
                <Typography variant="body1" className="footer-text">
                    © {new Date().getFullYear()} Все права защищены
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Footer;