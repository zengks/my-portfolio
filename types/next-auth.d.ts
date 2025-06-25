declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      password?: string;
      role: string;
    };
  }

  interface User {
    id: string;
    username: string;
    password?: string;
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    username?: string;
    role?: string;
  }
}
