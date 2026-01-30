import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { AboutUser } from 'types/aboutUserType';

export async function getUserAbout(username: string) {
	return await prisma.aboutUser.findMany({
		where: { username },
	});
}

export async function addUserAbout(username: string, userAboutSectionData: AboutUser) {
	const user = await prisma.user.findUnique({
		where: { username },
		select: { id: true, profile: { select: { id: true } } },
	});

	if (!user) throw new Error(`User @${username} not found`);

	const newUserAbout = await prisma.aboutUser.create({
		data: {
			userId: user.id,
			username: username,
			header: userAboutSectionData.header,
			aboutContent: userAboutSectionData.aboutContent,
			profileId: user.profile?.id,
		},
	});

	revalidatePath('/');
	revalidatePath('/about');

	return newUserAbout;
}

export async function updateUserAbout(username: string, selectedUserAboutSection: AboutUser) {
	const user = await prisma.user.findUnique({
		where: { username },
		select: { id: true, profile: { select: { id: true } } },
	});

	if (!user) throw new Error(`User @${username} not found`);

	const updatedUserAbout = await prisma.aboutUser.update({
		where: {
			id: selectedUserAboutSection.id,
		},
		data: {
			userId: user.id,
			username: username,
			header: selectedUserAboutSection.header,
			aboutContent: selectedUserAboutSection.aboutContent,
			profileId: user.profile?.id,
		},
	});

	revalidatePath('/');
	revalidatePath('/about');

	return updatedUserAbout;
}

export async function deleteUserAbout(userAboutId: number) {
	const result = await prisma.aboutUser.delete({
		where: { id: userAboutId },
	});

	revalidatePath('/');
	revalidatePath('/about');

	return result;
}
