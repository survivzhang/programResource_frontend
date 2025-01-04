import React from 'react';
import { Grid, Container, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CareerCard from '../components/careerCard';
import { careerPaths } from '../data/careerData';

const ProgrammerRoadmap: React.FC = () => {
  const navigate = useNavigate(); // 使用 useNavigate 替代 useRouter

  const handleCardClick = (slug: string): void => {
    navigate(`/career/${slug}`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* 标题区域 */}
      <Box
        sx={{
          bgcolor: '#7b1fa2',
          color: 'white',
          p: 2,
          mb: 4,
          borderRadius: 1,
          boxShadow: 2,
        }}
      >
        <Typography variant="h4" component="h1" fontWeight="bold">
          ROAD TO PROGRAMMER
        </Typography>
      </Box>

      {/* 卡片网格 */}
      <Grid container spacing={4}>
        {careerPaths.map((path) => (
          <Grid item xs={12} md={6} key={path.id}>
            <CareerCard
              title={path.title}
              bgcolor={path.bgcolor}
              onClick={() => handleCardClick(path.slug)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProgrammerRoadmap;
