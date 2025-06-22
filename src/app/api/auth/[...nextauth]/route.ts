import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
// import { compare } from "bcrypt";
import { randomBytes, randomUUID } from "crypto";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { username: credentials?.username },
        });
        if (!user || !credentials?.password || !user.password) return null;

        // const isValid = await compare(credentials?.password, user.password);
        const isValid = credentials?.password === user.password;
        if (isValid) {
          console.log("User authenticated successfully", user);
        } else {
          console.log("Invalid credentials");
        }
        return isValid ? user : null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt" as const,

    // 30 days in seconds
    maxAge: 30 * 24 * 60 * 60,
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex");
    },
  },
  pages: {
    signIn: "/users/login",
    signOut: "/",
  },
  callbacks: {
    async jwt({ token, user }: { token: Record<string, unknown>; user: User }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.role = user.role;
      }
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: Record<string, unknown>;
      token: Record<string, unknown>;
    }) {
      session.user = {
        id: token.id,
        username: token.username,
        role: token.role,
      };
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
