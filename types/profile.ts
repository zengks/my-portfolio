export interface Profile {
  id: number;
  userId: string;
  firstName: string;
  lastName: string | null;
  email: string;
  bio: string | null;
  imageLink: string | null;
  createdAt: string;
  updatedAt: string;
}
