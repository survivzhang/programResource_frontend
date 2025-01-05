// src/data/careerData.ts
import { CareerPath } from '../pages/types';

import {
  frontendReferences,
  backendReferences,
  devopsReferences,
} from './referenceData';
export const careerPaths: CareerPath[] = [
  {
    id: 1,
    title: 'FRONTEND ENGINEER',
    bgcolor: '#f8bbd0',
    slug: 'frontend-engineer',
    description:
      '前端工程师负责开发用户界面和交互体验，是连接用户与应用程序的桥梁...',
    skills: [
      'HTML5/CSS3',
      'JavaScript/TypeScript',
      'React/Vue/Angular',
      'Webpack/Vite',
      '响应式设计',
      '浏览器开发工具',
    ],
    roadmap: [
      '掌握 HTML/CSS 基础',
      '学习 JavaScript 核心概念',
      '深入了解现代框架（React/Vue）',
      '学习构建工具和工程化',
      '掌握性能优化技巧',
    ],
    ratings: {
      difficulty: 4, // 需要较强的技术背景
      salary: 4, // 薪资较高
      demand: 4, // 需求稳定
      stability: 4, // 就业稳定
      futureProspect: 5, // 发展前景很好
    },
    references: frontendReferences,
  },
  {
    id: 2,
    title: 'DATA ENGINEER',
    bgcolor: '#c8e6c9',
    slug: 'data-engineer',
    description:
      '数据工程师专注于构建和维护数据基础设施，确保数据的高效处理和存储。',
    skills: ['SQL', 'Python', 'ETL', 'Big Data Tools', 'Data Warehousing'],
    roadmap: ['掌握 SQL', '学习 Python', '了解数据仓库', '掌握 ETL 流程'],
    references: devopsReferences,
    ratings: {
      difficulty: 3, // 入门相对容易
      salary: 4, // 薪资较高
      demand: 5, // 市场需求很大
      stability: 4, // 就业相对稳定
      futureProspect: 4, // 发展前景好
    },
  },
  {
    id: 3,
    title: 'BACKEND ENGINEER',
    bgcolor: '#c8e6c9',
    slug: 'backend-engineer',
    description:
      '后端工程师负责服务器端的逻辑实现和数据处理。开发和维护服务器端应用程序，确保系统的可扩展性、性能和安全性。',
    skills: [
      'Java/Python/Node.js',
      'Spring/Django/Express',
      'MySQL/PostgreSQL',
      'Redis/MongoDB',
      'RESTful API设计',
      '系统架构设计',
      '微服务架构',
    ],
    roadmap: [
      '选择并掌握后端语言',
      '学习数据库技术',
      '掌握框架开发',
      '了解网络协议',
      '学习系统设计',
      '实践微服务架构',
    ],
    ratings: {
      difficulty: 4, // 技术要求较高
      salary: 4, // 薪资较高
      demand: 5, // 市场需求大
      stability: 5, // 就业非常稳定
      futureProspect: 5, // 发展前景很好
    },
    references: backendReferences,
  },
  {
    id: 4,
    title: 'DATA ANALYST',
    bgcolor: '#b2ebf2',
    slug: 'data-analyst',
    description:
      '数据分析师通过分析数据提供业务洞察，帮助企业做出数据驱动的决策。需要处理和分析复杂的数据集，创建可视化报表，并提供建议。',
    skills: [
      'SQL',
      'Excel高级功能',
      'Python/R',
      'Power BI/Tableau',
      '统计分析',
      '数据可视化',
      '商业分析',
    ],
    roadmap: [
      '掌握数据分析工具',
      '学习统计学基础',
      '掌握数据可视化',
      '学习商业分析方法',
      '提升数据讲述能力',
      '了解机器学习基础',
    ],
    ratings: {
      difficulty: 3, // 入门难度适中
      salary: 3, // 薪资中等
      demand: 4, // 需求较大
      stability: 4, // 较为稳定
      futureProspect: 4, // 发展前景好
    },

    references: devopsReferences,
  },
  {
    id: 5,
    title: 'DevOps',
    bgcolor: '#b2ebf2',
    slug: 'devops',
    description:
      'DevOps工程师负责构建和维护CI/CD流程，确保软件的快速、可靠部署。需要协调开发和运维工作，自动化部署流程，监控系统性能。',
    skills: [
      'Linux系统管理',
      'Docker/Kubernetes',
      'CI/CD工具',
      'AWS/Azure/GCP',
      'Shell脚本',
      '监控工具',
      '安全实践',
    ],
    roadmap: [
      '学习Linux基础',
      '掌握容器技术',
      '学习CI/CD流程',
      '了解云平台服务',
      '掌握自动化工具',
      '学习系统监控',
    ],
    references: devopsReferences,
    ratings: {
      difficulty: 5, // 技术难度大
      salary: 5, // 薪资很高
      demand: 4, // 需求较大
      stability: 4, // 较为稳定
      futureProspect: 5, // 发展前景很好
    },
  },
  {
    id: 6,
    title: 'DATA SCIENTIST',
    bgcolor: '#f8bbd0',
    slug: 'data-scientist',
    description:
      '数据科学家运用机器学习和统计方法解决复杂问题。需要设计和实施预测模型，挖掘数据价值，推动数据驱动的决策。',
    skills: [
      'Python/R',
      '机器学习算法',
      '深度学习框架',
      '统计学',
      'SQL',
      '数据可视化',
      '特征工程',
    ],
    roadmap: [
      '掌握编程语言',
      '学习统计学基础',
      '理解机器学习算法',
      '学习深度学习',
      '实践数据建模',
      '培养业务理解力',
    ],
    references: devopsReferences,
    ratings: {
      difficulty: 5, // 技术要求高
      salary: 5, // 薪资很高
      demand: 4, // 需求较大
      stability: 4, // 较为稳定
      futureProspect: 5, // 发展前景很好
    },
  },
  // ... 其他职业路径数据
];
