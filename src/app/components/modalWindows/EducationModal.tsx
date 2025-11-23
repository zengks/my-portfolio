'use client';

import { useEffect, type FormEvent } from 'react';
import type { Education } from 'types/educationType';

export default function EducationModal({
	isOpen,
	closeModal,
	username,
	selectedEducation,
}: {
	isOpen: boolean;
	closeModal: () => void;
	username: string;
	selectedEducation: Education | null;
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
		const formData = new FormData(e.currentTarget);

		const isEditing = !!selectedEducation;
		const method = isEditing ? 'PUT' : 'POST';

		const payload = {
			id: selectedEducation?.id,
			school: formData.get('school'),
			degree: formData.get('degree'),
			fieldOfStudy: formData.get('fieldOfStudy'),
			startYear: Number(formData.get('startYear')),
			endYear: Number(formData.get('endYear')),
		};

		console.log('payload year: ', typeof payload.startYear, typeof payload.endYear);

		try {
			const response = await fetch(`/api/auth/users/${username}/education`, {
				method: method,
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
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
						<label htmlFor="school">School: </label>
						<input
							type="text"
							id="school"
							name="school"
							defaultValue={selectedEducation?.school}
							required
						/>
					</div>
					<div>
						<label htmlFor="degree">Degree: </label>
						<input
							type="text"
							id="degree"
							name="degree"
							defaultValue={selectedEducation?.degree}
							required
						/>
					</div>
					<div>
						<label htmlFor="fieldOfStudy">Field of Study: </label>
						<input
							type="text"
							id="fieldOfStudy"
							name="fieldOfStudy"
							defaultValue={selectedEducation?.fieldOfStudy ?? ''}
							required
						/>
					</div>
					<div>
						<label htmlFor="startYear">Start Year: </label>
						<input
							type="number"
							id="startYear"
							name="startYear"
							defaultValue={selectedEducation?.startYear}
							required
						/>
					</div>
					<div>
						<label htmlFor="endYear">End Year: </label>
						<input
							type="number"
							id="endYear"
							name="endYear"
							defaultValue={selectedEducation?.endYear ?? ''}
							required
						/>
					</div>
					<button type="submit">{selectedEducation ? 'Update' : 'Add'}</button>
					<button type="button" onClick={closeModal}>
						Cancel
					</button>
				</form>
			</div>
		</section>
	);
}
