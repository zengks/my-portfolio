'use client';

import { useEffect, type FormEvent } from 'react';
import type { Profile } from 'types/profileType';

// --- SHARED STYLES ---
const LABEL_STYLE = 'block text-sm font-medium leading-6 text-gray-900 mb-1';
const INPUT_STYLE =
	'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6';
const PRIMARY_BTN_STYLE =
	'rounded-md bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors';
const SECONDARY_BTN_STYLE =
	'rounded-md bg-white px-5 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-colors';

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
		<section className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/75 backdrop-blur-sm transition-opacity duration-300">
			<div
				className="
          bg-white rounded-xl shadow-2xl w-full max-w-2xl
          transform transition-all duration-300 scale-100 opacity-100
          flex flex-col max-h-[90vh] overflow-hidden
        "
			>
				{/* Header */}
				<div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
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

				{/* Form Container - Wrapped to ensure footer buttons trigger submit */}
				<form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
					{/* Scrollable Body */}
					<div className="p-6 overflow-y-auto space-y-6">
						{/* Row 1: Names */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label htmlFor="firstName" className={LABEL_STYLE}>
									First Name <span className="text-red-500">*</span>
								</label>
								<input
									type="text"
									id="firstName"
									name="firstName"
									className={INPUT_STYLE}
									defaultValue={selectedProfile?.firstName}
									required
								/>
							</div>
							<div>
								<label htmlFor="lastName" className={LABEL_STYLE}>
									Last Name
								</label>
								<input
									type="text"
									id="lastName"
									name="lastName"
									className={INPUT_STYLE}
									defaultValue={selectedProfile?.lastName ?? ''}
								/>
							</div>
						</div>

						{/* Row 2: Professional Info */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label htmlFor="email" className={LABEL_STYLE}>
									Email <span className="text-red-500">*</span>
								</label>
								<input
									type="email"
									id="email"
									name="email"
									className={INPUT_STYLE}
									defaultValue={selectedProfile?.email}
									required
								/>
							</div>
							<div>
								<label htmlFor="jobTitle" className={LABEL_STYLE}>
									Job Title
								</label>
								<input
									type="text"
									id="jobTitle"
									name="jobTitle"
									className={INPUT_STYLE}
									defaultValue={selectedProfile?.jobTitle ?? ''}
								/>
							</div>
						</div>

						{/* Row 3: Location (3 Columns) */}
						<div>
							<label className={`${LABEL_STYLE} mb-2`}>Location</label>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								<div>
									<input
										type="text"
										id="city"
										name="city"
										placeholder="City"
										className={INPUT_STYLE}
										defaultValue={selectedProfile?.city ?? ''}
									/>
								</div>
								<div>
									<input
										type="text"
										id="province"
										name="province"
										placeholder="Province"
										className={INPUT_STYLE}
										defaultValue={selectedProfile?.province ?? ''}
									/>
								</div>
								<div>
									<input
										type="text"
										id="country"
										name="country"
										placeholder="Country"
										className={INPUT_STYLE}
										defaultValue={selectedProfile?.country ?? ''}
									/>
								</div>
							</div>
						</div>

						{/* Row 4: Social Links */}
						<div className="grid grid-cols-1 gap-4">
							<div>
								<label htmlFor="linkedInUrl" className={LABEL_STYLE}>
									LinkedIn URL
								</label>
								<input
									type="text"
									id="linkedInUrl"
									name="linkedInUrl"
									placeholder="https://linkedin.com/in/..."
									className={INPUT_STYLE}
									defaultValue={selectedProfile?.linkedInUrl ?? ''}
								/>
							</div>
							<div>
								<label htmlFor="githubUrl" className={LABEL_STYLE}>
									GitHub URL
								</label>
								<input
									type="text"
									id="githubUrl"
									name="githubUrl"
									placeholder="https://github.com/..."
									className={INPUT_STYLE}
									defaultValue={selectedProfile?.githubUrl ?? ''}
								/>
							</div>
						</div>

						{/* Row 5: Bio */}
						<div>
							<label htmlFor="bio" className={LABEL_STYLE}>
								Bio / Website Link
							</label>
							<textarea
								id="bio"
								name="bio"
								rows={3}
								className={INPUT_STYLE}
								defaultValue={selectedProfile?.bioLink ?? ''}
							></textarea>
						</div>

						{/* Row 6: Resume */}
						<div className="rounded-lg border border-dashed border-gray-300 p-4 bg-gray-50">
							<label htmlFor="resume" className={LABEL_STYLE}>
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

					{/* Sticky Footer */}
					<div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
						<button type="button" onClick={closeModal} className={SECONDARY_BTN_STYLE}>
							Cancel
						</button>
						<button type="submit" className={PRIMARY_BTN_STYLE}>
							Save Changes
						</button>
					</div>
				</form>
			</div>
		</section>
	);
}

