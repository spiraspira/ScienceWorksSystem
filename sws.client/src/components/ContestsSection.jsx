import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Grid, Card, CardContent, CardActionArea, Box } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';

const ContestsSection = ({ getContestsMethod }) => {
  const [contests, setContests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContests = async () => {
      try {
        setIsLoading(true);
        const contests = await getContestsMethod();
        setContests(contests);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContests();
  }, [getContestsMethod]);

  return (
    <Box className="contests-section">
      <ToastContainer />
      {isLoading ? (
        <Box className="loading-state">
          <Typography variant="body1">Загрузка...</Typography>
        </Box>
      ) : contests.length === 0 ? (
        <Box className="empty-state">
          <Typography variant="body1" color="textSecondary">
            Нет доступных конкурсов
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3} className="contests-grid">
          {contests.map((contest) => (
            <Grid item xs={12} sm={6} md={4} key={contest.id} className="contest-grid-item">
              <Card
                className="contest-card"
                onClick={() => navigate(`/contest/${contest.id}`)}
              >
                <CardActionArea className="contest-action-area">
                  <CardContent className="contest-content">
                    <Typography variant="h6" className="contest-name">
                      {contest.name}
                    </Typography>
                    <Typography variant="body2" className="contest-description">
                      {contest.description}
                    </Typography>
                    <Box className="contest-dates">
                      <Typography variant="caption" className="date-text">
                        {new Date(contest.dateStart).toLocaleDateString()} - {' '}
                        {new Date(contest.dateEnd).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ContestsSection;