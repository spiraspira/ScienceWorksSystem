import React from 'react';
import { Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminMenuSection = () => {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <Box className="admin-menu-section" display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap={2}>
            <Button variant="contained" onClick={() => handleNavigate('/universities')}>
                Universities
            </Button>
            <Button variant="contained" onClick={() => handleNavigate('/users')}>
                Users
            </Button>
            <Button variant="contained" onClick={() => handleNavigate('/teams')}>
                Teams
            </Button>
            <Button variant="contained" onClick={() => handleNavigate('/committees')}>
                Committees
            </Button>
            <Button variant="contained" onClick={() => handleNavigate('/committeeMembers')}>
                Committee Members
            </Button>
            <Button variant="contained" onClick={() => handleNavigate('/contests')}>
                Contests
            </Button>
            <Button variant="contained" onClick={() => handleNavigate('/nominations')}>
                Nominations
            </Button>
        </Box>
    );
};

export default AdminMenuSection;