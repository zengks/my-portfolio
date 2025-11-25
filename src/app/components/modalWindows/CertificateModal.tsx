'use client';

import { useEffect, type FormEvent } from 'react';
import type { Certificate } from 'types/certificateType';

export default function CertificateModal({
	isOpen,
	closeModal,
	username,
	selectedCertificate,
}: {
	isOpen: boolean;
	closeModal: () => void;
	username: string;
	selectedCertificate: Certificate | null;
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

		const isEditing = !!selectedCertificate;
		const method = isEditing ? 'PUT' : 'POST';

		const payload = {
			name: formData.get('name'),
			issuingOrg: formData.get('issuingOrg'),
			dateIssued: formData.get('dateIssued'),
			dateExpired: formData.get('dateExpired'),
			credentialId: formData.get('credentialId'),
			credentialUrl: formData.get('credentialUrl'),
		};

		try {
			const response = await fetch(`/api/users/${username}/certificate`, {
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
						<label htmlFor="name">Name: </label>
						<input
							type="text"
							id="name"
							name="name"
							defaultValue={selectedCertificate?.name}
							required
						/>
					</div>
					<div>
						<label htmlFor="issuingOrg">Issuing Organization: </label>
						<input
							type="text"
							id="issuingOrg"
							name="issuingOrg"
							defaultValue={selectedCertificate?.issuingOrg}
							required
						/>
					</div>
					<div>
						<label htmlFor="dateIssued">Issue Date: </label>
						<input
							type="text"
							id="dateIssued"
							name="dateIssued"
							defaultValue={String(selectedCertificate?.dateIssued)}
							required
						/>
					</div>
					<div>
						<label htmlFor="dateExpired">Expiration Date: </label>
						<input
							type="text"
							id="dateExpired"
							name="dateExpired"
							defaultValue={String(selectedCertificate?.dateExpired ?? '')}
						/>
					</div>
					<div>
						<label htmlFor="credentialId">Credential ID: </label>
						<input
							type="text"
							id="credentialId"
							name="credentialId"
							defaultValue={selectedCertificate?.credentialId ?? ''}
						/>
					</div>
					<div>
						<label htmlFor="credentialUrl">Credential URL: </label>
						<input
							type="text"
							id="credentialUrl"
							name="credentialUrl"
							defaultValue={selectedCertificate?.credentialUrl ?? ''}
						/>
					</div>
					<button type="submit">{selectedCertificate ? 'Update' : 'Add'}</button>
					<button type="button" onClick={closeModal}>
						Cancel
					</button>
				</form>
			</div>
		</section>
	);
}
