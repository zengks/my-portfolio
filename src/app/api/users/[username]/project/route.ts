import { NextRequest, NextResponse } from 'next/server';

import {
	addProject,
	updateUserProject,
	deleteUserProject,
} from '@/controllers/userProjectController';

export async function POST(request: NextRequest, { params }: { params: { username: string } }) {
	try {
		const { username } = await params;
		if (!username) {
			return NextResponse.json({ error: 'Username is required' }, { status: 400 });
		}
		const body = await request.json();
		const addedProject = await addProject(username, body);
		return NextResponse.json({ addedProject }, { status: 201 });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ Error: 'Internal Server Error' }, { status: 500 });
	}
}

export async function PUT(request: NextRequest, { params }: { params: { username: string } }) {
	try {
		const { username } = await params;
		if (!username) {
			return NextResponse.json({ error: 'Username is required' }, { status: 400 });
		}
		const body = await request.json();
		const updatedProject = await updateUserProject(username, body);
		return NextResponse.json({ updatedProject }, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ Error: 'Internal Server Error' }, { status: 500 });
	}
}

export async function DELETE(request: NextRequest) {
	try {
		const body = await request.json();
		await deleteUserProject(body);
		return NextResponse.json(
			{ Response: 'Selected Project Deleted Successfully!' },
			{ status: 200 }
		);
	} catch (error) {
		console.log(error);
		return NextResponse.json({ Error: 'Internal Server Error' }, { status: 500 });
	}
}
