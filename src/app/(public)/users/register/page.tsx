'use client';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);
	const router = useRouter();

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		setError(null); // Clear previous errors
		setSuccess(null);

		// Basic client-side validation
		if (!username || !password) {
			setError('Username and password are required.');
			return;
		}

		try {
			const response = await fetch('/api/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username: username,
					password: password,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				// If API returns an error message, display it
				setError(data.message || 'Registration failed.');
			} else {
				// Handle successful registration
				setSuccess(data.message);
				// Clear form
				setUsername('');
				setPassword('');
				// Optional: redirect to login after a delay
				setTimeout(() => {
					router.push('/login'); // Redirect to your login page
				}, 2000); // 2-second delay
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
					<button type="submit">Register</button>
				</div>

				{/* Error Message */}
				{error && <div className="p-3 mt-4 rounded bg-red-100 text-red-500 w-100">{error}</div>}

				{/* Success Message */}
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
