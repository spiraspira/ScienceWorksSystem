import React from 'react';
import { Box, Typography } from '@mui/material';

const CommitteeTab = ({ chair, members, title }) => {
    return (
        <Box className="tab-content">
            <Typography className="committee-chair">
                <strong>Chair:</strong> {chair || 'N/A'}
            </Typography>
            <Typography className="committee-members-title">
                Members:
            </Typography>
            {members.map((member, index) => (
                <Typography key={index} className="committee-member">
                    • {member.teacher?.user?.name || 'N/A'}
                </Typography>
            ))}
        </Box>
    );
};

export default CommitteeTab;