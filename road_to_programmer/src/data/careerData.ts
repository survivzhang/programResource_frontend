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
    title: 'FRONTEND DEVELOPER',
    bgcolor: '#f8bbd0',
    slug: 'frontend_developer',
    description:
      'Frontend developers are responsible for developing user interfaces and interaction experiences, serving as a bridge between users and applications...',
    skills: [
      'HTML5/CSS3',
      'JavaScript/TypeScript',
      'React/Vue/Angular',
      'Webpack/Vite',
      'Responsive Design',
      'Browser DevTools',
    ],
    roadmap: [
      'Master HTML/CSS Basics',
      'Learn JavaScript Core Concepts',
      'Deep Dive into Modern Frameworks (React/Vue)',
      'Learn Build Tools and Engineering',
      'Master Performance Optimization',
    ],
    ratings: {
      difficulty: 4, // Requires strong technical background
      salary: 4, // High salary
      demand: 4, // Stable demand
      stability: 4, // Stable employment
      futureProspect: 5, // Excellent future prospects
    },
    references: frontendReferences,
  },
  {
    id: 2,
    title: 'DATA ENGINEER',
    bgcolor: '#c8e6c9',
    slug: 'data_analyst',
    description:
      'Data engineers focus on building and maintaining data infrastructure, ensuring efficient data processing and storage.',
    skills: ['SQL', 'Python', 'ETL', 'Big Data Tools', 'Data Warehousing'],
    roadmap: [
      'Master SQL',
      'Learn Python',
      'Understand Data Warehousing',
      'Master ETL Processes',
    ],
    references: devopsReferences,
    ratings: {
      difficulty: 3, // Relatively easy to enter
      salary: 4, // High salary
      demand: 5, // High market demand
      stability: 4, // Relatively stable
      futureProspect: 4, // Good future prospects
    },
  },
  {
    id: 3,
    title: 'BACKEND DEVELOPER',
    bgcolor: '#c8e6c9',
    slug: 'backend_developer',
    description:
      'Backend developers are responsible for server-side logic implementation and data processing. They develop and maintain server-side applications, ensuring system scalability, performance, and security.',
    skills: [
      'Java/Python/Node.js',
      'Spring/Django/Express',
      'MySQL/PostgreSQL',
      'Redis/MongoDB',
      'RESTful API Design',
      'System Architecture Design',
      'Microservice Architecture',
    ],
    roadmap: [
      'Choose and Master Backend Language',
      'Learn Database Technologies',
      'Master Framework Development',
      'Understand Network Protocols',
      'Learn System Design',
      'Practice Microservice Architecture',
    ],
    ratings: {
      difficulty: 4, // High technical requirements
      salary: 4, // High salary
      demand: 5, // High market demand
      stability: 5, // Very stable employment
      futureProspect: 5, // Excellent future prospects
    },
    references: backendReferences,
  },
  {
    id: 4,
    title: 'DATA ANALYST',
    bgcolor: '#b2ebf2',
    slug: 'data_analyst',
    description:
      'Data analysts provide business insights through data analysis, helping companies make data-driven decisions. They process and analyze complex datasets, create visualization reports, and provide recommendations.',
    skills: [
      'SQL',
      'Advanced Excel',
      'Python/R',
      'Power BI/Tableau',
      'Statistical Analysis',
      'Data Visualization',
      'Business Analysis',
    ],
    roadmap: [
      'Master Data Analysis Tools',
      'Learn Statistics Fundamentals',
      'Master Data Visualization',
      'Learn Business Analysis Methods',
      'Enhance Data Storytelling',
      'Understand Machine Learning Basics',
    ],
    ratings: {
      difficulty: 3, // Moderate entry difficulty
      salary: 3, // Medium salary
      demand: 4, // High demand
      stability: 4, // Relatively stable
      futureProspect: 4, // Good future prospects
    },
    references: devopsReferences,
  },
  {
    id: 5,
    title: 'DevOps',
    bgcolor: '#b2ebf2',
    slug: 'devops_engineer',
    description:
      'DevOps engineers are responsible for building and maintaining CI/CD pipelines, ensuring fast and reliable software deployment. They coordinate development and operations work, automate deployment processes, and monitor system performance.',
    skills: [
      'Linux System Administration',
      'Docker/Kubernetes',
      'CI/CD Tools',
      'AWS/Azure/GCP',
      'Shell Scripting',
      'Monitoring Tools',
      'Security Practices',
    ],
    roadmap: [
      'Learn Linux Fundamentals',
      'Master Container Technologies',
      'Learn CI/CD Processes',
      'Understand Cloud Platforms',
      'Master Automation Tools',
      'Learn System Monitoring',
    ],
    references: devopsReferences,
    ratings: {
      difficulty: 5, // High technical difficulty
      salary: 5, // Very high salary
      demand: 4, // High demand
      stability: 4, // Relatively stable
      futureProspect: 5, // Excellent future prospects
    },
  },
  {
    id: 6,
    title: 'DATA SCIENTIST',
    bgcolor: '#f8bbd0',
    slug: 'data_scientist',
    description:
      'Data scientists use machine learning and statistical methods to solve complex problems. They design and implement predictive models, extract data value, and drive data-driven decision-making.',
    skills: [
      'Python/R',
      'Machine Learning Algorithms',
      'Deep Learning Frameworks',
      'Statistics',
      'SQL',
      'Data Visualization',
      'Feature Engineering',
    ],
    roadmap: [
      'Master Programming Languages',
      'Learn Statistics Fundamentals',
      'Understand ML Algorithms',
      'Learn Deep Learning',
      'Practice Data Modeling',
      'Develop Business Understanding',
    ],
    references: devopsReferences,
    ratings: {
      difficulty: 5, // High technical requirements
      salary: 5, // Very high salary
      demand: 4, // High demand
      stability: 4, // Relatively stable
      futureProspect: 5, // Excellent future prospects
    },
  },
];
