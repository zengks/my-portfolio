import prisma from 'src/lib/prisma';
import { Project } from 'types/projectType';
import { apiPaths } from '@/lib/apiPaths';
import { getUserIdByUsername } from './userController';

export async function getUserProjectByUsername(username: string = 'zengks') {
	const user = await getUserIdByUsername(username);
	if (!user) return null;
	return await prisma.project.findMany({
		where: { userId: user.id },
		select: {
			id: true,
			title: true,
			repo_link: true,
			project_link: true,
			description: true,
			preview_image_link: true,
			tech_stack: true,
		},
	});
}

export async function getUserProject(userId: string) {
	return await prisma.project.findMany({
		where: {
			userId,
		},
	});
}

async function updateOneProject(projectId: number, projectData: Project) {
	return await prisma.project.update({
		where: {
			id: projectId,
		},
		data: projectData,
	});
}

export async function updateUserProject(newProjectData: Project[]) {
	if (newProjectData.length === 0) {
		throw new Error('No project data provided for update');
	}

	const updatedProjects = await Promise.all(
		newProjectData.map((project) => updateOneProject(project.id, project))
	);

	return updatedProjects;
}

// client-side api call
export async function fetchAllUserProjects(): Promise<Project[] | undefined> {
	try {
		const res = await fetch(apiPaths.userProjects());
		const data = await res.json();
		return data.projects;
	} catch (error) {
		console.error('Error fetching user projects, ', error);
		return undefined;
	}
}
