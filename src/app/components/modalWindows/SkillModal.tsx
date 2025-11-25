'use client';

import { useEffect, type FormEvent } from 'react';
import type { Skill } from 'types/skillType';
export default function SkillModal({
	isOpen,
	closeModal,
	username,
	selectedSkill,
}: {
	isOpen: boolean;
	closeModal: () => void;
	username: string;
	selectedSkill: Skill | null;
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

		const isEditing = !!selectedSkill;
		const method = isEditing ? 'PUT' : 'POST';

		const rawTechStack = formData.get('skills') as string;
		const techStackArray = rawTechStack
			? rawTechStack
					.split(',')
					.map((item) => item.trim())
					.filter((item) => item.length > 0)
			: [];

		const payload = {
			id: selectedSkill?.id,
			categoryName: formData.get('categoryName'),
			skills: techStackArray,
		};

		try {
			const response = await fetch(`/api/users/${username}/skill`, {
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
						<label htmlFor="categoryName">Category Name: </label>
						<input
							type="text"
							id="categoryName"
							name="categoryName"
							defaultValue={selectedSkill?.categoryName}
							required
						/>
					</div>
					<div>
						<label htmlFor="skills">Skills: </label>
						<input
							type="text"
							id="skills"
							name="skills"
							placeholder="reactjs, tailwindcss, css..."
							defaultValue={selectedSkill?.skills}
							required
						/>
					</div>

					<button type="submit">{selectedSkill ? 'Update' : 'Add'}</button>
					<button type="button" onClick={closeModal}>
						Cancel
					</button>
				</form>
			</div>
		</section>
	);
}
