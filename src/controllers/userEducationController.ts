import prisma from '@/lib/prisma';
import { Education } from 'types/educationType';

export async function getUserEducation(username: string) {
	return await prisma.education.findMany({
		where: { username },
		orderBy: { startYear: 'desc' }, // Most recent first
	});
}

export async function addEducation(username: string, newEducationData: Education) {
	const user = await prisma.user.findUnique({
		where: { username },
		select: { id: true },
	});

	if (!user) throw new Error(`User @${username} not found`);

	const newEducation = await prisma.education.create({
		data: {
			userId: user.id,
			username: username,
			school: newEducationData.school,
			degree: newEducationData.degree,
			fieldOfStudy: newEducationData.fieldOfStudy ?? null,
			startYear: newEducationData.startYear,
			endYear: newEducationData.endYear ?? null,
			gpa: newEducationData.gpa ?? null,
			description: newEducationData.description ?? null,
		},
	});
	return newEducation;
}

export async function updateUserEducation(username: string, selectedEducationData: Education) {
	const user = await prisma.user.findUnique({
		where: { username },
		select: { id: true },
	});

	if (!user) throw new Error(`User @${username} not found`);

	const updatedEducation = await prisma.education.update({
		where: {
			id: selectedEducationData.id,
		},
		data: {
			school: selectedEducationData.school,
			degree: selectedEducationData.degree,
			fieldOfStudy: selectedEducationData.fieldOfStudy ?? null,
			startYear: selectedEducationData.startYear,
			endYear: selectedEducationData.endYear ?? null,
		},
	});

	return updatedEducation;
}

export async function deleteUserEducation(educationId: number) {
	return await prisma.education.delete({
		where: {
			id: educationId,
		},
	});
}
