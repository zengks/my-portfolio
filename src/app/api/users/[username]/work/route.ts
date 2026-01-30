import { NextRequest, NextResponse } from 'next/server';

import {
	addWorkExperience,
	updateWorkExperience,
	deleteWorkExperience,
} from '@/controllers/userWorkExpController';

export async function POST(
	request: NextRequest,
	{ params }: { params: Promise<{ username: string }> }
) {
	try {
		const { username } = await params;
		if (!username) {
			return NextResponse.json({ error: 'Username is required' }, { status: 400 });
		}
		const body = await request.json();
		const addedWorkExp = await addWorkExperience(username, body);
		return NextResponse.json({ addedWorkExp }, { status: 201 });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ Error: 'Internal Server Error' }, { status: 500 });
	}
}

export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ username: string }> }
) {
	try {
		const { username } = await params;
		if (!username) {
			return NextResponse.json({ error: 'Username is required' }, { status: 400 });
		}
		const body = await request.json();
		const updatedWorkExp = await updateWorkExperience(username, body);
		return NextResponse.json({ updatedWorkExp }, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ Error: 'Internal Server Error' }, { status: 500 });
	}
}

export async function DELETE(request: NextRequest) {
	try {
		const body = await request.json();
		await deleteWorkExperience(body);
		return NextResponse.json(
			{ Response: 'Selected Work Experience Deleted Successfully!' },
			{ status: 200 }
		);
	} catch (error) {
		console.log(error);
		return NextResponse.json({ Error: 'Internal Server Error' }, { status: 500 });
	}
}
