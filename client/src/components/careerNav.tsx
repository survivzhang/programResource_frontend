// src/components/CareerNav.tsx
import React from 'react';
import { Box, Tabs, Tab } from '@mui/material';

interface CareerNavProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

const CareerNav: React.FC<CareerNavProps> = ({ currentTab, onTabChange }) => {
  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    onTabChange(newValue);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'white' }}>
      <Tabs
        value={currentTab}
        onChange={handleChange}
        sx={{
          '& .MuiTab-root': {
            fontWeight: 'bold',
            color: 'grey.700',
          },
          '& .Mui-selected': {
            color: 'primary.main',
          },
        }}
      >
        <Tab label="INTRODUCE" value="introduce" />
        <Tab label="PATH" value="path" />
        <Tab label="REFERENCE" value="reference" />
        <Tab label="JOB OPPORTUNITY" value="job" />
      </Tabs>
    </Box>
  );
};

export default CareerNav;
