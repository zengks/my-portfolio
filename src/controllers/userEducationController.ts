import prisma from "@/lib/prisma";
import { Education } from "types/educationType";
import { apiPaths } from "@/lib/apiPaths";
import { getUserIdByUsername } from "./userController";

export async function getAllUserEducation(username: string = "zengks") {
  const user = await getUserIdByUsername(username);
  if (!user) return null;

  return await prisma.education.findMany({
    where: { userId: user.id },
    select: {
      id: true,
      school: true,
      degree: true,
      fieldOfStudy: true,
      startDate: true,
      endDate: true,
      gpa: true,
      description: true,
    },
    orderBy: { startDate: "desc" }, // Most recent first
  });
}

async function updateOneEducation(
  educationId: number,
  educationData: Education
) {
  return await prisma.education.update({
    where: { id: educationId },
    data: educationData,
  });
}

export async function updateUserEducation(newEducationData: Education[]) {
  if (newEducationData.length === 0) {
    throw new Error("No education data provided for update");
  }
  const updatedEducation = await Promise.all(
    newEducationData.map((each) => updateOneEducation(each.id, each))
  );

  return updatedEducation;
}

// client-side api call
export async function fetchAllUserEducation(): Promise<
  Education[] | undefined
> {
  try {
    const res = await fetch(apiPaths.userEducation());
    const data = await res.json();
    return data.education;
  } catch (error) {
    console.error("Error fetching user education data, ", error);
    return undefined;
  }
}
