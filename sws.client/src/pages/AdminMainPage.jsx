import React from "react";
import { Box } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AdminMenuSection from "../components/AdminMenuSection";

const AdminMainPage = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh'
        }}>
            <Header />
            <Box component="main" sx={{
                flex: 1,
                py: 2,
                px: 2
            }}>
                <AdminMenuSection />
            </Box>
            <Footer />
        </Box>
    );
};

export default AdminMainPage;