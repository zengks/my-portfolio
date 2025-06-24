import prisma from "lib/prisma";
import { getUserByUsername } from "./userController";

export async function getUserProfile(username: string) {
  try {
    const user = await getUserByUsername(username);
    if (!user) {
      throw new Error("User not found");
    } else {
      console.log("User found:", user);
    }
    const profile = await prisma.profile.findUnique({
      where: {
        userId: user.id,
      },
    });
    if (!profile) {
      throw new Error("Profile not found");
    }
    return profile;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
}
