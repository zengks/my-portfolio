import prisma from "@/lib/prisma";
import { apiPaths } from "@/lib/apiPaths";
import { SocialMedia } from "types/socialMedia";

export async function getAllUserSocialMedia(userId: string) {
  return await prisma.socialMedia.findMany({
    where: { userId },
  });
}

async function updateOneSocialMedia(
  socialMediaId: number,
  socialMediaData: SocialMedia
) {
  return await prisma.socialMedia.update({
    where: { id: socialMediaId },
    data: socialMediaData,
  });
}

export async function updateUserSocialMedia(newSocialMediaData: SocialMedia[]) {
  if (newSocialMediaData.length === 0)
    throw new Error("No social media provided to update.");

  const updatedSocialMedia = await Promise.all(
    newSocialMediaData.map((each) => updateOneSocialMedia(each.id, each))
  );

  return updatedSocialMedia;
}

// client-side api call
export async function fetchAllUserSocialMedia(): Promise<
  SocialMedia[] | undefined
> {
  try {
    const res = await fetch(apiPaths.userSocialMedia());
    const data = await res.json();
    return data.socialMedia;
  } catch (error) {
    console.error("Error fetching user social media, ", error);
    return undefined;
  }
}
