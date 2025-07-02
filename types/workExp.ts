export interface WorkExperience {
  id: number;
  userId: string;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string | "Present";
  description: string | "";
  //   createdAt: string;
  //   updatedAt: string;
}
