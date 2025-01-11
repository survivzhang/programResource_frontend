import React, { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
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

interface JobMarketData {
  newest: JobData[];
  topTitles: Array<{ job_title: string; average_salary: number }>;
  topCities: Array<{ city_name: string; average_salary: number }>;
  topCompanies: Array<{ company_name: string; average_salary: number }>;
}

const API_BASE_URL = 'http://localhost:5001/api/job_market';

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
  onViewMarket,
  bgcolor,
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
        //${career.slug ? `?title=${career.slug}` : ''}
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

  useEffect(() => {
    console.log('Market Data:', marketData);
    console.log('Locations:', getLocations());
  }, [marketData]);
  const getLocations = () => {
    if (!marketData?.newest) return [];

    const locations = marketData.newest.reduce(
      (acc: { country: string; cities: string[] }[], job) => {
        if (!job.job_country || !job.job_city) return acc;

        const countryIndex = acc.findIndex(
          (loc) => loc.country === job.job_country
        );

        if (countryIndex === -1) {
          acc.push({
            country: job.job_country,
            cities: [job.job_city],
          });
        } else if (!acc[countryIndex].cities.includes(job.job_city)) {
          acc[countryIndex].cities.push(job.job_city);
        }

        return acc;
      },
      []
    );

    return locations
      .map((loc) => ({
        country: loc.country,
        cities: loc.cities.sort(),
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
                  {location.country}
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
                <MenuItem key={city} value={city}>
                  {city}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Market Stats */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {marketData?.topCities.slice(0, 3).map((cityData, index) => (
          <Grid item xs={12} sm={4} key={cityData.city_name}>
            <Typography variant="subtitle2" color="text.secondary">
              Top City #{index + 1}
            </Typography>
            <Typography>
              {cityData.city_name}: ${cityData.average_salary.toLocaleString()}
            </Typography>
          </Grid>
        ))}
      </Grid>

      {/* Circular Buttons */}
      <Grid container spacing={4} justifyContent="center">
        <Grid item>
          <Box
            sx={{
              width: 200,
              height: 200,
              borderRadius: '50%',
              bgcolor: bgcolor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: selectedCity ? 'pointer' : 'default',
              opacity: selectedCity ? 1 : 0.5,
              transition: 'all 0.3s',
              '&:hover': {
                transform: selectedCity ? 'scale(1.05)' : 'none',
              },
            }}
            onClick={() => {
              if (selectedCity) {
                onViewSalary(selectedCountry, selectedCity);
              }
            }}
          >
            <Typography variant="h5" align="center">
              SALARY
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Box
            sx={{
              width: 200,
              height: 200,
              borderRadius: '50%',
              bgcolor: bgcolor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: selectedCity ? 'pointer' : 'default',
              opacity: selectedCity ? 1 : 0.5,
              transition: 'all 0.3s',
              '&:hover': {
                transform: selectedCity ? 'scale(1.05)' : 'none',
              },
            }}
            onClick={() => {
              if (selectedCity) {
                onViewMarket(selectedCountry, selectedCity);
              }
            }}
          >
            <Typography variant="h5" align="center">
              JOB MARKET
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default JobOpportunityContent;
