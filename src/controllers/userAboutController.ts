import prisma from '@/lib/prisma';

import { AboutUser } from 'types/aboutUserType';

export async function getUserAbout(username: string = 'zengks') {
	return await prisma.profile.findUnique({
		where: { username },
		select: { aboutUser: true },
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

	return updatedUserAbout;
}

export async function deleteUserAbout(userAboutId: number) {
	return await prisma.aboutUser.delete({
		where: { id: userAboutId },
	});
}
