import { NextRequest, NextResponse } from 'next/server';

import { updateUserProfile } from '@/controllers/userProfileController';

export async function PUT(request: NextRequest, { params }: { params: { username: string } }) {
	try {
		const { username } = await params;
		if (!username) {
			return NextResponse.json({ error: 'Username is required' }, { status: 400 });
		}

		const body = await request.formData();
		const updatedProfile = await updateUserProfile(username, body);
		return NextResponse.json({ updatedProfile }, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ Error: 'Internal Server Error' }, { status: 500 });
	}
}
