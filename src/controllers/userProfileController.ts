import prisma from "src/lib/prisma";
import { Profile } from "types/profile";

export async function getUserProfile(userId: string) {
  const profile = await prisma.profile.findUnique({
    where: {
      userId,
    },
  });
  return profile;
}

export async function updateUserProfile(
  userId: string,
  newProfileData: Profile
) {
  return await prisma.profile.update({
    where: {
      userId,
    },
    data: newProfileData,
  });
}
