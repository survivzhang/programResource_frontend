// src/pages/career/[slug].tsx
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { careerPaths } from '../data/careerData';

const CareerIntroPage: React.FC = () => {
  const { slug } = useParams(); // 使用 useParams 替代 useRouter
  const navigate = useNavigate(); // 用于返回功能

  const career = careerPaths.find((path) => path.slug === slug);

  if (!career) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" align="center">
          未找到该职业路径
        </Typography>
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/')}
            variant="contained"
          >
            返回首页
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* 返回按钮 */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/')}
        sx={{ mb: 3 }}
      >
        返回
      </Button>

      <Box sx={{ bgcolor: career.bgcolor, p: 3, borderRadius: 2 }}>
        {/* 标题 */}
        <Typography variant="h3" component="h1">
          {career.title}
        </Typography>

        {/* 描述 */}
        <Box
          sx={{
            bgcolor: 'rgba(255,255,255,0.9)',
            p: 3,
            mt: 3,
            borderRadius: 1,
          }}
        >
          <Typography variant="body1">{career.description}</Typography>

          {/* 技能列表 */}
          <Typography variant="h5" sx={{ mt: 4 }}>
            核心技能
          </Typography>
          <List>
            {career.skills.map((skill, index) => (
              <ListItem key={index}>
                <ListItemText primary={skill} />
              </ListItem>
            ))}
          </List>

          {/* 学习路线 */}
          <Typography variant="h5" sx={{ mt: 4 }}>
            学习路线
          </Typography>
          <List>
            {career.roadmap.map((step, index) => (
              <ListItem key={index}>
                <ListItemText primary={`${index + 1}. ${step}`} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Container>
  );
};

export default CareerIntroPage;
