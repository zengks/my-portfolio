import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import type { Session } from 'next-auth';

type Handler = (session: Session, ...args: unknown[]) => Promise<NextResponse>;

export function withAuth(handler: Handler) {
	console.log('withAuth middleware initialized');
	return async (...args: unknown[]): Promise<NextResponse> => {
		const session = await getServerSession(authOptions);
		if (!session?.user.id) {
			return NextResponse.json({ Error: 'User not authenticated' }, { status: 401 });
		}
		return handler(session, ...args);
	};
}
