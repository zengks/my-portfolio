import prisma from 'src/lib/prisma';
import type { Project } from 'types/projectType';
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
			projectYear: true,
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

export async function addProject(username: string, projectData: Project) {
	const user = await prisma.user.findUnique({
		where: { username },
		select: { id: true },
	});

	if (!user) throw new Error(`User @${username} not found`);

	const newProject = await prisma.project.create({
		data: {
			userId: user.id,
			username: username,
			title: projectData.title,
			repo_link: projectData.repo_link ?? null,
			project_link: projectData.project_link ?? null,
			description: projectData.description ?? null,
			preview_image_link: projectData.preview_image_link ?? null,
			tech_stack: projectData.tech_stack,
			projectYear: projectData.projectYear,
		},
	});
	return newProject;
}

export async function updateUserProject(username: string, selectedProjectData: Project) {
	const user = await prisma.user.findUnique({
		where: { username },
		select: { id: true },
	});

	if (!user) throw new Error(`User @${username} not found`);

	const updatedProject = await prisma.project.update({
		where: {
			id: selectedProjectData.id,
		},
		data: {
			title: selectedProjectData.title,
			repo_link: selectedProjectData.repo_link ?? null,
			project_link: selectedProjectData.project_link ?? null,
			description: selectedProjectData.description ?? null,
			preview_image_link: selectedProjectData.preview_image_link ?? null,
			tech_stack: selectedProjectData.tech_stack,
			projectYear: selectedProjectData.projectYear,
		},
	});

	return updatedProject;
}

export async function deleteUserProject(projectId: number) {
	return await prisma.project.delete({
		where: { id: projectId },
	});
}
