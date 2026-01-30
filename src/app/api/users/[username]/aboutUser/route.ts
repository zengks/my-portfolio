import { NextResponse, NextRequest } from 'next/server';
import { addUserAbout, updateUserAbout, deleteUserAbout } from '@/controllers/userAboutController';

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
		const addedUserAbout = await addUserAbout(username, body);
		return NextResponse.json({ addedUserAbout }, { status: 201 });
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
		const updatedUserAbout = await updateUserAbout(username, body);
		return NextResponse.json({ updatedUserAbout }, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ Error: 'Internal Server Error' }, { status: 500 });
	}
}

export async function DELETE(request: NextRequest) {
	try {
		const body = await request.json();
		await deleteUserAbout(body);
		return NextResponse.json(
			{ Response: 'Selected About User Section Deleted Successfully!' },
			{ status: 200 }
		);
	} catch (error) {
		console.log(error);
		return NextResponse.json({ Error: 'Internal Server Error' }, { status: 500 });
	}
}
