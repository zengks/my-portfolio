import prisma from 'src/lib/prisma';
import { hashPassword } from 'src/lib/hash';
import { UserUpdateInput } from 'types/userType';

export async function getUserIdByUsername(username: string) {
	return await prisma.user.findUnique({
		where: { username },
		select: { id: true },
	});
}

export async function getAllUsers() {
	return await prisma.user.findMany();
}

export async function getUserByUsername(username: string) {
	try {
		const user = await prisma.user.findUnique({
			where: { username },
			select: {
				role: true,
				certificate: {
					select: {
						id: true,
						name: true,
						issuingOrg: true,
						companyLogoUrl: true,
						credentialId: true,
						credentialUrl: true,
						dateIssued: true,
						dateExpired: true,
					},
				},
				education: {
					select: {
						id: true,
						school: true,
						degree: true,
						fieldOfStudy: true,
						schoolLogoUrl: true,
						city: true,
						province: true,
						country: true,
						startYear: true,
						endYear: true,
						gpa: true,
						description: true,
					},
				},
				profile: {
					select: {
						id: true,
						username: true,
						userId: true,
						firstName: true,
						lastName: true,
						email: true,
						bioLink: true,
						imageLink: true,
						city: true,
						province: true,
						country: true,
						githubUrl: true,
						linkedInUrl: true,
						jobTitle: true,
						resumeUrl: true,
						aboutUser: {
							select: {
								id: true,
								username: true,
								userId: true,
								profileId: true,
								header: true,
								aboutContent: true,
							},
						},
					},
				},

				workExperience: {
					select: {
						id: true,
						jobTitle: true,
						company: true,
						companyLogoUrl: true,
						city: true,
						province: true,
						country: true,
						locationType: true,
						employmentType: true,
						startYear: true,
						endYear: true,
						description: true,
					},
				},
				project: {
					select: {
						id: true,
						title: true,
						repo_link: true,
						project_link: true,
						description: true,
						preview_image_link: true,
						tech_stack: true,
						projectYear: true,
					},
				},
				skills: {
					select: {
						id: true,
						categoryName: true,
						subCategoryName: true,
						skills: true,
						description: true,
					},
				},
			},
		});

		return user;
	} catch (error) {
		console.log(error);
	}
}

export async function createUser(
	username: string,
	password: string,
	email: string,
	firstName: string,
	role?: string
) {
	return await prisma.user.create({
		data: {
			username,
			password: await hashPassword(password),
			role,
			profile: {
				create: {
					firstName: firstName,
					email: email,
				},
			},
		},
		include: { profile: true },
	});
}

export async function checkUserExists(username: string) {
	const user = await prisma.user.findUnique({
		where: { username },
	});

	return user === null ? false : true;
}

export async function updateUser(username: string, newUserData: UserUpdateInput) {
	if (newUserData.password) {
		newUserData.password = await hashPassword(newUserData.password);
	}
	return await prisma.user.update({
		where: { username },
		data: newUserData,
	});
}

export async function deleteUser(username: string) {
	return await prisma.user.delete({
		where: { username },
	});
}
