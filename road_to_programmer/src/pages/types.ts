// 基础类型定义
export interface JobLocation {
  country: string;
  cities: string[];
}

export interface JobMarketData {
  location: string;
  trends: string[];
  demandLevel: string;
  growthRate: string;
}

export interface SalaryData {
  location: string;
  junior: string;
  middle: string;
  senior: string;
  average: string;
}

export interface CourseType {
  course: string[];
  books: string[];
  projects: string[];
}

// 参考资料结构
export interface ReferenceData {
  [technology: string]: CourseType;
}

// 职业路径定义
// src/types.ts
export interface CareerPath {
  id: number;
  title: string;
  bgcolor: string;
  slug: string;
  description: string;
  skills: string[];
  roadmap: string[];
  references: ReferenceData;
  ratings: CareerRatings;
}

// 卡片属性定义
export interface CareerCardProps {
  title: string;
  bgcolor: string;
  onClick: () => void;
  ratings: CareerRatings;
}

// 评分系统相关类型
export interface RatingComponentProps {
  value: number;
  maxStars?: number;
  size?: number;
  color?: string;
}

export interface CareerRatings {
  difficulty: number;
  salary: number;
  demand: number;
  stability: number;
  futureProspect: number;
}

export interface RatingConfig {
  label: string;
  value: number;
  color: string;
}
