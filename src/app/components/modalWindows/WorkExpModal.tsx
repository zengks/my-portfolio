'use client';

import { useEffect, useState, type FormEvent } from 'react';
import type { WorkExperience } from 'types/workExpType';
import Image from 'next/image';
import DefaultCompanyIcon from '@/assets/icons/defaultCompany.svg';
import { handleKeyDown } from '@/lib/utility';
import { useRouter } from 'next/navigation';

type COMPANY_INFO = {
	name: string;
	logo_url: string;
};

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
	const [query, setQuery] = useState('');
	const [selectedCompanyInfo, setSelectedCompanyInfo] = useState<COMPANY_INFO | null>(null);
	const [results, setResults] = useState([]);
	const [isSearchBrand, setIsSearchBrand] = useState(false);
	const [isManualEntry, setIsManualEntry] = useState(false);
	const [manualCompanyName, setManualCompanyName] = useState('');

	const router = useRouter();

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

		const isEditing = !!selectedWorkExp;
		const method = isEditing ? 'PUT' : 'POST';

		let finalLogoUrl = '';
		let finalCompanyName = '';

		if (isManualEntry) {
			finalLogoUrl = DefaultCompanyIcon.src;
		} else if (selectedCompanyInfo) {
			finalLogoUrl = selectedCompanyInfo.logo_url;
		} else if (selectedWorkExp) {
			finalLogoUrl = selectedWorkExp.companyLogoUrl || '';
		}

		if (isManualEntry) {
			finalCompanyName = manualCompanyName;
		} else if (selectedCompanyInfo) {
			finalCompanyName = selectedCompanyInfo.name;
		} else if (selectedWorkExp) {
			finalCompanyName = selectedWorkExp.company || '';
		}

		const payload = {
			id: selectedWorkExp?.id,
			jobTitle: formData.get('jobTitle'),
			company: finalCompanyName,
			companyLogoUrl: finalLogoUrl,
			startMonth: Number(formData.get('startMonth')),
			startYear: Number(formData.get('startYear')),
			endMonth: Number(formData.get('endMonth')),
			endYear: Number(formData.get('endYear')),
			city: formData.get('city'),
			province: formData.get('province'),
			country: formData.get('country'),
			locationType: formData.get('locationType'),
			employmentType: formData.get('employmentType'),
			description: formData.get('description'),
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

			setSelectedCompanyInfo(null);
			setQuery('');
			setManualCompanyName('');
			setIsManualEntry(false);
			setIsSearchBrand(false);
			setResults([]);
			closeModal();
		} catch (error) {
			console.log(error);
		} finally {
			router.refresh();
		}
	};

	const handleIconSearch = async () => {
		if (query !== '') {
			const data = await getBrandInfo(query);
			setResults(data);
			setIsSearchBrand(true);
		}
	};

	const handleManualConfirm = () => {
		if (manualCompanyName !== '') {
			setSelectedCompanyInfo({
				name: manualCompanyName,
				logo_url: DefaultCompanyIcon.src,
			});
		}
	};

	return (
		<section className="modal-container">
			<div className="modal-window">
				<div className="modal-header">
					<h2 className="modal-header-title">Edit Work Experience</h2>
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
				<form
					onSubmit={handleSubmit}
					onKeyDown={handleKeyDown}
					className="flex flex-col flex-1 overflow-hidden"
				>
					<div className="p-6 overflow-y-auto space-y-6">
						<div>
							<label htmlFor="jobTitle" className="modal-label-text">
								Job Title <span className="text-red-500">*</span>
							</label>
							<input
								type="text"
								id="jobTitle"
								name="jobTitle"
								className="modal-input"
								defaultValue={selectedWorkExp?.jobTitle}
								required
							/>
						</div>

						<div>
							<div className="flex justify-between items-center mb-1">
								<label htmlFor="company" className="flex items-center flex-1 mb-1">
									Company <span className="text-red-500">*</span>
									<span className="ms-2">
										{selectedCompanyInfo ? (
											<Image
												src={selectedCompanyInfo.logo_url || DefaultCompanyIcon}
												alt={selectedCompanyInfo.name}
												width={25}
												height={25}
											/>
										) : selectedWorkExp ? (
											<Image
												src={selectedWorkExp.companyLogoUrl || DefaultCompanyIcon}
												alt={selectedWorkExp.company}
												width={25}
												height={25}
											/>
										) : (
											<div></div>
										)}
									</span>
									<span className="ms-2">
										{selectedCompanyInfo
											? selectedCompanyInfo.name
											: selectedWorkExp
												? selectedWorkExp.company
												: ''}
									</span>
								</label>
								<div>
									<input
										id="manualEntry"
										type="checkbox"
										value={isManualEntry ? 'true' : 'false'}
										onChange={() => setIsManualEntry(!isManualEntry)}
									/>
									<label htmlFor="manualEntry" className="ms-2">
										Enter company manually
									</label>
								</div>
							</div>

							<div className={`flex items-center ${isManualEntry ? 'hidden' : ''}`}>
								<input
									type="text"
									id="company"
									name="company"
									className="modal-input"
									placeholder="Enter company name..."
									value={query}
									onChange={(e) => {
										setQuery(e.target.value);
									}}
									required={!isManualEntry && selectedWorkExp === null}
								/>
								<button type="button" onClick={handleIconSearch} className="modal-primary-btn ms-3">
									Search
								</button>
							</div>

							<div className={`${isManualEntry ? '' : 'hidden'} flex items-center`}>
								<Image
									src={DefaultCompanyIcon}
									alt="Default Company Icon Placeholder"
									width={25}
									height={25}
								/>
								<input
									placeholder="Enter company name..."
									className="modal-input ms-2"
									type="text"
									id="manualCompanyEntry"
									name="manualCompanyEntry"
									value={manualCompanyName ?? ''}
									onChange={(e) => setManualCompanyName(e.target.value)}
									required={isManualEntry && selectedWorkExp === null}
								/>
								<button
									type="button"
									onClick={handleManualConfirm}
									className="modal-primary-btn ms-3 cursor-pointer"
								>
									Confirm
								</button>
							</div>

							{query !== '' && results.length > 0 && (
								<div className={!isSearchBrand ? 'sr-only' : 'icon-result-container'}>
									<span>Results</span>
									{results.map((each: COMPANY_INFO, index: number) => (
										<div
											key={index}
											className="icon-result-row"
											onClick={() => {
												setSelectedCompanyInfo(each);
												setQuery(each.name);
												setIsSearchBrand(false);
												setResults([]);
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
							)}
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label htmlFor="startMonth" className="modal-label-text">
									Start Month <span className="text-red-500">*</span>
								</label>
								<input
									type="number"
									id="startMonth"
									name="startMonth"
									className="modal-input"
									defaultValue={selectedWorkExp?.startMonth}
									required
								/>
							</div>
							<div>
								<label htmlFor="startYear" className="modal-label-text">
									Start Year <span className="text-red-500">*</span>
								</label>
								<input
									type="number"
									id="startYear"
									name="startYear"
									className="modal-input"
									defaultValue={selectedWorkExp?.startYear}
									required
								/>
							</div>
							<div>
								<label htmlFor="endMonth" className="modal-label-text">
									End Month:{' '}
								</label>
								<input
									type="number"
									id="endMonth"
									name="endMonth"
									className="modal-input"
									defaultValue={selectedWorkExp?.endMonth ?? ''}
								/>
							</div>
							<div>
								<label htmlFor="endYear" className="modal-label-text">
									End Year:{' '}
								</label>
								<input
									type="number"
									id="endYear"
									name="endYear"
									className="modal-input"
									defaultValue={selectedWorkExp?.endYear ?? ''}
								/>
							</div>
							<div>
								<label htmlFor="city" className="modal-label-text">
									City:{' '}
								</label>
								<input
									type="text"
									id="city"
									name="city"
									className="modal-input"
									defaultValue={selectedWorkExp?.city ?? ''}
								/>
							</div>
							<div>
								<label htmlFor="province" className="modal-label-text">
									Province:{' '}
								</label>
								<input
									type="text"
									id="province"
									name="province"
									className="modal-input"
									defaultValue={selectedWorkExp?.province ?? ''}
								/>
							</div>
							<div>
								<label htmlFor="country" className="modal-label-text">
									Country:{' '}
								</label>
								<input
									type="text"
									id="country"
									name="country"
									className="modal-input"
									defaultValue={selectedWorkExp?.country ?? ''}
								/>
							</div>
							<div>
								<label htmlFor="locationType" className="modal-label-text">
									Location Type:{' '}
								</label>
								<input
									type="text"
									id="locationType"
									name="locationType"
									className="modal-input"
									defaultValue={selectedWorkExp?.locationType ?? ''}
								/>
							</div>
							<div>
								<label htmlFor="employmentType" className="modal-label-text">
									Employment Type:{' '}
								</label>
								<input
									type="text"
									id="employmentType"
									name="employmentType"
									className="modal-input"
									defaultValue={selectedWorkExp?.employmentType ?? ''}
								/>
							</div>
						</div>
						<div>
							<label htmlFor="description" className="modal-label-text">
								Description
							</label>
							<textarea
								rows={3}
								name="description"
								className="modal-input"
								defaultValue={selectedWorkExp?.description ?? ''}
							/>
						</div>
					</div>
					<div className="modal-footer">
						<button type="button" onClick={closeModal} className="modal-secondary-btn">
							Cancel
						</button>
						<button type="submit" className="modal-primary-btn">
							{selectedWorkExp ? 'Update' : 'Add'}
						</button>
					</div>
				</form>
			</div>
		</section>
	);
}
