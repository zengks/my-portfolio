'use client';

import { useEffect, type FormEvent } from 'react';
import type { AboutUser } from 'types/aboutUserType';

export default function AboutUserModal({
	isOpen,
	closeModal,
	username,
	selectedAboutUserSection,
}: {
	isOpen: boolean;
	closeModal: () => void;
	username: string;
	selectedAboutUserSection: AboutUser | null;
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

		const isEditing = !!selectedAboutUserSection;
		const method = isEditing ? 'PUT' : 'POST';

		const payload = {
			id: selectedAboutUserSection?.id,
			header: formData.get('header'),
			aboutContent: formData.get('aboutContent'),
		};

		try {
			const response = await fetch(`/api/users/${username}/aboutUser`, {
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
						<label htmlFor="header">Header: </label>
						<input
							type="text"
							id="header"
							name="header"
							defaultValue={selectedAboutUserSection?.header}
							required
						/>
					</div>
					<div>
						<label htmlFor="aboutContent">Content: </label>
						<input
							type="text"
							id="aboutContent"
							name="aboutContent"
							defaultValue={selectedAboutUserSection?.aboutContent ?? ''}
							required
						/>
					</div>

					<button type="submit">{selectedAboutUserSection ? 'Update' : 'Add'}</button>
					<button type="button" onClick={closeModal}>
						Cancel
					</button>
				</form>
			</div>
		</section>
	);
}
