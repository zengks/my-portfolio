'use client';

import { useEffect, type FormEvent } from 'react';
import type { WorkExperience } from 'types/workExpType';

export default function WorkExpModal({
	isOpen,
	closeModal,
	username,
	selectedWorkExp,
}: {
	isOpen: boolean;
	closeModal: () => void;
	username: string;
	selectedWorkExp: WorkExperience | null;
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

		const isEditing = !!selectedWorkExp;
		const method = isEditing ? 'PUT' : 'POST';

		const payload = {
			id: selectedWorkExp?.id,
			jobTitle: formData.get('jobTitle'),
			company: formData.get('company'),
			startYear: Number(formData.get('startYear')),
			endYear: Number(formData.get('endYear')),
		};

		try {
			const response = await fetch(`/api/users/${username}/work`, {
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
						<label htmlFor="jobTitle">Job Title: </label>
						<input
							type="text"
							id="jobTitle"
							name="jobTitle"
							defaultValue={selectedWorkExp?.jobTitle}
							required
						/>
					</div>
					<div>
						<label htmlFor="company">Company: </label>
						<input
							type="text"
							id="company"
							name="company"
							defaultValue={selectedWorkExp?.company}
							required
						/>
					</div>

					<div>
						<label htmlFor="startYear">Start Year: </label>
						<input
							type="number"
							id="startYear"
							name="startYear"
							defaultValue={selectedWorkExp?.startYear}
							required
						/>
					</div>
					<div>
						<label htmlFor="endYear">End Year: </label>
						<input
							type="number"
							id="endYear"
							name="endYear"
							defaultValue={selectedWorkExp?.endYear ?? ''}
						/>
					</div>
					<button type="submit">{selectedWorkExp ? 'Update' : 'Add'}</button>
					<button type="button" onClick={closeModal}>
						Cancel
					</button>
				</form>
			</div>
		</section>
	);
}
