import prisma from "src/lib/prisma";
import { hashPassword } from "src/lib/hash";
import { UserUpdateInput, User } from "types/user";
import { apiPaths } from "@/lib/apiPaths";

export async function getAllUsers() {
  return await prisma.user.findMany();
}

export async function getUserByUsername(username: string) {
  return await prisma.user.findUnique({
    where: { username },
    include: {
      blogPost: true,
      certificate: true,
      education: true,
      profile: true,
      project: true,
      socialMedia: true,
      workExperience: true,
    },
  });
}

export async function createUser(
  username: string,
  password: string,
  role?: string
) {
  return await prisma.user.create({
    data: {
      username,
      password: await hashPassword(password),
      role,
    },
  });
}

export async function checkUserExists(username: string) {
  const user = await prisma.user.findUnique({
    where: { username },
  });

  return user === null ? false : true;
}

export async function updateUser(
  username: string,
  newUserData: UserUpdateInput
) {
  if (newUserData.password) {
    newUserData.password = await hashPassword(newUserData.password);
  }
  return await prisma.user.update({
    where: { username },
    data: newUserData,
  });
}

export async function deleteUser(username: string) {
  return await prisma.user.delete({
    where: { username },
  });
}

// client-side api call
export async function fetchUserByUsername(
  username: string
): Promise<User | undefined> {
  try {
    if (username) {
      const res = await fetch(apiPaths.userData(username));
      const data = await res.json();
      return data.user;
    }
  } catch (error) {
    console.error("Error fetching user data: ", error);
    return undefined;
  }
}
