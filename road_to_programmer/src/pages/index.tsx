import React from 'react';
import { Grid, Container, Box, Typography } from '@mui/material';
import CareerCard from '../components/careerCard';
import { CareerPath } from './types';

const careerPaths: CareerPath[] = [
  {
    id: 1,
    title: 'FRONTEND ENGINEER',
    bgcolor: '#f8bbd0',
  },
  {
    id: 2,
    title: 'DATA engineer',
    bgcolor: '#c8e6c9',
  },
  {
    id: 3,
    title: 'BACKEND ENGINEER',
    bgcolor: '#c8e6c9',
  },
  {
    id: 4,
    title: 'DATA analyse',
    bgcolor: '#b2ebf2',
  },
  {
    id: 5,
    title: 'DevOps',
    bgcolor: '#b2ebf2',
  },
  {
    id: 6,
    title: 'DATA scientist',
    bgcolor: '#f8bbd0',
  },
];

const ProgrammerRoadmap: React.FC = () => {
  const handleCardClick = (title: string): void => {
    console.log(`Clicked on ${title}`);
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
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProgrammerRoadmap;
