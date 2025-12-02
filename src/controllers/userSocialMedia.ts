import prisma from '@/lib/prisma';
import { SocialMedia } from 'types/socialMediaType';

export async function getAllUserSocialMedia(userId: string) {
	return await prisma.socialMedia.findMany({
		where: { userId },
	});
}

async function updateOneSocialMedia(socialMediaId: number, socialMediaData: SocialMedia) {
	return await prisma.socialMedia.update({
		where: { id: socialMediaId },
		data: socialMediaData,
	});
}

export async function updateUserSocialMedia(newSocialMediaData: SocialMedia[]) {
	if (newSocialMediaData.length === 0) throw new Error('No social media provided to update.');

	const updatedSocialMedia = await Promise.all(
		newSocialMediaData.map((each) => updateOneSocialMedia(each.id, each))
	);

	return updatedSocialMedia;
}
