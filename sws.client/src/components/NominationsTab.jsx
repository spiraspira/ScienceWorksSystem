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
                        Победитель: "{nomination.winner?.name || 'Не выбран'}" (Автор: {nomination.winner?.team?.student?.user?.name || 'Не выбран'})
                    </Typography>
                </Box>
            ))}
        </Box>
    );
};

export default NominationsTab;