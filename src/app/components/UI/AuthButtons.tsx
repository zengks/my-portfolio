'use client';
import { signIn, signOut } from 'next-auth/react';
import type { SignInOptions } from 'next-auth/react';

export async function SignInButton(provider: string, signInOptions: SignInOptions) {
	return await signIn(provider, signInOptions);
}

export function SignOutButton() {
	return (
		<button
			className="cursor-pointer italic px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-md hover:bg-slate-200 transition-colors"
			onClick={() => signOut({ callbackUrl: '/users/login' })}
		>
			Sign Out
		</button>
	);
}
