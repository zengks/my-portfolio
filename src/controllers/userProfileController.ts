import prisma from 'src/lib/prisma';
import { Profile } from 'types/profileType';
import { apiPaths } from '@/lib/apiPaths';

export async function getUserProfile(username: string = 'zengks') {
	const profile = await prisma.profile.findUnique({
		where: {
			username: username,
		},
		select: {
			userId: true,
			username: true,
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

export async function updateUserProfile(username: string, selectedProfile: Profile) {
	console.log('selected profile', selectedProfile);
	const user = await prisma.user.findUnique({
		where: { username },
		select: { id: true },
	});

	if (!user) throw new Error(`User @${username} not found`);

	const updatedUserProfile = await prisma.profile.update({
		where: {
			id: selectedProfile.id,
		},
		data: {
			firstName: selectedProfile.firstName,
			lastName: selectedProfile.lastName,
			email: selectedProfile.email,
			city: selectedProfile.city,
			province: selectedProfile.province,
			country: selectedProfile.country,
			linkedInUrl: selectedProfile.linkedInUrl,
			githubUrl: selectedProfile.githubUrl,
			jobTitle: selectedProfile.jobTitle,
		},
	});
	return updatedUserProfile;
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
