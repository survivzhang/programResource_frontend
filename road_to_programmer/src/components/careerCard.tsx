import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Collapse,
  Button,
  IconButton,
  styled,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { CareerCardProps } from '../pages/types';
import { Star } from 'lucide-react';

interface RatingProps {
  value: number;
  maxStars?: number;
  size?: number;
  color?: string;
}

const Rating = ({
  value,
  maxStars = 5,
  size = 20,
  color = '#FFD700',
}: RatingProps) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(maxStars)].map((_, index) => (
        <Star
          key={index}
          size={size}
          className={`${index < value ? 'fill-current' : 'stroke-current'}`}
          color={color}
          fill={index < value ? color : 'none'}
        />
      ))}
    </div>
  );
};
// 创建展开按钮的样式组件
const ExpandMore = styled((props: any) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface CareerRatings {
  difficulty: number;
  salary: number;
  demand: number;
  stability: number;
  futureProspect: number;
}

interface ExtendedCareerCardProps extends CareerCardProps {
  ratings: CareerRatings;
}

const CareerCard: React.FC<ExtendedCareerCardProps> = ({
  title,
  bgcolor,
  onClick,
  ratings,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setExpanded(!expanded);
  };

  const ratingConfigs = [
    { label: '学习难度', value: ratings.difficulty, color: '#FF5722' },
    { label: '薪资水平', value: ratings.salary, color: '#4CAF50' },
    { label: '市场需求', value: ratings.demand, color: '#2196F3' },
    { label: '职业稳定性', value: ratings.stability, color: '#FF9800' },
    { label: '发展前景', value: ratings.futureProspect, color: '#9C27B0' },
  ];

  return (
    <Card
      sx={{
        bgcolor: bgcolor,
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.02)',
        },
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h5"
            component="div"
            sx={{ fontWeight: 'bold', color: 'white' }}
          >
            {title}
          </Typography>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            sx={{ color: 'white' }}
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </Box>
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Box sx={{ mb: 2 }}>
            {ratingConfigs.map((config) => (
              <Box
                key={config.label}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 1,
                  color: 'rgba(255, 255, 255, 0.9)',
                }}
              >
                <Typography sx={{ minWidth: 100 }}>{config.label}</Typography>
                <Rating value={config.value} color={config.color} size={18} />
              </Box>
            ))}
          </Box>
          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            onClick={onClick}
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.2)',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.3)',
              },
            }}
          >
            了解更多
          </Button>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default CareerCard;
