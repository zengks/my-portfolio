export interface Education {
  id: number;
  userId: string;
  school: string;
  degree: string;
  fieldOfStudy: string | null;
  startDate: Date;
  endDate: Date | null;
  gpa: number | null;
  description: string | null;
}
