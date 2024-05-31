import React from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import AdminCommitteeMemberSection from "../components/AdminCommitteeMemberSection";

const AdminCommitteePage = () => {
    return (
        <div>
            <Header />
            <AdminCommitteeMemberSection />
            <Footer />
        </div>
    );
};

export default AdminCommitteePage;