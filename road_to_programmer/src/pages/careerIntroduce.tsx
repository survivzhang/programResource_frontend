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
import ReferenceContent from '../components/referenceContent';
import JobOpportunityContent from '../components/jobOpportunity';
import Tools from '../components/Tools';
import LearningPath from '../components/path';

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
      {/* Title Section */}
      <Box sx={{ bgcolor: career.bgcolor, minHeight: '200px' }}>
        <Container maxWidth="lg" sx={{ py: 3 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/')}
            sx={{ color: 'black', mb: 2 }}
          >
            Back
          </Button>
          <Typography variant="h3" component="h1">
            {career.title}
          </Typography>
        </Container>
      </Box>

      {/* Navigation and Content Area */}
      <Container maxWidth="lg" sx={{ mt: -5 }}>
        <Box
          sx={{
            bgcolor: 'white',
            borderRadius: '8px',
            boxShadow: 1,
            overflow: 'hidden',
          }}
        >
          {/* Navigation Tabs */}
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
              <Tab label="TOOLS" value="tools" />
              <Tab label="JOB OPPORTUNITY" value="job" />
            </Tabs>
          </Box>

          {/* Content Area */}
          <Box
            sx={{
              p: 3,
              height: '600px', // Fixed height
              width: '100%', // Full container width
              minWidth: '1200px', // Minimum width
              overflow: 'auto',
            }}
          >
            {currentTab === 'introduce' && (
              <>
                <Typography variant="body1" paragraph>
                  {career.description}
                </Typography>
                <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
                  Core Skills
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
              <Box sx={{ overflow: 'auto' }}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Learning Path
                </Typography>
                <LearningPath bgcolor={career.bgcolor} />
              </Box>
            )}

            {currentTab === 'tools' && <Tools />}
            {currentTab === 'reference' && career.references && (
              <ReferenceContent
                references={career.references}
                bgcolor={career.bgcolor}
              />
            )}
            {currentTab === 'job' && (
              <JobOpportunityContent
                career={career}
                bgcolor={career.bgcolor}
                onViewSalary={(country, city) => {
                  navigate(`/career/${career.slug}/jobs/${country}/${city}`);
                }}
                onViewMarket={(country, city) => {
                  navigate(`/career/${career.slug}/jobs/${country}/${city}`);
                }}
              />
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default CareerIntroPage;
