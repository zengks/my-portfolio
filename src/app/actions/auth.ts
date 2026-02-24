'use server';

import { signIn } from '@/lib/auth';
import { AuthError } from 'next-auth';

export async function loginAction(formData: FormData) {
	const username = formData.get('username') as string;
	const password = formData.get('password') as string;

	try {
		await signIn('credentials', {
			username,
			password,
			redirectTo: `/${username}/dashboard`,
		});
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return { error: 'CredentialsSignin' };
				default:
					return { error: 'Configuration' };
			}
		}
		throw error;
	}
}
