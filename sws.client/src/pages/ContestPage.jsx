import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContestInfoSection from '../components/ContestInfoSection';
import UploadReportSection from '../components/UploadReportSection';
import TeacherFirstTourSection from '../components/TeacherFirstTourSection';
import TeacherSecondTourSection from "../components/TeacherSecondTourSection";
import StudentFirstTourSection from '../components/StudentFirstTourSection';
import StudentSecondTourSection from "../components/StudentSecondTourSection";
import InvitedFirstTourSection from "../components/InvitedFirstTourSection";
import HeadFirstTourComponent from "../components/HeadFirstTourSection";
import ContestActions from "../actions/ContestActions";

const ContestPage = () => {
    const [role] = useState(localStorage.getItem("role"));
    const { contestId } = useParams();
    const [userId] = useState(localStorage.getItem("userId"))
    const [contestData, setContestData] = useState({});
    const [teacherRoles, setTeacherRoles] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const contestInfo = await ContestActions.getContestInfo(contestId);
                setContestData(contestInfo);

                if (role === "teacher") {
                    const teacherRolesData = await ContestActions.getRolesOfTeacher(contestId, userId);
                    setTeacherRoles(teacherRolesData);
                }
            } catch (error) {

            }
        };

        fetchData();
    }, [contestId, userId, role]);

    return (
        <div>
            <Header />
            <ContestInfoSection contestData={contestData} />
            {role === "student" && <UploadReportSection isContestFinished={new Date(contestData.dateStartSecondTour) <= new Date()} />}
            {role === "student" && <StudentFirstTourSection contestId={contestId} />}
            {
                teacherRoles.some(role => role.item1 === "organizationMember") && (
                    <TeacherFirstTourSection
                        contestId={contestId}
                        organizationCommitteeMemberId={
                            teacherRoles.find(role => role.item1 === "organizationMember")?.item2
                        }
                    />
                )
            }
            {
                teacherRoles.some(role => role.item1 === "invited") && (
                    <InvitedFirstTourSection
                        contestId={contestId}
                    />
                )
            }
            {
                teacherRoles.some(role => role.item1 === "organizationHead") && (
                    <HeadFirstTourComponent
                        contestId={contestId}
                    />
                )
            }
            {role === "student" && <StudentSecondTourSection contestId={contestId} />}
            {
                teacherRoles.some(role => role.item1 === "programMember") && (
                    <TeacherSecondTourSection
                        contestId={contestId}
                        programCommitteeMemberId={
                            teacherRoles.find(role => role.item1 === "programMember")?.item2
                        }
                    />
                )
            }
            <Footer />
        </div>
    );
};

export default ContestPage;