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
                <div>
                    <h1>Welcome, Non-Student!</h1>
                    <p>This is the non-student view of the Main Page.</p>
                </div>
            )}
            <Footer />
        </div>
    );
};

export default MainPage;