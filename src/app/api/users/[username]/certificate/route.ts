import { NextRequest, NextResponse } from 'next/server';
import {
	addCertificate,
	updateUserCertificate,
	deleteUserCertificate,
} from '@/controllers/userCertificateController';

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
		const addedCertificate = await addCertificate(username, body);
		return NextResponse.json({ addedCertificate }, { status: 201 });
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
		const updatedCertificate = await updateUserCertificate(username, body);
		return NextResponse.json({ updatedCertificate }, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ Error: 'Internal Server Error' }, { status: 500 });
	}
}

export async function DELETE(request: NextRequest) {
	try {
		const body = await request.json();
		await deleteUserCertificate(body);
		return NextResponse.json(
			{ Response: 'Selected Certificate Deleted Successfully!' },
			{ status: 200 }
		);
	} catch (error) {
		console.log(error);
		return NextResponse.json({ Error: 'Internal Server Error' }, { status: 500 });
	}
}
