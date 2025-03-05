import React from 'react';
import { Grid, Container, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CareerCard from '../components/careerCard';
import { careerPaths } from '../data/careerData';

const ProgrammerRoadmap: React.FC = () => {
  const navigate = useNavigate();

  const handleCardClick = (slug: string): void => {
    navigate(`/career/${slug}`);
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        margin: 0,
        padding: 0,
        position: 'absolute',
        top: 0,
        left: 0,
      }}
    >
      <Box
        sx={{
          bgcolor: '#483A62',
          opacity: 0.7,
          py: 1,
          px: 3,
          width: '100%',
          margin: 0,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
        }}
      >
        <Typography
          variant="h6"
          component="h3"
          sx={{ color: 'white', fontWeight: 'bold' }}
        >
          ROAD TO PROGRAMMER
        </Typography>
      </Box>

      <Container
        maxWidth="lg"
        sx={{
          pt: { xs: 12, sm: 24 }, // 增加上边距，响应式调整
          pb: 4,
          px: { xs: 2, sm: 3 }, // 可选：增加左右边距
        }}
      >
        <Grid container spacing={4}>
          {careerPaths.map((path) => (
            <Grid item xs={12} md={6} key={path.id}>
              <CareerCard
                title={path.title}
                bgcolor={path.bgcolor}
                onClick={() => handleCardClick(path.slug)}
                ratings={path.ratings}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ProgrammerRoadmap;
