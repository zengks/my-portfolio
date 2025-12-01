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
		<section className="modal-container">
			<div className="modal-window">
				<div className="modal-header">
					<h2 className="text-xl font-bold text-gray-800">Edit Profile</h2>
					<button
						onClick={closeModal}
						className="text-gray-400 hover:text-gray-600 transition-colors"
					>
						<span className="sr-only">Close</span>
						<svg
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
						>
							<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				<form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
					<div className="p-6 overflow-y-auto space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label htmlFor="firstName" className="modal-label-text">
									First Name <span className="text-red-500">*</span>
								</label>
								<input
									type="text"
									id="firstName"
									name="firstName"
									className="modal-input"
									defaultValue={selectedProfile?.firstName}
									required
								/>
							</div>
							<div>
								<label htmlFor="lastName" className="modal-label-text">
									Last Name
								</label>
								<input
									type="text"
									id="lastName"
									name="lastName"
									className="modal-input"
									defaultValue={selectedProfile?.lastName ?? ''}
								/>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label htmlFor="email" className="modal-label-text">
									Email <span className="text-red-500">*</span>
								</label>
								<input
									type="email"
									id="email"
									name="email"
									className="modal-input"
									defaultValue={selectedProfile?.email}
									required
								/>
							</div>
							<div>
								<label htmlFor="jobTitle" className="modal-label-text">
									Job Title
								</label>
								<input
									type="text"
									id="jobTitle"
									name="jobTitle"
									className="modal-input"
									defaultValue={selectedProfile?.jobTitle ?? ''}
								/>
							</div>
						</div>

						<div>
							<label className="modal-label-text mb-2">Location</label>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								<div>
									<input
										type="text"
										id="city"
										name="city"
										placeholder="City"
										className="modal-input"
										defaultValue={selectedProfile?.city ?? ''}
									/>
								</div>
								<div>
									<input
										type="text"
										id="province"
										name="province"
										placeholder="Province"
										className="modal-input"
										defaultValue={selectedProfile?.province ?? ''}
									/>
								</div>
								<div>
									<input
										type="text"
										id="country"
										name="country"
										placeholder="Country"
										className="modal-input"
										defaultValue={selectedProfile?.country ?? ''}
									/>
								</div>
							</div>
						</div>

						<div className="grid grid-cols-1 gap-4">
							<div>
								<label htmlFor="linkedInUrl" className="modal-label-text">
									LinkedIn URL
								</label>
								<input
									type="text"
									id="linkedInUrl"
									name="linkedInUrl"
									className="modal-input"
									defaultValue={selectedProfile?.linkedInUrl ?? ''}
								/>
							</div>
							<div>
								<label htmlFor="githubUrl" className="modal-label-text">
									GitHub URL
								</label>
								<input
									type="text"
									id="githubUrl"
									name="githubUrl"
									className="modal-input"
									defaultValue={selectedProfile?.githubUrl ?? ''}
								/>
							</div>
						</div>

						<div>
							<label htmlFor="bio" className="modal-label-text">
								Bio
							</label>
							<textarea
								id="bio"
								name="bio"
								rows={3}
								className="modal-input"
								defaultValue={selectedProfile?.bioLink ?? ''}
							></textarea>
						</div>

						<div className="rounded-lg border border-dashed border-gray-300 p-4 bg-gray-50">
							<label htmlFor="resume" className="modal-label-text">
								Resume (PDF)
							</label>
							<input
								type="file"
								accept=".pdf"
								id="resume"
								name="resume"
								className="block w-full text-sm text-slate-500
								  file:mr-4 file:py-2 file:px-4
								  file:rounded-md file:border-0
								  file:text-sm file:font-semibold
								  file:bg-indigo-50 file:text-indigo-700
								  hover:file:bg-indigo-100
								  cursor-pointer
								"
							/>
							{selectedProfile?.resumeUrl && (
								<p className="mt-2 text-xs text-gray-500 flex items-center gap-1">
									<svg
										xmlns="http://www.w3.0.0.svg"
										viewBox="0 0 20 20"
										fill="currentColor"
										className="w-4 h-4 text-green-600"
									>
										<path
											fillRule="evenodd"
											d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
											clipRule="evenodd"
										/>
									</svg>
									Current:{' '}
									<a
										href={selectedProfile.resumeUrl}
										target="_blank"
										className="underline hover:text-indigo-600"
									>
										View current resume
									</a>
								</p>
							)}
						</div>
					</div>

					<div className="modal-footer">
						<button type="button" onClick={closeModal} className="modal-secondary-btn">
							Cancel
						</button>
						<button type="submit" className="modal-primary-btn">
							Save Changes
						</button>
					</div>
				</form>
			</div>
		</section>
	);
}
