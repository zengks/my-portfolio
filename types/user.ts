export interface User {
  id: string;
  username: string;
  role: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface UserUpdateInput {
  password?: string;
}
