import prisma from '@/lib/prisma';
import { WorkExperience } from 'types/workExpType';
import { apiPaths } from '@/lib/apiPaths';
import { getUserIdByUsername } from './userController';

export async function getUserWorkExpByUsername(username: string = 'zengks') {
	const user = await getUserIdByUsername(username);
	if (!user) return null;
	return await prisma.workExperience.findMany({
		where: { userId: user.id },
		select: {
			id: true,
			jobTitle: true,
			company: true,
			startYear: true,
			endYear: true,
			description: true,
		},
	});
}

export async function getUserWorkExp(userId: string) {
	return await prisma.workExperience.findMany({
		where: { userId },
		select: {
			id: true,
			jobTitle: true,
			company: true,
			startYear: true,
			endYear: true,
			description: true,
		},
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
			startYear: workExpData.startYear,
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
			startYear: newWorkExpData.startYear,
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

// client-side api call
export async function fetchAllUserWorkExperience(): Promise<WorkExperience[] | undefined> {
	try {
		const res = await fetch(apiPaths.userWorkExperience());
		const data = await res.json();
		return data.workExperience;
	} catch (error) {
		console.error('Error fetching user work experience, ', error);
		return undefined;
	}
}
