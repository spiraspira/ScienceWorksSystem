import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Grid, Card, CardContent, CardActionArea } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';

const ContestsSection = ({ getContestsMethod, title }) => {
    const [contests, setContests] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchContests = async () => {
        try {
          const contests = await getContestsMethod();
          setContests(contests);
        } catch (error) {
          toast.error(error.message);
        }
      };
  
      fetchContests();
    }, [getContestsMethod]);

  return (
    <div className="active-contests-container">
      <ToastContainer />
      <Typography variant="h4" gutterBottom className="active-contests-title">
        {title}
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {contests.map((contest) => (
          <Grid item xs={12} sm={10} key={contest.id}>
            <Card
              onClick={() => navigate(`/contest/${contest.id}`)}
              className="active-contest-card"
            >
              <CardActionArea>
                <CardContent>
                  <Typography variant="h5" className="active-contest-name">
                    {contest.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" className="active-contest-description">
                    {contest.description.slice(0, 100)}...
                  </Typography>
                  <Typography variant="body2" color="textSecondary" className="active-contest-date-range">
                    {new Date(contest.dateStart).toLocaleDateString()} - {new Date(contest.dateEnd).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ContestsSection;