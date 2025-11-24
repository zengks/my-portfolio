import { NextResponse } from 'next/server';
// import bcrypt from 'bcryptjs';
// Make sure to import your Prisma client or other database client
import prisma from '@/lib/prisma'; // Example: Assuming you use Prisma
// import { hashPassword } from '@/lib/hash';
// import { createUser } from '@/controllers/userController';

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { username, password } = body; // Add email or other fields as needed

		// --- Basic Validation ---
		if (!username || !password) {
			return NextResponse.json({ message: 'Username and password are required.' }, { status: 400 });
		}

		// --- Check if user already exists ---
		// (Update this to check for username OR email if email is unique)
		const existingUser = await prisma.user.findUnique({
			where: { username: username }, // or { email: email }
		});

		if (existingUser) {
			return NextResponse.json({ message: 'Username already exists.' }, { status: 400 });
		}

		// --- Hash the password ---
		// const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

		// --- Create the new user in your database ---
		// const newUser = await createUser(username, password, role);

		// Don't send the password back, even the hashed one
		return NextResponse.json(
			{ message: 'User registered successfully.' },
			{ status: 201 } // 201 means "Created"
		);
	} catch (error) {
		console.error('Registration Error:', error);
		return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
	}
}
