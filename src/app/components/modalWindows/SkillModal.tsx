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
			subCategoryName: formData.get('subCategoryName'),
			skills: techStackArray,
			description: formData.get('description'),
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
		<section className="modal-container">
			<div className="modal-window">
				<div className="modal-header">
					<p className="modal-header-title">Edit Skill</p>
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
								<label htmlFor="categoryName" className="modal-label-text">
									Category Name <span className="text-red-500">*</span>
								</label>
								<input
									type="text"
									id="categoryName"
									name="categoryName"
									className="modal-input"
									defaultValue={selectedSkill?.categoryName ?? ''}
									required
								/>
							</div>
							<div>
								<label htmlFor="subCategoryName" className="modal-label-text">
									Sub-Category Name <span className="text-red-500">*</span>
								</label>
								<input
									type="text"
									id="subCategoryName"
									name="subCategoryName"
									className="modal-input"
									defaultValue={selectedSkill?.subCategoryName ?? ''}
									required
								/>
							</div>
						</div>
						<div>
							<label htmlFor="skills" className="modal-label-text">
								Skills <span className="text-red-500">*</span>
							</label>
							<input
								type="text"
								id="skills"
								name="skills"
								className="modal-input"
								placeholder="reactjs, tailwindcss, css..."
								defaultValue={selectedSkill?.skills}
								required
							/>
						</div>

						<div>
							<label htmlFor="description" className="modal-label-text">
								Description
							</label>
							<textarea
								id="description"
								name="description"
								rows={3}
								className="modal-input"
								placeholder="reactjs, tailwindcss, css..."
								defaultValue={selectedSkill?.description ?? ''}
							/>
						</div>
					</div>

					<div className="modal-footer">
						<button type="button" onClick={closeModal} className="modal-secondary-btn">
							Cancel
						</button>
						<button type="submit" className="modal-primary-btn">
							{selectedSkill ? 'Update' : 'Add'}
						</button>
					</div>
				</form>
			</div>
		</section>
	);
}
