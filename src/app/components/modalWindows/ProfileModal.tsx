'use client';

import { useEffect, type FormEvent } from 'react';
import type { Profile } from 'types/profileType';

export default function ProfileModal({
	isOpen,
	closeModal,
	username,
	selectedProfile,
}: {
	isOpen: boolean;
	closeModal: () => void;
	username: string;
	selectedProfile: Profile | null;
}) {
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') closeModal();
		};

		if (isOpen) {
			document.addEventListener('keydown', handleEscape);
			document.body.style.overflow = 'hidden';
		}

		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.body.style.overflow = 'unset';
		};
	}, [isOpen, closeModal]);

	if (!isOpen) return null;

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const formData = new FormData(e.currentTarget);
			const response = await fetch(`/api/users/${username}/profile`, {
				method: 'PUT',
				body: formData,
			});

			if (!response.ok) {
				throw new Error('Operation Failed!');
			}

			closeModal();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<section className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/60 backdrop-blur-sm transition-opacity duration-300">
			<div
				className={`
          bg-white rounded-xl shadow-2xl w-[600px]
          transform transition-all duration-300 scale-100 opacity-100
          flex flex-col max-h-[90vh]
        `}
			>
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor="firstName">First Name: </label>
						<input
							type="text"
							id="firstName"
							name="firstName"
							defaultValue={selectedProfile?.firstName}
							required
						/>
					</div>
					<div>
						<label htmlFor="lastName">Last Name: </label>
						<input
							type="text"
							id="lastName"
							name="lastName"
							defaultValue={selectedProfile?.lastName ?? ''}
						/>
					</div>

					<div>
						<label htmlFor="email">Email: </label>
						<input
							type="email"
							id="email"
							name="email"
							defaultValue={selectedProfile?.email}
							required
						/>
					</div>
					<div>
						<label htmlFor="jobTitle">Job Title: </label>
						<input
							type="text"
							id="jobTitle"
							name="jobTitle"
							defaultValue={selectedProfile?.jobTitle ?? ''}
						/>
					</div>
					<div>
						<label htmlFor="city">City: </label>
						<input type="text" id="city" name="city" defaultValue={selectedProfile?.city ?? ''} />
					</div>
					<div>
						<label htmlFor="province">Province: </label>
						<input
							type="text"
							id="province"
							name="province"
							defaultValue={selectedProfile?.province ?? ''}
						/>
					</div>
					<div>
						<label htmlFor="country">Country: </label>
						<input
							type="text"
							id="country"
							name="country"
							defaultValue={selectedProfile?.country ?? ''}
						/>
					</div>
					<div>
						<label htmlFor="linkedInUrl">LinkedIn Link: </label>
						<input
							type="text"
							id="linkedInUrl"
							name="linkedInUrl"
							defaultValue={selectedProfile?.linkedInUrl ?? ''}
						/>
					</div>
					<div>
						<label htmlFor="githubUrl">GitHub Link: </label>
						<input
							type="text"
							id="githubUrl"
							name="githubUrl"
							defaultValue={selectedProfile?.githubUrl ?? ''}
						/>
					</div>
					<div className="flex fle-col">
						<label htmlFor="bio">Bio: </label>
						<textarea
							id="bio"
							name="bio"
							rows={3}
							defaultValue={selectedProfile?.bioLink ?? ''}
						></textarea>
					</div>
					<div>
						<label htmlFor="resume">Resume (PDF): </label>
						<input type="file" accept=".pdf" id="resume" name="resume" />
					</div>
					{selectedProfile?.resumeUrl && <p>{`Existing Resume: ${selectedProfile?.resumeUrl}`}</p>}
					<button type="submit">Save</button>
					<button type="button" onClick={closeModal}>
						Cancel
					</button>
				</form>
			</div>
		</section>
	);
}
