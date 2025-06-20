import { createContext, useState, ReactNode } from "react";
import prisma from "../lib/prisma";

type UserContextType = {
  users: User[];
  getAllUsers: () => Promise<void>;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export function UserProvider({ children }: { children: ReactNode }) {}
