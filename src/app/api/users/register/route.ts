import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { createUser } from '@/controllers/userController';

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { username, password, email, firstName, role } = body;

		if (!username || !password || !email || !firstName) {
			return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
		}

		const existingUser = await prisma.user.findUnique({
			where: { username: username },
		});

		if (existingUser) {
			return NextResponse.json({ message: 'Username already exists.' }, { status: 400 });
		}

		const newUser = await createUser(username, password, email, firstName, role);

		if (!newUser) {
			return NextResponse.json({ message: 'Failed to create user.' }, { status: 500 });
		}

		return NextResponse.json({ message: 'User registered successfully.' }, { status: 201 });
	} catch (error) {
		console.error('Registration Error:', error);
		return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
	}
}
