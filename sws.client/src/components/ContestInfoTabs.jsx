import React from 'react';
import { Box, Tabs, Tab } from '@mui/material';


const ContestInfoTabs = ({ 
    activeTab, 
    handleTabChange, 
    tabs
}) => {
    return (
        <Box className="tabbed-section">
            <Tabs 
                value={activeTab}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                className="contest-tabs"
            >
                {tabs.map((tab, index) => (
                    <Tab 
                        key={index}
                        label={tab.label}
                        className="contest-tab"
                    />
                ))}
            </Tabs>
            
            <Box className="tab-panel-container">
                {tabs.map((tab, index) => (
                    <div 
                        key={index}
                        role="tabpanel"
                        hidden={activeTab !== index}
                        id={`contest-tabpanel-${index}`}
                        aria-labelledby={`contest-tab-${index}`}
                    >
                        {activeTab === index && (
                            <Box sx={{ p: 2 }}>
                                {tab.content}
                            </Box>
                        )}
                    </div>
                ))}
            </Box>
        </Box>
    );
};

export default ContestInfoTabs;