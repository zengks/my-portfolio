export interface Education {
  id: number;
  userId: string;
  school: string;
  degree: string;
  fieldOfStudy: string | null;
  startDate: string;
  endDate: string | null;
  gpa: Float16Array;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}
