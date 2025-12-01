'use client';

import Image from 'next/image';
import type { Certificate } from 'types/certificateType';
import DefaultCompanyIcon from '@/assets/icons/defaultCompany.svg';

export default function CertificateAccordion({ cert }: { cert: Certificate }) {
	return (
		<div className="mb-3 rounded-lg border border-gray-200 bg-neutral-50 shadow-sm overflow-hidden">
			<div className="flex w-full items-center justify-between p-4">
				<div className="items-center flex justify-start text-left pr-4 text-sm tracking-wide">
					{cert.companyLogoUrl ? (
						<Image src={cert.companyLogoUrl} alt={cert.issuingOrg} width={58} height={58} />
					) : (
						<Image
							src={DefaultCompanyIcon}
							alt={cert.issuingOrg ?? 'company icon placeholder'}
							width={58}
							height={58}
						/>
					)}

					<div className="ms-3">
						<p className="text-gray-900 text-[16px]">{cert.name}</p>
						<p className="text-gray-700 text-[14px]">{cert.issuingOrg}</p>
						<p className="text-gray-500 text-[14px]">{`Issued on ${new Date(
							cert.dateIssued
						).toLocaleString('en-US', { month: 'short' })} ${new Date(
							cert.dateIssued
						).getFullYear()}`}</p>
						<button className="border py-1 px-2 rounded-2xl mt-1 pointer" type="button">
							<a href={cert.credentialUrl ?? '/'} target="_blank">
								Show Credential
							</a>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
