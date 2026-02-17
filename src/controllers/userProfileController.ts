import prisma from 'src/lib/prisma';
// import { writeFile, unlink } from 'fs/promises';
// import path from 'path';

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
			resumeData: true,
		},
	});
	return profile;
}

// export async function updateUserProfile(username: string, formData: FormData) {
// 	const user = await prisma.user.findUnique({
// 		where: { username },
// 		select: { id: true },
// 	});

// 	if (!user) throw new Error(`User @${username} not found`);

// 	const resumeFile = formData.get('resume') as File | null;

// 	let resumeUrl = undefined;

// 	if (resumeFile && typeof resumeFile.arrayBuffer === 'function') {
// 		const currentProfile = await prisma.profile.findUnique({
// 			where: { username },
// 			select: { resumeUrl: true },
// 		});

// 		if (currentProfile?.resumeUrl) {
// 			const oldFilePath = path.join(process.cwd(), 'public', currentProfile.resumeUrl);
// 			try {
// 				await unlink(oldFilePath);
// 				console.log(`Deleted old resume: ${oldFilePath}`);
// 			} catch (error) {
// 				console.warn('Could not delete old resume file: ', error);
// 			}
// 		}

// 		const bytes = await resumeFile.arrayBuffer();
// 		const buffer = Buffer.from(bytes);
// 		const filename = `${Date.now()}-${resumeFile.name.replaceAll(' ', '_')}`;
// 		const uploadDir = path.join(process.cwd(), 'public/uploads');

// 		await writeFile(path.join(uploadDir, filename), buffer);
// 		resumeUrl = `/uploads/${filename}`;
// 	}

// 	const updatedUserProfile = await prisma.profile.update({
// 		where: {
// 			username,
// 		},
// 		data: {
// 			username: username,
// 			firstName: formData.get('firstName') as string,
// 			lastName: formData.get('lastName') as string,
// 			jobTitle: formData.get('jobTitle') as string,
// 			email: formData.get('email') as string,
// 			city: formData.get('city') as string,
// 			province: formData.get('province') as string,
// 			country: formData.get('country') as string,
// 			linkedInUrl: formData.get('linkedInUrl') as string,
// 			githubUrl: formData.get('githubUrl') as string,
// 			bioLink: formData.get('bio') as string,
// 			resumeUrl: resumeUrl,
// 		},
// 	});
// 	return updatedUserProfile;
// }

export async function updateUserProfile(username: string, formData: FormData) {
	const user = await prisma.user.findUnique({
		where: { username },
		select: { id: true },
	});

	if (!user) throw new Error(`User @${username} not found`);

	const resumeFile = formData.get('resume') as File | null;

	const updateData = {
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
		resumeData: '',
		resumeUrl: '',
	};

	if (resumeFile && resumeFile.size > 0 && typeof resumeFile.arrayBuffer === 'function') {
		const bytes = await resumeFile.arrayBuffer();
		const buffer = Buffer.from(bytes);

		const mimeType = resumeFile.type || 'application/pdf';
		const base64Data = `data:${mimeType};base64,${buffer.toString('base64')}`;

		updateData.resumeData = base64Data;
		updateData.resumeUrl = resumeFile.name; // Store filename for display
	}

	const updatedUserProfile = await prisma.profile.update({
		where: { username },
		data: updateData,
	});

	return updatedUserProfile;
}
