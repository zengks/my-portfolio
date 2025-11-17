import prisma from '@/lib/prisma';
import { Certificate } from 'types/certificateType';
import { apiPaths } from '@/lib/apiPaths';
import { getUserIdByUsername } from './userController';

export async function getUserCertificateByUsername(username: string = 'zengks') {
	const user = await getUserIdByUsername(username);
	if (!user) return null;
	return await prisma.certificate.findMany({
		where: { userId: user.id },
		select: {
			id: true,
			name: true,
			certNumber: true,
			dateIssued: true,
			dateExpired: true,
		},
	});
}

export async function getUserCertificate(userId: string) {
	return await prisma.certificate.findMany({
		where: {
			userId,
		},
	});
}

async function updateOneCertificate(certificateId: number, certificateData: Certificate) {
	return await prisma.certificate.update({
		where: {
			id: certificateId,
		},
		data: certificateData,
	});
}

export async function updateUserCertificate(newCertificateData: Certificate[]) {
	if (newCertificateData.length === 0) {
		throw new Error('No certificate data provided for update');
	}

	const updatedCertificate = await Promise.all(
		newCertificateData.map((each) => updateOneCertificate(each.id, each))
	);

	return updatedCertificate;
}

// client-side api call
export async function fetchAllUserCertificate(): Promise<Certificate[] | undefined> {
	try {
		const res = await fetch(apiPaths.userCertificate());
		const data = await res.json();
		return data.certificate;
	} catch (error) {
		console.error('Error fetching user certificate, ', error);
		return undefined;
	}
}
