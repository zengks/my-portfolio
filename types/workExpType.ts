export interface WorkExperience {
  id: number;
  jobTitle: string;
  company: string;
  startDate: Date;
  endDate: Date | null;
  description: string | null;
}
