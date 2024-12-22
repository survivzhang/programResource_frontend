// types.ts
export interface CareerPath {
  id: number;
  title: string;
  bgcolor: string;
  slug: string;
  description: string;
  skills: string[];
  roadmap: string[];
  references?: string[]; // 新增：参考资料
  jobs?: {
    // 新增：工作机会
    title: string;
    company: string;
    location: string;
  }[];
}
export interface CareerCardProps {
  title: string;
  bgcolor: string;
  onClick: () => void;
}
