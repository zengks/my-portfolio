import prisma from "src/lib/prisma";
import { Profile } from "types/profile";

export async function getUserProfile(user: User) {
  const profile = await prisma.profile.findUnique({
    where: {
      userId: user.id,
    },
  });
  return profile;
}

export async function updateUserProfile(user: User, newProfileData: Profile) {
  return await prisma.profile.update({
    where: {
      userId: user.id,
    },
    data: newProfileData,
  });
}
