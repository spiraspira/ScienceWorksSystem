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
                Учебные заведения
            </Button>
            <Button variant="contained" onClick={() => handleNavigate('/users')}>
                Пользователи
            </Button>
            <Button variant="contained" onClick={() => handleNavigate('/teams')}>
                Команды
            </Button>
            <Button variant="contained" onClick={() => handleNavigate('/committees')}>
                Комитеты
            </Button>
            <Button variant="contained" onClick={() => handleNavigate('/committeeMembers')}>
                Члены комитетов
            </Button>
            <Button variant="contained" onClick={() => handleNavigate('/contests')}>
                Конкурсы
            </Button>
            <Button variant="contained" onClick={() => handleNavigate('/nominations')}>
                Номинации
            </Button>
        </Box>
    );
};

export default AdminMenuSection;