// 'use client';

// import { useEffect, type FormEvent } from 'react';
// import type { Profile } from 'types/profileType';

// export default function ProfileModal({
// 	isOpen,
// 	closeModal,
// 	username,
// 	selectedProfile,
// }: {
// 	isOpen: boolean;
// 	closeModal: () => void;
// 	username: string;
// 	selectedProfile: Profile | null;
// }) {
// 	useEffect(() => {
// 		const handleEscape = (e: KeyboardEvent) => {
// 			if (e.key === 'Escape') closeModal();
// 		};

// 		if (isOpen) {
// 			document.addEventListener('keydown', handleEscape);
// 			document.body.style.overflow = 'hidden';
// 		}

// 		return () => {
// 			document.removeEventListener('keydown', handleEscape);
// 			document.body.style.overflow = 'unset';
// 		};
// 	}, [isOpen, closeModal]);

// 	if (!isOpen) return null;

// 	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
// 		e.preventDefault();

// 		try {
// 			const formData = new FormData(e.currentTarget);
// 			const response = await fetch(`/api/users/${username}/profile`, {
// 				method: 'PUT',
// 				body: formData,
// 			});

// 			if (!response.ok) {
// 				throw new Error('Operation Failed!');
// 			}

// 			closeModal();
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	};

// 	return (
// 		<section className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/60 backdrop-blur-sm transition-opacity duration-300">
// 			<div
// 				className={`
//           bg-white rounded-xl shadow-2xl w-[600px]
//           transform transition-all duration-300 scale-100 opacity-100
//           flex flex-col max-h-[90vh]
//         `}
// 			>
// 				<form onSubmit={handleSubmit}>
// 					<div>
// 						<label htmlFor="firstName">First Name: </label>
// 						<input
// 							type="text"
// 							id="firstName"
// 							name="firstName"
// 							defaultValue={selectedProfile?.firstName}
// 							required
// 						/>
// 					</div>
// 					<div>
// 						<label htmlFor="lastName">Last Name: </label>
// 						<input
// 							type="text"
// 							id="lastName"
// 							name="lastName"
// 							defaultValue={selectedProfile?.lastName ?? ''}
// 						/>
// 					</div>

// 					<div>
// 						<label htmlFor="email">Email: </label>
// 						<input
// 							type="email"
// 							id="email"
// 							name="email"
// 							defaultValue={selectedProfile?.email}
// 							required
// 						/>
// 					</div>
// 					<div>
// 						<label htmlFor="jobTitle">Job Title: </label>
// 						<input
// 							type="text"
// 							id="jobTitle"
// 							name="jobTitle"
// 							defaultValue={selectedProfile?.jobTitle ?? ''}
// 						/>
// 					</div>
// 					<div>
// 						<label htmlFor="city">City: </label>
// 						<input type="text" id="city" name="city" defaultValue={selectedProfile?.city ?? ''} />
// 					</div>
// 					<div>
// 						<label htmlFor="province">Province: </label>
// 						<input
// 							type="text"
// 							id="province"
// 							name="province"
// 							defaultValue={selectedProfile?.province ?? ''}
// 						/>
// 					</div>
// 					<div>
// 						<label htmlFor="country">Country: </label>
// 						<input
// 							type="text"
// 							id="country"
// 							name="country"
// 							defaultValue={selectedProfile?.country ?? ''}
// 						/>
// 					</div>
// 					<div>
// 						<label htmlFor="linkedInUrl">LinkedIn Link: </label>
// 						<input
// 							type="text"
// 							id="linkedInUrl"
// 							name="linkedInUrl"
// 							defaultValue={selectedProfile?.linkedInUrl ?? ''}
// 						/>
// 					</div>
// 					<div>
// 						<label htmlFor="githubUrl">GitHub Link: </label>
// 						<input
// 							type="text"
// 							id="githubUrl"
// 							name="githubUrl"
// 							defaultValue={selectedProfile?.githubUrl ?? ''}
// 						/>
// 					</div>
// 					<div className="flex fle-col">
// 						<label htmlFor="bio">Bio: </label>
// 						<textarea
// 							id="bio"
// 							name="bio"
// 							rows={3}
// 							defaultValue={selectedProfile?.bioLink ?? ''}
// 						></textarea>
// 					</div>
// 					<div>
// 						<label htmlFor="resume">Resume (PDF): </label>
// 						<input type="file" accept=".pdf" id="resume" name="resume" />
// 					</div>
// 					{selectedProfile?.resumeUrl && <p>{`Existing Resume: ${selectedProfile?.resumeUrl}`}</p>}
// 					<button type="submit">Save</button>
// 					<button type="button" onClick={closeModal}>
// 						Cancel
// 					</button>
// 				</form>
// 			</div>
// 		</section>
// 	);
// }
