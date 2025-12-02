'use client';

import { useEffect, useState, type FormEvent } from 'react';
import type { Certificate } from 'types/certificateType';
import Image from 'next/image';
import DefaultCompanyIcon from '@/assets/icons/defaultCompany.svg';

type CERTIFICATE_INFO = {
	name: string;
	logo_url: string;
};

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
	const [query, setQuery] = useState('');
	const [selectedCertInfo, setSelectedCertInfo] = useState<CERTIFICATE_INFO | null>(null);
	const [results, setResults] = useState([]);
	const [isSearchBrand, setIsSearchBrand] = useState(false);

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

	const getBrandInfo = async (queryItem: string) => {
		try {
			const response = await fetch(`https://api.logo.dev/search?q=${queryItem}`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${process.env.NEXT_PUBLIC_LOGO_DEV_SECRET_KEY}`,
					'Content-Type': 'application/json',
				},
			});
			if (!response.ok) {
				throw new Error('Operation Failed!');
			}
			const data = await response.json();
			return data;
		} catch (error) {
			console.log(error);
			throw new Error('Failed to fetch brand information');
		}
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		const isEditing = !!selectedCertificate;
		const method = isEditing ? 'PUT' : 'POST';

		const payload = {
			id: selectedCertificate?.id,
			name: formData.get('name'),
			issuingOrg: (selectedCertInfo && selectedCertInfo.name) ?? formData.get('issuingOrg'),
			companyLogoUrl: (selectedCertInfo && selectedCertInfo.logo_url) ?? '',
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

	const handleIconSearch = async () => {
		if (query !== '') {
			const data = await getBrandInfo(query);
			setResults(data);
			setIsSearchBrand(true);
		}
	};

	return (
		<section className="modal-container">
			<div className="modal-window">
				<div className="modal-header">
					<p className="modal-header-title">Edit Certificate</p>
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
						<div>
							<label htmlFor="name" className="modal-label-text">
								Name <span className="text-red-500">*</span>
							</label>
							<input
								type="text"
								id="name"
								name="name"
								className="modal-input"
								defaultValue={selectedCertificate?.name}
								required
							/>
						</div>
						<div>
							<label htmlFor="issuingOrg" className="flex items-center flex-1 mb-1">
								Issuing Organization <span className="text-red-500">*</span>
								<span>
									{selectedCertInfo ? (
										<Image
											src={selectedCertInfo.logo_url}
											alt={selectedCertInfo.name}
											width={25}
											height={25}
										/>
									) : (
										<Image
											src={DefaultCompanyIcon}
											alt={selectedCertificate?.name ?? 'Certificate icon placeholder'}
											width={25}
											height={25}
										/>
									)}
								</span>
							</label>
							<div className="flex items-center">
								<input
									placeholder="Enter school name..."
									className="modal-input"
									type="text"
									id="schoolLogoUrl"
									name="schoolLogoUrl"
									value={query}
									onChange={(e) => {
										setQuery(e.target.value);
										if (selectedCertInfo?.name !== e.target.value) {
											setSelectedCertInfo(null);
										}
									}}
								/>
								<button type="button" onClick={handleIconSearch} className="modal-primary-btn ms-3">
									Search
								</button>
							</div>
						</div>

						<div className={!isSearchBrand ? 'sr-only' : 'icon-result-container'}>
							<span>Results</span>
							{results &&
								results.map((each: CERTIFICATE_INFO, index: number) => (
									<div
										key={index}
										className="icon-result-row"
										onClick={() => {
											setSelectedCertInfo(each);
											setQuery(each.name);
											setIsSearchBrand(false);
										}}
									>
										<Image
											className="rounded-xl"
											src={each.logo_url}
											alt={each.name}
											width={50}
											height={50}
										/>
										{each.name}
									</div>
								))}
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label htmlFor="dateIssued" className="modal-label-text">
									Issue Date <span className="text-red-500">*</span>
								</label>
								<input
									type="text"
									id="dateIssued"
									name="dateIssued"
									className="modal-input"
									defaultValue={String(selectedCertificate?.dateIssued)}
									required
								/>
							</div>
							<div>
								<label htmlFor="dateExpired" className="modal-label-text">
									Expiration Date
								</label>
								<input
									type="text"
									id="dateExpired"
									name="dateExpired"
									className="modal-input"
									defaultValue={String(selectedCertificate?.dateExpired ?? '')}
								/>
							</div>
						</div>
						<div>
							<label htmlFor="credentialId" className="modal-label-text">
								Credential ID
							</label>
							<input
								type="text"
								id="credentialId"
								name="credentialId"
								className="modal-input"
								defaultValue={selectedCertificate?.credentialId ?? ''}
							/>
						</div>
						<div>
							<label htmlFor="credentialUrl" className="modal-label-text">
								Credential URL
							</label>
							<input
								type="text"
								id="credentialUrl"
								name="credentialUrl"
								className="modal-input"
								defaultValue={selectedCertificate?.credentialUrl ?? ''}
							/>
						</div>
					</div>
					<div className="modal-footer">
						<button className="modal-secondary-btn" type="button" onClick={closeModal}>
							Cancel
						</button>
						<button className="modal-primary-btn" type="submit">
							{selectedCertificate ? 'Update' : 'Add'}
						</button>
					</div>
				</form>
			</div>
		</section>
	);
}
