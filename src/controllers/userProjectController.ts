import prisma from "src/lib/prisma";
import { Project } from "types/project";

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
    throw new Error("No project data provided for update");
  }

  const updatedProjects = await Promise.all(
    newProjectData.map((project) => updateOneProject(project.id, project))
  );

  return updatedProjects;
}
