import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StudentActiveContestsSection from '../components/StudentActiveContestsSection';

const MainPage = () => {
  const isStudent = localStorage.getItem('role');

  return (
    <div>
      <Header />
      {isStudent === 'student' ? (
        <StudentActiveContestsSection />
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