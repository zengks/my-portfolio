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
					<div className="flex items-center justify-between">
						<label>Company Icon: </label>
						{selectedCertInfo ? (
							<Image
								src={selectedCertInfo.logo_url}
								alt={selectedCertInfo.name}
								width={30}
								height={30}
							/>
						) : (
							<Image
								src={DefaultCompanyIcon}
								alt={selectedCertificate?.name ?? 'company icon placeholder'}
								width={30}
								height={30}
							/>
						)}
						<input
							type="string"
							id="certCompanyLogoUrl"
							name="certCompanyLogoUrl"
							className="border"
							onChange={(e) => setQuery(e.target.value)}
						/>
						<button type="button" onClick={handleIconSearch}>
							Search
						</button>
					</div>
					{results &&
						isSearchBrand &&
						results.map((each: CERTIFICATE_INFO, index: number) => (
							<div
								key={index}
								className="flex items-center border-b-gray-300 hover:bg-amber-100"
								onClick={() => {
									setSelectedCertInfo(each);
									setIsSearchBrand(false);
								}}
							>
								<Image
									className="me-4 mb-5"
									src={each.logo_url}
									alt={each.name}
									width={40}
									height={40}
								/>
								{each.name}
							</div>
						))}
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
