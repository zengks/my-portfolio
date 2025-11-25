import { NextRequest, NextResponse } from 'next/server';

import { addSkill, updateSkill, deleteSkill } from '@/controllers/userSkillController';

export async function POST(request: NextRequest, { params }: { params: { username: string } }) {
	try {
		const { username } = await params;
		if (!username) {
			return NextResponse.json({ error: 'Username is required' }, { status: 400 });
		}
		const body = await request.json();
		const addedSkill = await addSkill(username, body);
		return NextResponse.json({ addedSkill }, { status: 201 });
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
		const updatedSkill = await updateSkill(username, body);
		return NextResponse.json({ updatedSkill }, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ Error: 'Internal Server Error' }, { status: 500 });
	}
}

export async function DELETE(request: NextRequest) {
	try {
		const body = await request.json();
		await deleteSkill(body);
		return NextResponse.json({ Response: 'Selected Skill Deleted Successfully!' }, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ Error: 'Internal Server Error' }, { status: 500 });
	}
}
