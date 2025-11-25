'use client';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [firstName, setFirstName] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);
	const router = useRouter();

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		setError(null); // Clear previous errors
		setSuccess(null);

		// Basic client-side validation
		if (!username || !password || !email || !firstName) {
			setError('missing required fields.');
			return;
		}

		try {
			const response = await fetch('/api/users/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username: username,
					password: password,
					email: email,
					firstName: firstName,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				setError(data.message || 'Registration failed.');
			} else {
				setSuccess(data.message);
				setUsername('');
				setPassword('');
				setTimeout(() => {
					router.push('/users/login');
				}, 2000);
			}
		} catch (err) {
			setError('An unexpected error occurred. Please try again.');
			console.error(err);
		}
	};

	return (
		<section className="section-container section-card">
			<form onSubmit={handleSubmit}>
				<p className="text-3xl font-semibold text-center py-8">Register</p>
				<div>
					<label htmlFor="username">Username</label>
					<input
						type="text"
						name="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<div>
					<label htmlFor="firstName">First Name</label>
					<input
						type="text"
						name="firstName"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
					/>
				</div>
				<div>
					<label htmlFor="email">Email</label>
					<input
						type="email"
						name="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div>
					<button type="submit">Register</button>
				</div>

				{error && <div className="p-3 mt-4 rounded bg-red-100 text-red-500 w-100">{error}</div>}

				{success && (
					<div className="p-3 mt-4 rounded bg-green-100 text-green-600 w-100">
						{success} Redirecting to login...
					</div>
				)}

				<div>
					<a href="/users/login">Already have an account? Log In</a>
				</div>
			</form>
		</section>
	);
}
