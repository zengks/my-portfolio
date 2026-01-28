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
			fieldOfStudy: newEducationData.fieldOfStudy,
			schoolLogoUrl: newEducationData.schoolLogoUrl,
			city: newEducationData.city,
			province: newEducationData.province,
			country: newEducationData.country,
			startMonth: newEducationData.startMonth,
			startYear: newEducationData.startYear,
			endMonth: newEducationData.endMonth ?? null,
			endYear: newEducationData.endYear ?? null,
			gpa: newEducationData.gpa,
			description: newEducationData.description,
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
			fieldOfStudy: selectedEducationData.fieldOfStudy,
			schoolLogoUrl: selectedEducationData.schoolLogoUrl,
			city: selectedEducationData.city,
			province: selectedEducationData.province,
			country: selectedEducationData.country,
			startMonth: selectedEducationData.startMonth,
			startYear: selectedEducationData.startYear,
			endMonth: selectedEducationData.endMonth ?? null,
			endYear: selectedEducationData.endYear ?? null,
			gpa: selectedEducationData.gpa,
			description: selectedEducationData.description,
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
