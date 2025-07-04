export interface WorkExperience {
  id: number;
  userId: string;
  jobTitle: string;
  company: string;
  startDate: Date;
  endDate: Date | null;
  description: string | null;
}
