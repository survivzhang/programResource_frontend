// src/pages/careerIntroduce.tsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CareerNav from '../components/careerNav';
import { careerPaths } from '../data/careerData';

const CareerIntroPage: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState('introduce');

  const career = careerPaths.find((path) => path.slug === slug);

  if (!career) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" align="center">
          未找到该职业路径
        </Typography>
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/')}
            variant="contained"
          >
            返回首页
          </Button>
        </Box>
      </Container>
    );
  }

  const renderContent = () => {
    switch (currentTab) {
      case 'introduce':
        return (
          <>
            <Typography variant="body1">{career.description}</Typography>
            <Typography variant="h5" sx={{ mt: 4 }}>
              核心技能
            </Typography>
            <List>
              {career.skills.map((skill, index) => (
                <ListItem key={index}>
                  <ListItemText primary={skill} />
                </ListItem>
              ))}
            </List>
          </>
        );
      case 'path':
        return (
          <>
            <Typography variant="h5" sx={{ mb: 3 }}>
              学习路线
            </Typography>
            <List>
              {career.roadmap.map((step, index) => (
                <ListItem key={index}>
                  <ListItemText primary={`${index + 1}. ${step}`} />
                </ListItem>
              ))}
            </List>
          </>
        );
      case 'reference':
        return <Typography variant="body1">参考资料区域（待完善）</Typography>;
      case 'job':
        return <Typography variant="body1">工作机会区域（待完善）</Typography>;
      default:
        return null;
    }
  };

  return (
    <>
      <Box sx={{ bgcolor: career.bgcolor, pt: 3, pb: 6 }}>
        <Container maxWidth="lg">
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/')}
            sx={{ mb: 3, color: 'white' }}
          >
            返回
          </Button>
          <Typography
            variant="h3"
            component="h1"
            sx={{ color: 'white', mb: 2 }}
          >
            {career.title}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: -4 }}>
        <Box
          sx={{
            bgcolor: 'white',
            borderRadius: 2,
            boxShadow: 1,
            overflow: 'hidden',
          }}
        >
          <CareerNav currentTab={currentTab} onTabChange={setCurrentTab} />
          <Box sx={{ p: 4 }}>{renderContent()}</Box>
        </Box>
      </Container>
    </>
  );
};

export default CareerIntroPage;
