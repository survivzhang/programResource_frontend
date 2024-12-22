// src/pages/career/[slug].tsx
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Tabs,
  Tab,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { careerPaths } from '../data/careerData';

const CareerIntroPage: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState('introduce');

  const career = careerPaths.find((path) => path.slug === slug);
  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };
  if (!career) {
    return <Typography variant="h5">Career not found</Typography>;
  }

  return (
    <>
      {/* 标题区域 */}
      <Box sx={{ bgcolor: career.bgcolor, minHeight: '200px' }}>
        <Container maxWidth="lg" sx={{ py: 3 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/')}
            sx={{ color: 'black', mb: 2 }}
          >
            返回
          </Button>
          <Typography variant="h3" component="h1">
            {career.title}
          </Typography>
        </Container>
      </Box>

      {/* 导航栏和内容区域 */}
      <Container maxWidth="lg" sx={{ mt: -5 }}>
        <Box
          sx={{
            bgcolor: 'white',
            borderRadius: '8px',
            boxShadow: 1,
            overflow: 'hidden',
          }}
        >
          {/* 添加导航栏 */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={currentTab}
              onChange={handleTabChange}
              sx={{
                '& .MuiTab-root': {
                  fontWeight: 'bold',
                  fontSize: '1rem',
                },
              }}
            >
              <Tab label="INTRODUCE" value="introduce" />
              <Tab label="PATH" value="path" />
              <Tab label="REFERENCE" value="reference" />
              <Tab label="JOB opportunity" value="job" />
            </Tabs>
          </Box>

          {/* 内容区域 */}
          <Box sx={{ p: 3 }}>
            {currentTab === 'introduce' && (
              <>
                <Typography variant="body1" paragraph>
                  {career.description}
                </Typography>
                <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
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
            )}
            {currentTab === 'path' && (
              <>
                <Typography variant="h5" sx={{ mb: 2 }}>
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
            )}
            {currentTab === 'reference' && (
              <Typography>参考资料区域（待完善）</Typography>
            )}
            {currentTab === 'job' && (
              <Typography>工作机会区域（待完善）</Typography>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default CareerIntroPage;
