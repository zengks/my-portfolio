import React from 'react';
import { getUserCertificateByUsername } from '@/controllers/userCertificateController';
import type { Certificate } from 'types/certificateType';
import { getYear } from '@/utility';

export default async function CertificateSection() {
	const certData = await getUserCertificateByUsername();
	if (!certData) return;
	const sortedCertData = certData
		? [...certData].sort((a: Certificate, b: Certificate) => {
				if (a.dateIssued === null) return 1;
				if (b.dateIssued === null) return -1;
				return new Date(b.dateIssued).getTime() - new Date(a.dateIssued).getTime();
		  })
		: null;
	return (
		sortedCertData && (
			<div className="section-container">
				<p className="section-title">Certificates</p>
				{sortedCertData.length > 0 ? (
					<section className="flex flex-col gap-4">
						{sortedCertData.map((data: Certificate, index: number) => (
							<div className="columns-3" key={index}>
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
		)
	);
}
