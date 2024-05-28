import React, { useState } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContestInfoSection from '../components/ContestInfoSection';
import UploadReportSection from '../components/UploadReportSection';

const ContestPage = () => {
    const [role] = useState(localStorage.getItem("role"));

    return (
        <div>
            <Header />
            <ContestInfoSection />
            {role === "student" && <UploadReportSection />}
            <Footer />
        </div>
    );
};

export default ContestPage;