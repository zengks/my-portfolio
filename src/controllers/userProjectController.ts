import prisma from 'src/lib/prisma';
import type { Project } from 'types/projectType';
import { revalidatePath } from 'next/cache';

export async function getUserProject(username: string) {
	return await prisma.project.findMany({
		where: { username },
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

	revalidatePath('/');
	revalidatePath('/projects');

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

	revalidatePath('/');
	revalidatePath('/projects');

	return updatedProject;
}

export async function deleteUserProject(projectId: number) {
	const result = await prisma.project.delete({
		where: { id: projectId },
	});

	revalidatePath('/');
	revalidatePath('/projects');

	return result;
}
