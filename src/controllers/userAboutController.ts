import prisma from '@/lib/prisma';

export async function getUserAbout(username: string = 'zengks') {
	return await prisma.user.findUnique({
		where: { username },
		select: { aboutUser: true },
	});
}
