import prisma from 'src/lib/prisma';
import { Profile } from 'types/profileType';
import { apiPaths } from '@/lib/apiPaths';
import { writeFile, unlink } from 'fs/promises';
import path from 'path';

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
			resumeUrl: true,
		},
	});
	return profile;
}

export async function updateUserProfile(username: string, formData: FormData) {
	const user = await prisma.user.findUnique({
		where: { username },
		select: { id: true },
	});

	if (!user) throw new Error(`User @${username} not found`);

	const resumeFile = formData.get('resume') as File | null;

	if (resumeFile) {
	}

	let resumeUrl = undefined;

	if (resumeFile && typeof resumeFile.arrayBuffer === 'function') {
		const currentProfile = await prisma.profile.findUnique({
			where: { username },
			select: { resumeUrl: true },
		});

		if (currentProfile?.resumeUrl) {
			const oldFilePath = path.join(process.cwd(), 'public', currentProfile.resumeUrl);
			try {
				await unlink(oldFilePath);
				console.log(`Deleted old resume: ${oldFilePath}`);
			} catch (error) {
				console.warn('Could not delete old resume file: ', error);
			}
		}

		const bytes = await resumeFile.arrayBuffer();
		const buffer = Buffer.from(bytes);
		const filename = `${Date.now()}-${resumeFile.name.replaceAll(' ', '_')}`;
		const uploadDir = path.join(process.cwd(), 'public/uploads');

		await writeFile(path.join(uploadDir, filename), buffer);
		resumeUrl = `/uploads/${filename}`;
	}

	const updatedUserProfile = await prisma.profile.update({
		where: {
			username,
		},
		data: {
			username: username,
			firstName: formData.get('firstName') as string,
			lastName: formData.get('lastName') as string,
			jobTitle: formData.get('jobTitle') as string,
			email: formData.get('email') as string,
			city: formData.get('city') as string,
			province: formData.get('province') as string,
			country: formData.get('country') as string,
			linkedInUrl: formData.get('linkedInUrl') as string,
			githubUrl: formData.get('githubUrl') as string,
			bioLink: formData.get('bio') as string,
			resumeUrl: resumeUrl,
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
