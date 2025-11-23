import { NextResponse, NextRequest } from 'next/server';
import { getUserByUsername } from '@/controllers/userController';

export async function GET(request: NextRequest, { params }: { params: { username: string } }) {
	try {
		const { username } = await params;
		const user = await getUserByUsername(username);
		return NextResponse.json({ user }, { status: 200 });
	} catch (error) {
		console.error('Internal Server Error.', error);
	}
}
