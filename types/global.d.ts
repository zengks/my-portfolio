interface User {
  id: string;
  username: string;
  password: string;
  role: string;
  updatedAt: Date;
  createdAt: Date;
}

interface Profile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string?;
  bio: string?;
  profilePictureUrl: string?;
  updatedAt: Date;
  createdAt: Date;
}
