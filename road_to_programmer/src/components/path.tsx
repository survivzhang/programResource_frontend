import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface PathData {
  [category: string]: {
    [subCategory: string]: string[];
  };
}

interface LearningPathProps {
  bgcolor?: string;
}

const LearningPath: React.FC<LearningPathProps> = ({ bgcolor = '#4CAF50' }) => {
  const [pathData, setPathData] = useState<PathData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPath = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          'http://localhost:5001/roadmap?name=frontend_engineer'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch path data');
        }
        const data = await response.json();
        setPathData(data.learning_path);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching path:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPath();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">Error: {error}</Alert>;
  }

  if (!pathData) {
    return null;
  }

  const mainCategories = Object.keys(pathData);

  return (
    <Box sx={{ width: '100%' }}>
      {mainCategories.map((category, index) => (
        <Box key={category} sx={{ mb: 4 }}>
          {/* Main category */}
          <Paper
            elevation={3}
            sx={{
              bgcolor: bgcolor,
              color: '#ffffff',
              p: 2,
              mb: 2,
              textAlign: 'center',
              maxWidth: 300,
              mx: 'auto',
            }}
          >
            <Typography variant="h6">
              {category.replace(/([A-Z])/g, ' $1').trim()}
            </Typography>
          </Paper>

          {/* Subcategories grid */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            {/* Left column */}
            <Box sx={{ width: '45%' }}>
              {Object.entries(pathData[category])
                .slice(0, 2)
                .map(([subCat, items]) => (
                  <Paper key={subCat} sx={{ mb: 2, p: 2 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ mb: 1, color: bgcolor }}
                    >
                      {subCat.replace(/([A-Z])/g, ' $1').trim()}
                    </Typography>
                    <List dense>
                      {items.map((item, i) => (
                        <ListItem key={i}>
                          <ListItemText
                            primary={item}
                            primaryTypographyProps={{
                              variant: 'body2',
                              color: 'text.secondary',
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                ))}
            </Box>

            {/* Arrow */}
            <Box sx={{ display: 'flex', alignItems: 'center', px: 2 }}>
              <ArrowForwardIcon sx={{ color: bgcolor }} />
            </Box>

            {/* Right column */}
            <Box sx={{ width: '45%' }}>
              {Object.entries(pathData[category])
                .slice(2, 4)
                .map(([subCat, items]) => (
                  <Paper key={subCat} sx={{ mb: 2, p: 2 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ mb: 1, color: bgcolor }}
                    >
                      {subCat.replace(/([A-Z])/g, ' $1').trim()}
                    </Typography>
                    <List dense>
                      {items.map((item, i) => (
                        <ListItem key={i}>
                          <ListItemText
                            primary={item}
                            primaryTypographyProps={{
                              variant: 'body2',
                              color: 'text.secondary',
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                ))}
            </Box>
          </Box>

          {/* Connector line */}
          {index < mainCategories.length - 1 && (
            <Box
              sx={{
                height: 32,
                width: 2,
                bgcolor: bgcolor,
                mx: 'auto',
                my: 2,
              }}
            />
          )}
        </Box>
      ))}
    </Box>
  );
};

export default LearningPath;
