import prisma from 'src/lib/prisma';
import { hashPassword } from 'src/lib/hash';
import { UserUpdateInput, User } from 'types/userType';
import { apiPaths } from '@/lib/apiPaths';

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
	return await prisma.user.findUnique({
		where: { username },
		select: {
			role: true,
			aboutUser: true,
			certificate: {
				select: {
					id: true,
					name: true,
					dateIssued: true,
					dateExpired: true,
					certNumber: true,
				},
			},
			education: {
				select: {
					id: true,
					school: true,
					degree: true,
					fieldOfStudy: true,
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
				},
			},
			workExperience: {
				select: {
					id: true,
					jobTitle: true,
					company: true,
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
		},
	});
}

export async function createUser(username: string, password: string, role?: string) {
	return await prisma.user.create({
		data: {
			username,
			password: await hashPassword(password),
			role,
		},
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

// client-side api call
export async function fetchUserByUsername(username: string): Promise<User | undefined> {
	try {
		if (username) {
			const res = await fetch(apiPaths.userData(username));
			const data = await res.json();
			return data.user;
		}
	} catch (error) {
		console.error('Error fetching user data: ', error);
		return undefined;
	}
}
