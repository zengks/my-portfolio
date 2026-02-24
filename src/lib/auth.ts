import type { Adapter } from 'next-auth/adapters';
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import { randomBytes, randomUUID } from 'crypto';

import { verifyHashedPassword } from 'src/lib/hash';
import prisma from 'src/lib/prisma';

export const { handlers, auth, signIn, signOut } = NextAuth({
	adapter: PrismaAdapter(prisma) as Adapter,

	secret: process.env.NEXTAUTH_SECRET,

	session: {
		strategy: 'jwt',

		// Only valid for 10 minutes
		maxAge: 10 * 60,
		generateSessionToken: () => {
			return randomUUID?.() ?? randomBytes(32).toString('hex');
		},
	},

	pages: {
		signIn: '/users/login',
		signOut: '/',
	},

	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				username: { label: 'Username', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials?.username || !credentials?.password) return null;

				const user = await prisma.user.findUnique({
					where: { username: credentials.username as string },
				});

				if (!user || !user.password) return null;

				const isValid = await verifyHashedPassword(credentials.password as string, user.password);

				if (isValid) {
					console.log('User authenticated successfully', user);
					return {
						id: user.id,
						username: user.username,
						role: user.role ?? 'guest',
					};
				}
				console.log('Invalid credentials');
				return null;
			},
		}),
	],

	callbacks: {
		async jwt({ token, user }) {
			// if (user && 'username' in user && 'role' in user) {
			// 'user' is only defined on the very first sign-in request
			if (user) {
				token.id = user.id as string;
				token.username = user.username;
				token.role = user.role ?? 'guest';
			}
			return token;
		},

		// async session({ session, token }: { session: Session; token: JWT }): Promise<Session> {
		// 	session.user = {
		// 		id: token.id as string,
		// 		username: token.username as string,
		// 		role: token.role as string,
		// 	};
		// 	return session;
		// },

		async session({ session, token }) {
			if (token && session.user) {
				session.user.id = token.id as string;
				session.user.username = token.username as string;
				session.user.role = token.role as string;
			}
			return session;
		},
	},
});
