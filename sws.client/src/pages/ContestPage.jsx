import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContestInfoSection from '../components/ContestInfoSection';
import UploadReportSection from '../components/UploadReportSection';
import TeacherFirstTourSection from '../components/TeacherFirstTourSection';
import StudentFirstTourSection from '../components/StudentFirstTourSection';
import ContestActions from "../actions/ContestActions";

const ContestPage = () => {
    const [role] = useState(localStorage.getItem("role"));
    const { contestId } = useParams();
    const [contestData, setContestData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const contestInfo = await ContestActions.getContestInfo(contestId);
                setContestData(contestInfo);

            } catch (error) {

            }
        };

        fetchData();
    }, [contestId]);

    return (
        <div>
            <Header />
            <ContestInfoSection contestData={contestData} />
            {role === "student" && <UploadReportSection isContestFinished={new Date(contestData.dateStartSecondTour) <= new Date()} />}
            {role === "student" && <StudentFirstTourSection contestId={contestId} />}
            {role === "teacher" && <TeacherFirstTourSection contestId={contestId} />}
            <Footer />
        </div>
    );
};

export default ContestPage;