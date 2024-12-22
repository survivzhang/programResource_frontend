// src/components/JobOpportunityContent.tsx
import React, { useState } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
} from '@mui/material';
import { jobLocations } from '../data/jobData';

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

  // 从 jobData 获取当前职业的地区数据
  const locations = jobLocations[career.slug] || [];
  const cities =
    locations.find((loc) => loc.country === selectedCountry)?.cities || [];

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
