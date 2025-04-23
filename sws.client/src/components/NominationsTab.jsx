import React from 'react';
import { Box, Typography } from '@mui/material';

const NominationsTab = ({ nominations }) => {
    return (
        <Box className="tab-content">
            {nominations.map((nomination, index) => (
                <Box key={index} className="nomination-item">
                    <Typography className="nomination-name">
                        {nomination.name || 'N/A'}
                    </Typography>
                    <Typography className="nomination-winner">
                        Winner: {nomination.winner?.team?.student?.user?.name || 'Not selected'}
                    </Typography>
                </Box>
            ))}
        </Box>
    );
};

export default NominationsTab;