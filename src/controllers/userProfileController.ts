import prisma from 'src/lib/prisma';
import { Profile } from 'types/profileType';
import { apiPaths } from '@/lib/apiPaths';

export async function getUserProfile(userId: string) {
	const profile = await prisma.profile.findUnique({
		where: {
			userId,
		},
		select: {
			firstName: true,
			lastName: true,
			email: true,
			imageLink: true,
			bio: true,
		},
	});
	return profile;
}

export async function updateUserProfile(userId: string, newProfileData: Profile) {
	return await prisma.profile.update({
		where: {
			userId,
		},
		data: newProfileData,
	});
}

// client-side fetch user profile
export async function fetchUserProfile(): Promise<Profile | undefined> {
	try {
		const res = await fetch(apiPaths.userProfile());
		const data = await res.json();
		return data.profile;
	} catch (error) {
		console.error('Error fetching user profile: ', error);
		return undefined;
	}
}
