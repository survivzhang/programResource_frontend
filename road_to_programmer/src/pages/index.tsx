import React from 'react';
import { Grid, Container, Box, Typography } from '@mui/material';
import CareerCard from '../components/careerCard';
import { careerPaths } from '../data/careerData';
import { useNavigate } from 'react-router-dom';

const ProgrammerRoadmap: React.FC = () => {
  const navigate = useNavigate();

  const handleCardClick = (title: string): void => {
    const career = careerPaths.find((path) => path.title === title);
    if (career) {
      navigate(`/career/${career.slug}`);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          bgcolor: '#7b1fa2',
          color: 'white',
          p: 2,
          mb: 4,
          borderRadius: 1,
        }}
      >
        <Typography variant="h4" component="h1" fontWeight="bold">
          ROAD TO PROGRAMMER
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {careerPaths.map((path) => (
          <Grid item xs={12} md={6} key={path.id}>
            <CareerCard
              title={path.title}
              bgcolor={path.bgcolor}
              onClick={() => handleCardClick(path.title)}
              ratings={path.ratings}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProgrammerRoadmap;
