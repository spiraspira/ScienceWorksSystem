import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import '../App.css';

const Footer = () => {
    return (
        <AppBar position="static" className="App-header">
            <Toolbar>
                <Typography variant="body1" style={{ marginLeft: 'auto' }}>
                    {new Date().getFullYear()}
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Footer;