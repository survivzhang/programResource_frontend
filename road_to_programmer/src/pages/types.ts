// types.ts
export interface CareerPath {
  id: number;
  title: string;
  bgcolor: string;
  slug: string; // URL friendly version of title
  description: string;
  skills: string[];
  roadmap: string[];
}
export interface CareerCardProps {
  title: string;
  bgcolor: string;
  onClick: () => void;
}
