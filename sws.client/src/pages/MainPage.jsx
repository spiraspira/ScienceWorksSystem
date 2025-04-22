import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContestsSection from '../components/ContestsSection';
import ContestActions from '../actions/ContestActions';
import { Tabs, Tab, Box } from '@mui/material';

const MainPage = () => {
    const isStudent = localStorage.getItem('role');
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const studentTabs = [
        {
            label: "Активные конкурсы",
            content: <ContestsSection 
                        getContestsMethod={() => ContestActions.getActiveContestsOfStudent()} 
                     />
        },
        {
            label: "Завершенные конкурсы",
            content: <ContestsSection 
                        getContestsMethod={() => ContestActions.getFinishedContestsOfStudent()} 
                     />
        }
    ];

    const teacherTabs = [
        {
            label: "Приглашенный преподаватель",
            content: <ContestsSection 
                        getContestsMethod={() => ContestActions.getContestsOfInvitedTeacher()} 
                     />
        },
        {
            label: "Глава оргкомитета",
            content: <ContestsSection 
                        getContestsMethod={() => ContestActions.getContestsOfOrganizationCommitteeHead()} 
                     />
        },
        {
            label: "Член оргкомитета",
            content: <ContestsSection 
                        getContestsMethod={() => ContestActions.getContestsOfOrganizationCommitteeMember()} 
                     />
        },
        {
            label: "Глава программного комитета",
            content: <ContestsSection 
                        getContestsMethod={() => ContestActions.getContestsOfProgramCommitteeHead()} 
                     />
        },
        {
            label: "Член программного комитета",
            content: <ContestsSection 
                        getContestsMethod={() => ContestActions.getContestsOfProgramCommitteeMember()} 
                     />
        }
    ];

    const currentTabs = isStudent === 'student' ? studentTabs : teacherTabs;

    return (
        <div>
            <Header />
            <Box sx={{ width: '100%', p: 2 }}>
                <Tabs 
                    value={activeTab}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                        mb: 3,
                        '& .MuiTabs-indicator': {
                            backgroundColor: '#1976d2',
                            height: 3
                        }
                    }}
                >
                    {currentTabs.map((tab, index) => (
                        <Tab 
                            key={index}
                            label={tab.label}
                            sx={{
                                textTransform: 'none',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                '&.Mui-selected': {
                                    color: '#1976d2'
                                }
                            }}
                        />
                    ))}
                </Tabs>
                {currentTabs.map((tab, index) => (
                    <div 
                        key={index}
                        role="tabpanel"
                        hidden={activeTab !== index}
                        id={`tabpanel-${index}`}
                        aria-labelledby={`tab-${index}`}
                    >
                        {activeTab === index && (
                            <Box sx={{ p: 1 }}>
                                {tab.content}
                            </Box>
                        )}
                    </div>
                ))}
            </Box>
            <Footer />
        </div>
    );
};

export default MainPage;