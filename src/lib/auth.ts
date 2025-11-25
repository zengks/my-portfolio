import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from 'src/lib/prisma';
import CredentialsProvider from 'next-auth/providers/credentials';
import { randomBytes, randomUUID } from 'crypto';
import { verifyHashedPassword } from 'src/lib/hash';

import type { AuthOptions, Session } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

export const authOptions: AuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				username: { label: 'Username', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				const user = await prisma.user.findUnique({
					where: { username: credentials?.username },
				});
				if (!user || !credentials?.password || !user.password) return null;

				const isValid = await verifyHashedPassword(credentials?.password, user.password);

				if (isValid) {
					console.log('User authenticated successfully', user);
				} else {
					console.log('Invalid credentials');
				}
				return isValid
					? {
							id: user.id,
							username: user.username,
							role: user.role ?? 'guest',
							updatedAt: user.updatedAt,
							createdAt: user.createdAt,
					  }
					: null;
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: 'jwt' as const,

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
	callbacks: {
		async jwt({ token, user }) {
			if (user && 'username' in user && 'role' in user) {
				token.id = user.id;
				token.username = user.username;
				token.role = user.role ?? 'guest';
			}
			return token;
		},
		async session({ session, token }: { session: Session; token: JWT }): Promise<Session> {
			session.user = {
				id: token.id as string,
				username: token.username as string,
				role: token.role as string,
			};
			return session;
		},
	},
};
