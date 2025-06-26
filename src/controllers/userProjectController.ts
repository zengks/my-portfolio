import prisma from "src/lib/prisma";
import { Project } from "types/project";

export async function getUserProject(userId: string) {
  return await prisma.project.findMany({
    where: {
      userId,
    },
  });
}

export async function updateUserProject(
  projectId: number,
  userId: string,
  newProjectData: Project
) {
  return await prisma.project.update({
    where: {
      id: projectId,
      userId: userId,
    },
    data: newProjectData,
  });
}
