export interface Profile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string | null;
  email: string;
  bio: string | null;
  imageLink: string | null;
  createdAt: string;
  updatedAt: string;
}
