// src/components/Heading.tsx
import React from 'react';
import { Box, Typography, SxProps, Theme } from '@mui/material';

interface HeadingProps {
  children: React.ReactNode;
  component?: React.ElementType;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  bgcolor?: string;
  color?: string;
  sx?: SxProps<Theme>;
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({
  children,
  component = 'h1',
  variant = 'h3',
  bgcolor = '#5C6BC0',
  color = 'white',
  sx,
  className,
}) => {
  return (
    <Box
      className={className}
      sx={{
        bgcolor,
        color,
        py: 3,
        px: 4,
        mb: 4,
        width: '100%',
        boxShadow: 2,
        ...sx,
      }}
    >
      <Typography
        variant={variant}
        component={component}
        fontWeight="700"
        sx={{
          letterSpacing: 1,
          textTransform: 'uppercase',
          fontSize: {
            xs: '1.75rem',
            sm: '2rem',
            md: '2.25rem',
          },
        }}
      >
        {children}
      </Typography>
    </Box>
  );
};

export default Heading;
