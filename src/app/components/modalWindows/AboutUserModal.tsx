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
		<section className="modal-container">
			<div className="modal-window">
				<div className="modal-header">
					<h2 className="modal-header-title">Edit About</h2>
					<button
						onClick={closeModal}
						className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
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
						<div>
							<label htmlFor="header" className="modal-label-text">
								Header Name <span className="text-red-500">*</span>
							</label>
							<input
								type="text"
								id="header"
								name="header"
								className="modal-input"
								defaultValue={selectedAboutUserSection?.header}
								required
							/>
						</div>

						<div>
							<label htmlFor="aboutContent" className="modal-label-text">
								Content
							</label>
							<textarea
								rows={3}
								id="aboutContent"
								name="aboutContent"
								className="modal-input"
								defaultValue={selectedAboutUserSection?.aboutContent ?? ''}
							/>
						</div>
					</div>

					<div className="modal-footer">
						<button type="button" onClick={closeModal} className="modal-secondary-btn">
							Cancel
						</button>
						<button type="submit" className="modal-primary-btn">
							{selectedAboutUserSection ? 'Update' : 'Add'}
						</button>
					</div>
				</form>
			</div>
		</section>
	);
}
