declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      password: string;
      role: string;
      updatedAt: Date;
      createdAt: Date;
    };
  }

  interface User {
    id: string;
    username: string;
    password: string;
    role: string;
    updatedAt: Date;
    createdAt: Date;
  }
}
