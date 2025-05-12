import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

const ReportsTab = ({ reports, onDownload }) => {
    return (
        <Box className="tab-content">
            {reports.map((report, index) => (
                <Box key={index} className="report-item">
                    <Box>
                        <Typography className="report-name">
                            "{report.name || 'Без названия'}"
                        </Typography>
                        <Typography className="report-meta">
                            Автор: {report.team?.student?.user?.name || 'N/A'} • 
                            Научный руководитель: {report.team?.teacher?.user?.name || 'N/A'}
                        </Typography>
                    </Box>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => onDownload(report.file)}
                        startIcon={<DownloadIcon />}
                        className="download-report-btn"
                    >
                        Скачать
                    </Button>
                </Box>
            ))}
        </Box>
    );
};

export default ReportsTab;