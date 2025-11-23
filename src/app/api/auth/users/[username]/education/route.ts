import { NextRequest, NextResponse } from 'next/server';
import { addEducation, updateUserEducation } from '@/controllers/userEducationController';

export async function POST(request: NextRequest, { params }: { params: { username: string } }) {
	try {
		const { username } = await params;
		const body = await request.json();
		const addedEducation = await addEducation(username, body);
		return NextResponse.json({ addedEducation }, { status: 201 });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ Error: 'Internal Server Error' }, { status: 500 });
	}
}

export async function PUT(request: NextRequest, { params }: { params: { username: string } }) {
	try {
		const { username } = await params;
		const body = await request.json();
		const updatedEducation = await updateUserEducation(username, body);
		return NextResponse.json({ updatedEducation }, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ Error: 'Internal Server Error' }, { status: 500 });
	}
}
