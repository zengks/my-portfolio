'use client';

import { useState, FormEvent, useEffect } from 'react';
import { SignInButton } from '@/app/components/UI/AuthButtons';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const INPUT_STYLE =
	'block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6';
const LABEL_STYLE = 'block text-sm font-medium leading-6 text-gray-900';
const BUTTON_STYLE =
	'flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors';

type AuthErrorMessages = {
	CredentialsSignin: string;
	AccessDenied: string;
	Configuration: string;
};

export default function LoginPage() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const router = useRouter();
	const { status, data: session } = useSession();
	const currentUsername = session?.user?.username;

	useEffect(() => {
		if (status === 'authenticated' && currentUsername) {
			router.replace(`/${currentUsername}/dashboard`);
		}
	}, [router, status, currentUsername]);

	const errorMessages: AuthErrorMessages = {
		CredentialsSignin: 'Invalid username or password.',
		AccessDenied: 'Access Denied.',
		Configuration: 'Server Configuration Error.',
	};

	const handleLogin = async (event: FormEvent) => {
		event.preventDefault();
		setError('');

		const result = await SignInButton('credentials', {
			redirect: false,
			username,
			password,
		});

		if (result?.error) {
			setError(result.error);
		} else if (result?.ok) {
			router.refresh();
		}
	};

	if (status === 'authenticated') {
		return (
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<p className="text-center text-gray-500">Redirecting to dashboard...</p>
			</div>
		);
	}

	return (
		<div className="section-container section-card border flex flex-1 flex-col justify-center bg-gray-50">
			<h2 className="text-center text-2xl font-bold tracking-wide text-gray-900">
				Sign in to your account
			</h2>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<div className="bg-white px-6 py-8 shadow-lg rounded-xl border border-gray-100 sm:px-10">
					<form className="space-y-6" onSubmit={handleLogin}>
						<div>
							<label htmlFor="username" className={LABEL_STYLE}>
								Username
							</label>
							<div className="mt-2">
								<input
									id="username"
									name="username"
									type="text"
									required
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									className={INPUT_STYLE}
								/>
							</div>
						</div>

						<div>
							<div className="flex items-center justify-between">
								<label htmlFor="password" className={LABEL_STYLE}>
									Password
								</label>
							</div>
							<div className="mt-2">
								<input
									id="password"
									name="password"
									type="password"
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className={INPUT_STYLE}
								/>
							</div>
						</div>

						{error && (
							<div className="rounded-md bg-red-50 p-4 border border-red-200">
								<div className="flex">
									<div className="shrink-0">
										<svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
											<path
												fillRule="evenodd"
												d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
												clipRule="evenodd"
											/>
										</svg>
									</div>
									<div className="ms-3">
										<h3 className="text-sm font-medium text-red-800">Login Failed</h3>
										<div className="mt-2 text-sm text-red-700">
											<p>
												{errorMessages[error as keyof typeof errorMessages] ??
													'An unknown error occurred.'}
											</p>
										</div>
									</div>
								</div>
							</div>
						)}

						<div>
							<button type="submit" className={BUTTON_STYLE}>
								{status === 'loading' ? 'Signing in...' : 'Log In'}
							</button>
						</div>
					</form>

					<p className="mt-10 text-center text-sm text-gray-500">
						Not a member?{' '}
						<a
							href="/users/register"
							className="ms-1 font-semibold leading-6 text-indigo-600 hover:text-indigo-500 transition-colors"
						>
							Register Now
						</a>
					</p>
				</div>
			</div>
		</div>
	);
}
