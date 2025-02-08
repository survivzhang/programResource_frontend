// src/pages/CityJobs.tsx
import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Container, Box, Typography, Grid, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface JobData {
  job_id: string;
  employer_name: string;
  job_title: string;
  job_city: string;
  job_state: string;
  job_country: string;
  job_posted_at_datetime_utc: string;
  job_min_salary: number | null;
  job_max_salary: number | null;
  job_description: string;
  qualifications: string[];
  responsibilities: string[];
}

interface LocationState {
  jobs: JobData[];
  jobCount: number;
  maxSalary: number;
}

const CityJobs: React.FC = () => {
  const { slug, country, city } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  // 如果没有传入数据，显示无数据状态
  if (!state?.jobs) {
    return (
      <Container maxWidth="lg">
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() =>
            navigate(`/career/${slug}`, { state: { defaultTab: 'job' } })
          }
          sx={{ mb: 2 }}
        >
          Back to Career
        </Button>
        <Typography>No job data available</Typography>
      </Container>
    );
  }

  const sortedJobs = [...state.jobs].sort(
    (a, b) => (b.job_max_salary ?? 0) - (a.job_max_salary ?? 0)
  );

  return (
    <>
      {/* Header Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 4, mb: 3 }}>
        <Container maxWidth="lg">
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() =>
              navigate(`/career/${slug}`, { state: { defaultTab: 'job' } })
            }
            sx={{ mb: 2 }}
          >
            Back to Career
          </Button>
          <Typography variant="h4" component="h1" gutterBottom>
            {state.jobCount} Jobs in {city}, {country}
          </Typography>
          {state.maxSalary > 0 && (
            <Typography color="text.secondary" gutterBottom>
              Maximum salary in this area: ${state.maxSalary.toLocaleString()}
            </Typography>
          )}
          <Typography color="text.secondary">
            Showing all available positions sorted by salary
          </Typography>
        </Container>
      </Box>

      {/* Jobs List */}
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {sortedJobs.map((job: JobData) => (
            <Grid item xs={12} key={job.job_id}>
              <Box
                sx={{
                  p: 3,
                  bgcolor: 'background.paper',
                  borderRadius: 1,
                  boxShadow: 1,
                  '&:hover': {
                    boxShadow: 2,
                    transform: 'translateY(-2px)',
                    transition: 'all 0.2s',
                  },
                }}
              >
                <Typography variant="h6" gutterBottom>
                  {job.job_title}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  gutterBottom
                >
                  {job.employer_name}
                </Typography>
                <Typography>
                  Salary: $
                  {job.job_max_salary?.toLocaleString() ?? 'Not specified'}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 2 }}
                >
                  Posted:{' '}
                  {new Date(
                    job.job_posted_at_datetime_utc
                  ).toLocaleDateString()}
                </Typography>
              </Box>
            </Grid>
          ))}

          {sortedJobs.length === 0 && (
            <Grid item xs={12}>
              <Typography
                variant="h6"
                textAlign="center"
                color="text.secondary"
              >
                No jobs found in {city}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default CityJobs;
