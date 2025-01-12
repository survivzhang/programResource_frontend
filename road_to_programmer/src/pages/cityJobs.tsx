// src/pages/CityJobs.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

const API_BASE_URL = 'http://localhost:5001/api/job_market';

const CityJobs: React.FC = () => {
  const { slug, country, city } = useParams();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<JobData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/newest?title=${slug}&city=${city}&country=${country}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const data = await response.json();
        setJobs(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load jobs');
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [slug, city, country]);

  const handleBack = () => {
    // Navigate back to the career page with the job tab selected
    navigate(`/career/${slug}`, { state: { defaultTab: 'job' } });
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg">
        <Typography>Loading jobs...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  const sortedJobs = [...jobs].sort(
    (a, b) => (b.job_max_salary ?? 0) - (a.job_max_salary ?? 0)
  );

  return (
    <>
      {/* Header Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 4, mb: 3 }}>
        <Container maxWidth="lg">
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
            sx={{ mb: 2 }}
          >
            Back to Career
          </Button>
          <Typography variant="h4" component="h1" gutterBottom>
            {sortedJobs.length} Jobs in {city}, {country}
          </Typography>
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
