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
						<label htmlFor="title">Title: </label>
						<input
							type="text"
							id="title"
							name="title"
							defaultValue={selectedProject?.title}
							required
						/>
					</div>
					<div>
						<label htmlFor="repo_link">Repo Link: </label>
						<input
							type="text"
							id="repo_link"
							name="repo_link"
							defaultValue={selectedProject?.repo_link ?? ''}
						/>
					</div>

					<div>
						<label htmlFor="project_link">Project Link: </label>
						<input
							type="text"
							id="project_link"
							name="project_link"
							defaultValue={selectedProject?.project_link ?? ''}
						/>
					</div>
					<div>
						<label htmlFor="tech_stack">Tech Stack: </label>
						<input
							type="text"
							id="tech_stack"
							name="tech_stack"
							defaultValue={selectedProject?.tech_stack.join(', ')}
							placeholder="React, TypeScript, Prisma..."
							required
						/>
					</div>
					<div>
						<label htmlFor="description">Description: </label>
						<input
							type="text"
							id="description"
							name="description"
							defaultValue={selectedProject?.description ?? ''}
						/>
					</div>
					<div>
						<label htmlFor="projectYear">Project Year: </label>
						<input
							type="number"
							id="projectYear"
							name="projectYear"
							defaultValue={selectedProject?.projectYear}
							required
						/>
					</div>
					<div>
						<label htmlFor="preview_image_link">Preview Image: </label>
						<input
							type="text"
							id="preview_image_link"
							name="preview_image_link"
							defaultValue={selectedProject?.preview_image_link ?? ''}
						/>
					</div>
					<button type="submit">{selectedProject ? 'Update' : 'Add'}</button>
					<button type="button" onClick={closeModal}>
						Cancel
					</button>
				</form>
			</div>
		</section>
	);
}
