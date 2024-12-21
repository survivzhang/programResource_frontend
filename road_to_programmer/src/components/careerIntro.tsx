// src/components/CareerIntro.tsx
import React from 'react';
import {
  Container,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

interface CareerIntroProps {
  career: {
    title: string;
    bgcolor: string;
    description: string;
    skills: string[];
    roadmap: string[];
  };
}

const CareerIntro: React.FC<CareerIntroProps> = ({ career }) => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ bgcolor: career.bgcolor, p: 3, borderRadius: 2 }}>
        <Typography variant="h3" component="h1" sx={{ mb: 4 }}>
          {career.title}
        </Typography>

        <Box sx={{ bgcolor: 'rgba(255,255,255,0.9)', p: 3, borderRadius: 1 }}>
          <Typography variant="body1" sx={{ mb: 4 }}>
            {career.description}
          </Typography>

          <Typography variant="h5" sx={{ mb: 2 }}>
            核心技能
          </Typography>
          <List>
            {career.skills.map((skill, index) => (
              <ListItem key={index}>
                <ListItemText primary={skill} />
              </ListItem>
            ))}
          </List>

          <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
            学习路线
          </Typography>
          <List>
            {career.roadmap.map((step, index) => (
              <ListItem key={index}>
                <ListItemText primary={`${index + 1}. ${step}`} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Container>
  );
};

export default CareerIntro;
