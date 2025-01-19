import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  ListItem,
  ListItemText,
  CircularProgress,
} from '@mui/material';

interface RoadmapData {
  tools: string[];
}

const Tools: React.FC = () => {
  const [tools, setTools] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:5001/roadmap?name=frontend_engineer`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch tools data');
        }
        const data: RoadmapData = await response.json();
        setTools(data.tools || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching tools:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Essential Tools & Technologies
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: 2,
        }}
      >
        {tools.map((tool, index) => (
          <Box
            key={index}
            sx={{
              p: 2,
              borderRadius: '8px',
              bgcolor: 'rgba(0, 0, 0, 0.04)',
              transition: 'all 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              },
            }}
          >
            <ListItem>
              <ListItemText
                primary={tool}
                sx={{
                  '& .MuiListItemText-primary': {
                    fontSize: '0.95rem',
                  },
                }}
              />
            </ListItem>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Tools;
