'use client';

import { useEffect, type FormEvent } from 'react';
import type { Project } from 'types/projectType';

export default function ProjectModal({
	isOpen,
	closeModal,
	username,
	selectedProject,
}: {
	isOpen: boolean;
	closeModal: () => void;
	username: string;
	selectedProject: Project | null;
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

		const isEditing = !!selectedProject;
		const method = isEditing ? 'PUT' : 'POST';

		const rawTechStack = formData.get('tech_stack') as string;
		const techStackArray = rawTechStack
			? rawTechStack
					.split(',')
					.map((item) => item.trim())
					.filter((item) => item.length > 0)
			: [];

		const payload = {
			id: selectedProject?.id,
			title: formData.get('title'),
			repo_link: formData.get('repo_link'),
			project_link: formData.get('project_link'),
			preview_image_link: formData.get('preview_image_link'),
			tech_stack: techStackArray,
			description: formData.get('description'),
			projectYear: Number(formData.get('projectYear')),
		};

		try {
			const response = await fetch(`/api/users/${username}/project`, {
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
					<p className="modal-header-title">Edit Project</p>
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
								<label htmlFor="title" className="modal-label-text">
									Title <span className="text-red-500">*</span>
								</label>
								<input
									type="text"
									id="title"
									name="title"
									className="modal-input"
									defaultValue={selectedProject?.title}
									required
								/>
							</div>
							<div>
								<label htmlFor="projectYear" className="modal-label-text">
									Project Year <span className="text-red-500">*</span>
								</label>
								<input
									type="number"
									id="projectYear"
									name="projectYear"
									className="modal-input"
									defaultValue={selectedProject?.projectYear}
									required
								/>
							</div>
						</div>

						<div>
							<label htmlFor="tech_stack" className="modal-label-text">
								Tech Stack <span className="text-red-500">*</span>
							</label>
							<input
								type="text"
								id="tech_stack"
								name="tech_stack"
								className="modal-input"
								defaultValue={selectedProject?.tech_stack.join(', ')}
								placeholder="React, TypeScript, Prisma..."
								required
							/>
						</div>

						<div>
							<label htmlFor="repo_link" className="modal-label-text">
								Repo Link:{' '}
							</label>
							<input
								type="text"
								id="repo_link"
								name="repo_link"
								className="modal-input"
								defaultValue={selectedProject?.repo_link ?? ''}
							/>
						</div>

						<div>
							<label htmlFor="project_link" className="modal-label-text">
								Project Link:{' '}
							</label>
							<input
								type="text"
								id="project_link"
								name="project_link"
								className="modal-input"
								defaultValue={selectedProject?.project_link ?? ''}
							/>
						</div>

						<div>
							<label htmlFor="description" className="modal-label-text">
								Description:{' '}
							</label>
							<textarea
								rows={3}
								id="description"
								name="description"
								className="modal-input"
								defaultValue={selectedProject?.description ?? ''}
							/>
						</div>

						{/* <div>
							<label htmlFor="preview_image_link">Preview Image: </label>
							<input
								type="text"
								id="preview_image_link"
								name="preview_image_link"
								defaultValue={selectedProject?.preview_image_link ?? ''}
							/>
						</div> */}
					</div>
					<div className="modal-footer">
						<button type="button" onClick={closeModal} className="modal-secondary-btn">
							Cancel
						</button>
						<button type="submit" className="modal-primary-btn">
							{selectedProject ? 'Update' : 'Add'}
						</button>
					</div>
				</form>
			</div>
		</section>
	);
}
