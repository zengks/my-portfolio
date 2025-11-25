import { NextResponse, NextRequest } from 'next/server';
import { getUserByUsername } from '@/controllers/userController';

export async function GET(request: NextRequest, { params }: { params: { username: string } }) {
	try {
		const { username } = await params;

		if (!username) {
			return NextResponse.json({ error: 'Username is required' }, { status: 400 });
		}

		const user = await getUserByUsername(username);

		if (!user) {
			return NextResponse.json({ error: 'User not found' }, { status: 404 });
		}
		return NextResponse.json({ user }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: 'Internal Server Error.', details: String(error) },
			{ status: 500 }
		);
	}
}
