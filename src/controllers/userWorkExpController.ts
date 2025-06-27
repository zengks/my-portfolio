import prisma from "@/lib/prisma";
import { WorkExperience } from "types/workExp";
import { apiPaths } from "@/lib/apiPaths";

export async function getUserWorkExp(userId: string) {
  return await prisma.workExperience.findMany({ where: { userId } });
}

async function updateOneWorkExp(
  workExpId: number,
  workExpData: WorkExperience
) {
  return await prisma.workExperience.update({
    where: { id: workExpId },
    data: workExpData,
  });
}

export async function updateUserWorkExp(newWorkExpData: WorkExperience[]) {
  if (newWorkExpData.length === 0) {
    throw new Error("No new work experience data provided for update.");
  }

  const updatedWorkExperience = await Promise.all(
    newWorkExpData.map((each) => updateOneWorkExp(each.id, each))
  );

  return updatedWorkExperience;
}

// client-side api call
export async function fetchAllUserWorkExperience(): Promise<
  WorkExperience[] | undefined
> {
  try {
    const res = await fetch(apiPaths.userWorkExperience());
    const data = await res.json();
    return data.workExperience;
  } catch (error) {
    console.error("Error fetching user work experience, ", error);
    return undefined;
  }
}
