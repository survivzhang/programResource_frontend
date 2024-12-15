export interface CareerPath {
  id: number;
  title: string;
  bgcolor: string;
}

export interface CareerCardProps {
  title: string;
  bgcolor: string;
  onClick: () => void;
}
