import { DefaultJWT, DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      username: string;
      //   password: string;
      role: string;
      updatedAt?: Date;
      createdAt?: Date;
    };
  }

  interface User {
    id: string;
    username: string;
    // password: string;
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id?: string;
    username?: string;
    role?: string;
  }
}
