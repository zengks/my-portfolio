'use client';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

const INPUT_STYLE =
	'block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6';
const LABEL_STYLE = 'block text-sm font-medium leading-6 text-gray-900';
const BUTTON_STYLE =
	'flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors';

export default function RegisterPage() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [firstName, setFirstName] = useState('');

	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		setError(null);
		setSuccess(null);
		setIsLoading(true);

		if (!username || !password || !email || !firstName) {
			setError('Please fill in all required fields.');
			setIsLoading(false);
			return;
		}

		try {
			const response = await fetch('/api/users/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username,
					password,
					email,
					firstName,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				setError(data.message || 'Registration failed.');
			} else {
				setSuccess('Account created successfully! Redirecting...');
				setUsername('');
				setPassword('');
				setEmail('');
				setFirstName('');

				setTimeout(() => {
					router.push('/users/login');
				}, 2000);
			}
		} catch (err) {
			setError('An unexpected error occurred. Please try again.');
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex flex-1 flex-col justify-center lg:px-8 bg-gray-50">
			<h2 className="text-center text-2xl font-bold leading-9 tracking-wide text-gray-900">
				Create an account
			</h2>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<div className="bg-white px-6 py-8 shadow-lg rounded-xl border border-gray-100 sm:px-10">
					<form className="space-y-4" onSubmit={handleSubmit}>
						<div>
							<label htmlFor="username" className={LABEL_STYLE}>
								Username <span className="text-red-500">*</span>
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
							<label htmlFor="password" className={LABEL_STYLE}>
								Password <span className="text-red-500">*</span>
							</label>
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

						<div>
							<label htmlFor="firstName" className={LABEL_STYLE}>
								First Name <span className="text-red-500">*</span>
							</label>
							<div className="mt-2">
								<input
									id="firstName"
									name="firstName"
									type="text"
									required
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
									className={INPUT_STYLE}
								/>
							</div>
						</div>

						<div>
							<label htmlFor="email" className={LABEL_STYLE}>
								Email address <span className="text-red-500">*</span>
							</label>
							<div className="mt-2">
								<input
									id="email"
									name="email"
									type="email"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
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
									<div className="ml-3">
										<h3 className="text-sm font-medium text-red-800">Registration Error</h3>
										<div className="mt-2 text-sm text-red-700">
											<p>{error}</p>
										</div>
									</div>
								</div>
							</div>
						)}

						{success && (
							<div className="rounded-md bg-green-50 p-4 border border-green-200">
								<div className="flex">
									<div className="shrink-0">
										<svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
											<path
												fillRule="evenodd"
												d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
												clipRule="evenodd"
											/>
										</svg>
									</div>
									<div className="ml-3">
										<h3 className="text-sm font-medium text-green-800">Success!</h3>
										<div className="mt-2 text-sm text-green-700">
											<p>{success}</p>
										</div>
									</div>
								</div>
							</div>
						)}

						<div>
							<button
								type="submit"
								disabled={isLoading}
								className={`${BUTTON_STYLE} ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
							>
								{isLoading ? 'Creating account...' : 'Register'}
							</button>
						</div>
					</form>

					<p className="mt-10 text-center text-sm text-gray-500">
						Already have an account?{' '}
						<a
							href="/users/login"
							className="font-semibold ms-1 leading-6 text-indigo-600 hover:text-indigo-500 transition-colors"
						>
							Log In
						</a>
					</p>
				</div>
			</div>
		</div>
	);
}
