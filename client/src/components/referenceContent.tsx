// src/components/ReferenceContent.tsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  ListItemButton,
} from '@mui/material';
import { CourseType } from '../pages/types';

interface ReferenceContentProps {
  references: {
    [key: string]: CourseType;
  };
  bgcolor: string;
}

const ReferenceContent: React.FC<ReferenceContentProps> = ({
  references,
  bgcolor,
}) => {
  const [selectedTech, setSelectedTech] = useState<string>('');

  // 初始化选中第一个技术
  useEffect(() => {
    if (references) {
      setSelectedTech(Object.keys(references)[0]);
    }
  }, [references]);

  return (
    <Box sx={{ display: 'flex', gap: 4, minHeight: 400 }}>
      {/* 左侧技术栏 */}
      <Box
        sx={{
          width: 200,
          borderRight: 1,
          borderColor: 'divider',
          p: 2,
        }}
      >
        <List>
          {Object.keys(references).map((tech) => (
            <ListItem key={tech} disablePadding>
              {' '}
              {/* 修改这里 */}
              <ListItemButton
                onClick={() => setSelectedTech(tech)}
                selected={selectedTech === tech}
                sx={{
                  borderRadius: 1,
                  mb: 1,
                  '&.Mui-selected': {
                    bgcolor: `${bgcolor}40`,
                    '&:hover': {
                      bgcolor: `${bgcolor}60`,
                    },
                  },
                }}
              >
                <ListItemText primary={tech} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* 右侧内容区域 */}
      <Box sx={{ flex: 1, display: 'flex', gap: 3 }}>
        {/* 课程部分 */}
        <ResourceSection
          title="COURSE"
          items={selectedTech ? references[selectedTech]?.course : []}
        />

        {/* 书籍部分 */}
        <ResourceSection
          title="BOOK"
          items={selectedTech ? references[selectedTech]?.books : []}
        />

        {/* 项目部分 */}
        <ResourceSection
          title="PROJECT"
          items={selectedTech ? references[selectedTech]?.projects : []}
        />
      </Box>
    </Box>
  );
};

// 资源区块子组件
const ResourceSection: React.FC<{ title: string; items?: string[] }> = ({
  title,
  items = [],
}) => (
  <Box sx={{ flex: 1 }}>
    <Box
      sx={{
        bgcolor: 'grey.100',
        borderRadius: '50%',
        width: 120,
        height: 120,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mb: 2,
        mx: 'auto',
      }}
    >
      <Typography variant="h6">{title}</Typography>
    </Box>
    <List>
      {items.map((item, index) => (
        <ListItem key={index}>
          <ListItemText primary={item} />
        </ListItem>
      ))}
    </List>
  </Box>
);

export default ReferenceContent;
