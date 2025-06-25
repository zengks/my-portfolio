import prisma from "src/lib/prisma";
import { hashPassword } from "src/lib/hash";

export async function getAllUsers() {
  return await prisma.user.findMany();
}

export async function getUserByUsername(username: string) {
  return await prisma.user.findUnique({
    where: { username },
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

export async function updateUser(username: string, newUserData: User) {
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
