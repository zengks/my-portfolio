"use client";
import { signIn, signOut } from "next-auth/react";
import type { SignInOptions } from "next-auth/react";

export async function SignInButton(
  provider: string,
  signInOptions: SignInOptions
) {
  return await signIn(provider, signInOptions);
}

export function SignOutButton() {
  return (
    <button onClick={() => signOut({ callbackUrl: "/" })}>Sign Out</button>
  );
}
