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
				<section className="w-80/100">
					{certData.map((data: Certificate, index: number) => (
						<div className="section-container flex justify-between" key={index}>
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
