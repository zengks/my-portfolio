'use client';

import { useState } from 'react';

export default function ContactForm() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');

	const [isLoading, setIsLoading] = useState(false);
	const [statusMessage, setStatusMessage] = useState<string | null>(null);
	const [isError, setIsError] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		setStatusMessage(null);
		setIsError(false);

		const formData = {
			name,
			email,
			message,
		};

		try {
			const response = await fetch('api/email', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			const data = await response.json();

			if (response.ok) {
				setStatusMessage(data.message);
				setName('');
				setEmail('');
				setMessage('');
			} else {
				throw new Error(data.message || 'Something went wrong');
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			setIsError(true);
			setStatusMessage(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<section className="section-container p-4 md:p-8">
			<p className="text-3xl md:text-4xl font-semibold text-center py-8">Get In Touch</p>

			<form
				id="contactUsForm"
				onSubmit={handleSubmit}
				className="w-full max-w-4xl mx-auto bg-white border border-gray-200 rounded-lg shadow-sm p-6 md:p-10"
			>
				<section className="flex flex-col md:flex-row gap-8 mb-8">
					<div className="flex flex-col gap-2 w-full md:w-1/2">
						<label htmlFor="name" className="block text-sm font-medium text-gray-700">
							Name
						</label>
						<input
							type="text"
							id="name"
							name="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
							className="block w-full border-0 border-b border-gray-300 bg-transparent py-2 px-1 focus:outline-none focus:border-gray-400 focus:ring-0 sm:text-sm"
						/>
					</div>
					<div className="flex flex-col gap-2 w-full md:w-1/2">
						<label htmlFor="email" className="block text-sm font-medium text-gray-700">
							Email
						</label>
						<input
							type="email"
							id="email"
							name="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className="block w-full border-0 border-b border-gray-300 bg-transparent py-2 px-1 focus:outline-none focus:border-gray-400 focus:ring-0 sm:text-sm"
						/>
					</div>
				</section>

				<section className="flex flex-col gap-2 mt-10">
					<label htmlFor="message" className="block text-sm font-medium text-gray-700">
						Message
					</label>
					<textarea
						rows={5}
						id="message"
						name="message"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						required
						className="block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-opacity-50 sm:text-sm"
					/>
				</section>

				<section
					className={`mt-8 flex items-center ${statusMessage ? 'justify-between' : 'justify-end'}`}
				>
					{statusMessage && (
						<p className={`${isError ? 'text-red-600' : 'text-green-600'}`}>{statusMessage}</p>
					)}
					<button
						type="submit"
						className="cursor-pointer text-end py-2 px-6 rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
					>
						{isLoading ? 'Sending...' : 'Send Now'}
					</button>
				</section>
			</form>
		</section>
	);
}
