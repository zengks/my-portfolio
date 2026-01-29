import prisma from '@/lib/prisma';
import { WorkExperience } from 'types/workExpType';

export async function getUserWorkExp(username: string) {
	return await prisma.workExperience.findMany({
		where: { username },
		orderBy: [{ startYear: 'desc' }, { endYear: 'desc' }],
	});
}

export async function addWorkExperience(username: string, workExpData: WorkExperience) {
	const user = await prisma.user.findUnique({
		where: { username },
		select: { id: true },
	});

	if (!user) throw new Error(`User @${username} not found`);

	const newWorkExp = await prisma.workExperience.create({
		data: {
			userId: user.id,
			username: username,
			jobTitle: workExpData.jobTitle,
			company: workExpData.company,
			companyLogoUrl: workExpData.companyLogoUrl,
			city: workExpData.city,
			province: workExpData.province,
			country: workExpData.country,
			locationType: workExpData.locationType,
			employmentType: workExpData.employmentType,
			startMonth: workExpData.startMonth,
			startYear: workExpData.startYear,
			endMonth: workExpData.endMonth ?? null,
			endYear: workExpData.endYear ?? null,
			description: workExpData.description ?? null,
		},
	});
	return newWorkExp;
}

export async function updateWorkExperience(username: string, newWorkExpData: WorkExperience) {
	const user = await prisma.user.findUnique({
		where: { username },
		select: { id: true },
	});

	if (!user) throw new Error(`User @${username} not found`);

	const updatedWorkExp = await prisma.workExperience.update({
		where: {
			id: newWorkExpData.id,
		},
		data: {
			jobTitle: newWorkExpData.jobTitle,
			company: newWorkExpData.company,
			companyLogoUrl: newWorkExpData.companyLogoUrl,
			city: newWorkExpData.city,
			province: newWorkExpData.province,
			country: newWorkExpData.country,
			locationType: newWorkExpData.locationType,
			employmentType: newWorkExpData.employmentType,
			startMonth: newWorkExpData.startMonth,
			startYear: newWorkExpData.startYear,
			endMonth: newWorkExpData.endMonth ?? null,
			endYear: newWorkExpData.endYear ?? null,
			description: newWorkExpData.description ?? null,
		},
	});
	return updatedWorkExp;
}

export async function deleteWorkExperience(workExpId: number) {
	return await prisma.workExperience.delete({
		where: { id: workExpId },
	});
}
