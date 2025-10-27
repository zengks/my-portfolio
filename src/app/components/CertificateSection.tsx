import React from 'react';
import { getUserCertificateByUsername } from '@/controllers/userCertificateController';
import type { Certificate } from 'types/certificateType';
import { getYear } from '@/utility';

export default async function CertificateSection() {
	const certData = await getUserCertificateByUsername();
	if (!certData) return;
	return (
		<div className="section-container">
			<p className="section-title">Certificates</p>
			{certData.length > 0 ? (
				<section className="flex flex-col gap-4">
					{certData.map((data: Certificate, index: number) => (
						<div className="flex justify-between items-center" key={index}>
							<p>{data.name}</p>
							<p>{data.certNumber}</p>
							<p>{`${getYear(data.dateIssued)} - ${getYear(data.dateExpired)}`}</p>
						</div>
					))}
				</section>
			) : (
				<section>Loading...</section>
			)}
		</div>
	);
}
