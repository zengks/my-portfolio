import React from 'react';
import { getUserCertificate } from '@/controllers/userCertificateController';
import type { Certificate } from 'types/certificateType';

import { getYear } from '@/utility';

export default async function CertificateSection() {
	const certData = await getUserCertificate('zengks');
	const sortedCertData = certData
		? [...certData].sort((a: Certificate, b: Certificate) => {
				if (a.dateIssued === null) return 1;
				if (b.dateIssued === null) return -1;
				return new Date(b.dateIssued).getTime() - new Date(a.dateIssued).getTime();
		  })
		: null;
	return (
		<section className="section-container section-card">
			<p className="section-title">Certificates</p>
			{sortedCertData && sortedCertData.length > 0 ? (
				<section className="flex flex-col gap-2">
					{sortedCertData.map((data: Certificate, index: number) => (
						<div className="columns-5" key={index}>
							<p>{data.name}</p>
							<p>{data.issuingOrg}</p>
							<p>{`${getYear(data.dateIssued)}`}</p>
							<p>{`${getYear(data.dateExpired)}`}</p>
							<p>
								<a target="_blank" href={data.credentialUrl ? data.credentialUrl : '/'}>
									View
								</a>
							</p>
						</div>
					))}
				</section>
			) : (
				<section>No certificate found.</section>
			)}
		</section>
	);
}
