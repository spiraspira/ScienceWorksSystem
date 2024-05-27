import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContestsSection from '../components/ContestsSection';
import ContestActions from '../actions/ContestActions';

const MainPage = () => {
    const isStudent = localStorage.getItem('role');

    return (
        <div>
            <Header />
            {isStudent === 'student' ? (
                <>
                    <ContestsSection getContestsMethod={() => ContestActions.getActiveContestsOfStudent()} title="Активные конкурсы" />
                    <ContestsSection getContestsMethod={() => ContestActions.getFinishedContestsOfStudent()} title="Завершенные конкурсы" />
                </>
            ) : (
                <>
                    <ContestsSection getContestsMethod={() => ContestActions.getContestsOfInvitedTeacher()} title="Активные конкурсы - Приглашенный преподаватель" />
                    <ContestsSection getContestsMethod={() => ContestActions.getContestsOfOrganizationCommitteeHead()} title="Активные конкурсы - Глава организационного комитета" />
                    <ContestsSection getContestsMethod={() => ContestActions.getContestsOfOrganizationCommitteeMember()} title="Активные конкурсы - Член организационного комитета" />
                    <ContestsSection getContestsMethod={() => ContestActions.getContestsOfProgramCommitteeHead()} title="Активные конкурсы - Глава программного комитета" />
                    <ContestsSection getContestsMethod={() => ContestActions.getContestsOfProgramCommitteeMember()} title="Активные конкурсы - Член программного комитета" />
                </>
            )}
            <Footer />
        </div>
    );
};

export default MainPage;