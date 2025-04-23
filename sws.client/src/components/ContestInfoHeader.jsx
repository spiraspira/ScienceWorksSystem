import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

const ContestInfoHeader = ({ contestData, winner, onExport }) => {
    return (
        <Box className="contest-header-section">
            <Typography variant="h5" className="contest-title">
                {contestData.name || 'Loading...'}
            </Typography>
            <Typography variant="body1" className="contest-description">
                {contestData.description || 'Loading...'}
            </Typography>
            
            <Box className="contest-dates-grid">
                <Typography variant="body2" className="contest-date">
                    <strong>First Round:</strong> {contestData.dateStart?.substring(0, 10) || 'N/A'} to {contestData.dateStartSecondTour?.substring(0, 10) || 'N/A'}
                </Typography>
                <Typography variant="body2" className="contest-date">
                    <strong>Second Round:</strong> {contestData.dateStartSecondTour?.substring(0, 10) || 'N/A'} to {contestData.dateEnd?.substring(0, 10) || 'N/A'}
                </Typography>
                <Typography variant="body2" className="contest-date">
                    <strong>Invited Teacher:</strong> {contestData.invitedTeacher?.user?.name || 'N/A'}
                </Typography>
                {winner && (
                    <Typography variant="body2" className="contest-date">
                        <strong>Winner:</strong> {winner.name || 'N/A'} (Author: {winner.team?.student?.user?.name || 'N/A'})
                    </Typography>
                )}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button
                    variant="outlined"
                    size="small"
                    onClick={onExport}
                    startIcon={<DownloadIcon fontSize="small" />}
                    sx={{
                        fontSize: '0.75rem',
                        padding: '4px 8px',
                        minWidth: 'auto',
                        textTransform: 'none',
                        color: '#616161',
                        borderColor: '#e0e0e0',
                        '&:hover': {
                            borderColor: '#bdbdbd',
                            backgroundColor: 'rgba(0, 0, 0, 0.04)'
                        }
                    }}
                >
                    Export Report
                </Button>
            </Box>
        </Box>
    );
};

export default ContestInfoHeader;