import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { CareerCardProps } from '../pages/types';

const CareerCard: React.FC<CareerCardProps> = ({ title, bgcolor, onClick }) => (
  <Card
    sx={{
      bgcolor: bgcolor,
      cursor: 'pointer',
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'scale(1.05)',
      },
    }}
    onClick={onClick}
  >
    <CardContent>
      <Typography
        variant="h5"
        component="div"
        align="center"
        sx={{ fontWeight: 'bold' }}
      >
        {title}
      </Typography>
    </CardContent>
  </Card>
);

export default CareerCard;
