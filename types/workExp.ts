export interface WorkExperience {
  id: number;
  userId: string;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string | null;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}
