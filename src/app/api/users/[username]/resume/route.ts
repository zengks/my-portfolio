import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ username: string }> }
) {
	const { username } = await params;

	const profile = await prisma.profile.findUnique({
		where: { username },
		select: { resumeData: true, resumeUrl: true },
	});

	if (!profile || !profile.resumeData) {
		return new NextResponse('Resume not found', { status: 404 });
	}

	const [meta, based64String] = profile.resumeData.split(',');
	const mimeType = meta.split(':')[1].split(';')[0];

	const fileBuffer = Buffer.from(based64String, 'base64');

	return new NextResponse(fileBuffer, {
		headers: {
			'Content-Type': mimeType,
			'Content-Disposition': `inline; filename="${profile.resumeUrl || 'resume.pdf'}"`,
			'Cache-Control': 'public, max-age=3600', // Optional: cache it for 1 hour
		},
	});
}
