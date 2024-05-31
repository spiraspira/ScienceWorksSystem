import React from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import AdminMenuSection from "../components/AdminMenuSection";

const AdminMainPage = () => {
    return (
        <div>
            <Header />
            <AdminMenuSection />
            <Footer />
        </div>
    );
};

export default AdminMainPage;