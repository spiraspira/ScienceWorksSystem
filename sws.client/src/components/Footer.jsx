import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import '../App.css';

const Footer = () => {
    return (
        <AppBar 
            position="static" 
            sx={{
                backgroundColor: '#1976d2',
                top: 'auto',
                bottom: 0,
                marginTop: '40px'
            }}
        >
            <Toolbar sx={{
                minHeight: '48px',
                justifyContent: 'center'
            }}>
                <Typography variant="body1" sx={{ 
                    fontSize: '0.875rem',
                    fontWeight: 500
                }}>
                    © {new Date().getFullYear()} Все права защищены
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Footer;