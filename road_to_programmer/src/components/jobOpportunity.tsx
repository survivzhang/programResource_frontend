import React, { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
  Button,
} from '@mui/material';

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
interface LocationInfo {
  country: string;
  cities: {
    name: string;
    jobCount: number;
    averageSalary: number;
    maxSalary: number;
    employerCount: number;
  }[];
}

interface JobMarketData {
  newest: JobData[];
  topTitles: Array<{ job_title: string; average_salary: number }>;
  topCities: Array<{ city_name: string; average_salary: number }>;
  topCompanies: Array<{ company_name: string; average_salary: number }>;
}

const API_BASE_URL = `${import.meta.env.VITE_API_SECOND_URL}/api/job_market`;

interface JobOpportunityContentProps {
  onViewSalary: (country: string, city: string) => void;
  onViewMarket: (country: string, city: string) => void;
  bgcolor: string;
  career: {
    slug: string;
  };
}

const JobOpportunityContent: React.FC<JobOpportunityContentProps> = ({
  onViewSalary,
  career,
}) => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [marketData, setMarketData] = useState<JobMarketData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMarketData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [newestRes, titleRes, cityRes, companyRes] = await Promise.all([
        fetch(
          `${API_BASE_URL}/newest${career.slug ? `?title=${career.slug}` : ''}`
        ),
        fetch(`${API_BASE_URL}/top_titles`),
        fetch(`${API_BASE_URL}/top_cities`),
        fetch(`${API_BASE_URL}/top_companies`),
      ]);

      if (!newestRes.ok || !titleRes.ok || !cityRes.ok || !companyRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const [newest, topTitles, topCities, topCompanies] = await Promise.all([
        newestRes.json(),
        titleRes.json(),
        cityRes.json(),
        companyRes.json(),
      ]);

      setMarketData({
        newest,
        topTitles,
        topCities,
        topCompanies,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching market data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketData();
  }, [career.slug]);

  const getLocations = () => {
    if (!marketData?.newest) return [];

    const locations = marketData.newest.reduce((acc: LocationInfo[], job) => {
      if (!job.job_country || !job.job_city) return acc;

      const countryIndex = acc.findIndex(
        (loc) => loc.country === job.job_country
      );

      const salary = job.job_max_salary ?? 0;

      if (countryIndex === -1) {
        acc.push({
          country: job.job_country,
          cities: [
            {
              name: job.job_city,
              jobCount: 1,
              averageSalary: salary,
              maxSalary: salary,
              employerCount: 1,
            },
          ],
        });
      } else {
        const cityIndex = acc[countryIndex].cities.findIndex(
          (city) => city.name === job.job_city
        );

        if (cityIndex === -1) {
          acc[countryIndex].cities.push({
            name: job.job_city,
            jobCount: 1,
            averageSalary: salary,
            maxSalary: salary,
            employerCount: 1,
          });
        } else {
          const city = acc[countryIndex].cities[cityIndex];
          city.jobCount += 1;
          city.averageSalary =
            (city.averageSalary * (city.jobCount - 1) + salary) / city.jobCount;
          city.maxSalary = Math.max(city.maxSalary, salary);
        }
      }

      return acc;
    }, []);

    return locations
      .map((loc) => ({
        ...loc,
        cities: loc.cities.sort((a, b) => b.maxSalary - a.maxSalary),
      }))
      .sort((a, b) => a.country.localeCompare(b.country));
  };

  const locations = getLocations();
  const cities =
    locations.find((loc) => loc.country === selectedCountry)?.cities || [];

  if (isLoading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Loading market data...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Location Selectors */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Country</InputLabel>
            <Select
              value={selectedCountry}
              label="Country"
              onChange={(e) => {
                setSelectedCountry(e.target.value);
                setSelectedCity('');
              }}
            >
              {locations.map((location) => (
                <MenuItem key={location.country} value={location.country}>
                  {location.country} ({location.cities.length} cities)
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth disabled={!selectedCountry}>
            <InputLabel>City</InputLabel>
            <Select
              value={selectedCity}
              label="City"
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              {cities.map((city) => (
                <MenuItem key={city.name} value={city.name}>
                  {city.name} ({city.jobCount} jobs, Max: $
                  {city.maxSalary.toLocaleString()})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Selected City Jobs List */}
      {selectedCity && (
        <>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Jobs in {selectedCity}
          </Typography>
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {marketData?.newest
              .filter((job) => job.job_city === selectedCity)
              .sort((a, b) => (b.job_max_salary ?? 0) - (a.job_max_salary ?? 0))
              .slice(0, 3)
              .map((job) => (
                <Grid item xs={12} key={job.job_id}>
                  <Box
                    sx={{
                      p: 3,
                      bgcolor: 'background.paper',
                      borderRadius: 1,
                      boxShadow: 1,
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
                      Salary: ${job.job_max_salary?.toLocaleString() ?? 'null'}
                    </Typography>
                  </Box>
                </Grid>
              ))}
          </Grid>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Button
              variant="outlined"
              onClick={() => onViewSalary(selectedCountry, selectedCity)}
            >
              View All Jobs in {selectedCity}
            </Button>
          </Box>
        </>
      )}

      {!selectedCity && (
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {marketData?.newest
            .sort((a, b) => (b.job_max_salary ?? 0) - (a.job_max_salary ?? 0))
            .slice(0, 3)
            .map((job, index) => (
              <Grid item xs={12} sm={4} key={job.job_city}>
                <Typography variant="subtitle2" color="text.secondary">
                  Top City #{index + 1}
                </Typography>
                <Typography>
                  {job.job_city}: $
                  {String(job.job_max_salary?.toLocaleString() ?? 'null')}
                </Typography>
              </Grid>
            ))}
        </Grid>
      )}
    </Box>
  );
};

export default JobOpportunityContent;
