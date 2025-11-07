import prisma from 'src/lib/prisma';
import { Profile } from 'types/profileType';
import { apiPaths } from '@/lib/apiPaths';
import { getUserIdByUsername } from './userController';

export async function getUserProfile(username: string = 'zengks') {
	const user = await getUserIdByUsername(username);
	if (!user) return null;

	const profile = await prisma.profile.findUnique({
		where: {
			userId: user.id,
		},
		select: {
			firstName: true,
			lastName: true,
			email: true,
			imageLink: true,
			bioLink: true,
			jobTitle: true,
			city: true,
			province: true,
			country: true,
			linkedInUrl: true,
			githubUrl: true,
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
