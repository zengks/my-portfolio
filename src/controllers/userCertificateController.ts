import prisma from '@/lib/prisma';
import type { Certificate } from 'types/certificateType';

export async function getUserCertificate(username: string) {
	return await prisma.certificate.findMany({
		where: { username },
	});
}

export async function addCertificate(username: string, certificateData: Certificate) {
	const user = await prisma.user.findUnique({
		where: { username },
		select: { id: true },
	});

	if (!user) throw new Error(`User @${username} not found`);

	const newCertificate = await prisma.certificate.create({
		data: {
			userId: user.id,
			username: username,
			name: certificateData.name,
			issuingOrg: certificateData.issuingOrg,
			dateIssued: new Date(certificateData.dateIssued),
			dateExpired: certificateData.dateExpired ? new Date(certificateData.dateExpired) : null,
			credentialId: certificateData.credentialId ?? null,
			credentialUrl: certificateData.credentialUrl ?? null,
		},
	});

	return newCertificate;
}

export async function updateUserCertificate(
	username: string,
	selectedCertificateData: Certificate
) {
	const user = await prisma.user.findUnique({
		where: { username },
		select: { id: true },
	});

	if (!user) throw new Error(`User @${username} not found`);

	const updatedCertificate = await prisma.certificate.update({
		where: {
			id: selectedCertificateData.id,
		},
		data: {
			name: selectedCertificateData.name,
			issuingOrg: selectedCertificateData.issuingOrg,
			dateIssued: new Date(selectedCertificateData.dateIssued),
			dateExpired: selectedCertificateData.dateExpired
				? new Date(selectedCertificateData.dateExpired)
				: null,
			credentialId: selectedCertificateData.credentialId,
			credentialUrl: selectedCertificateData.credentialUrl,
		},
	});

	return updatedCertificate;
}

export async function deleteUserCertificate(certificateId: number) {
	return await prisma.certificate.delete({
		where: { id: certificateId },
	});
}
