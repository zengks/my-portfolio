import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
	const adminUser = await prisma.user.upsert({
		where: { username: 'zengks' },
		update: {},
		create: {
			username: 'zengks',
			password: '123456',
			role: 'ADMIN',
			profile: {
				create: {
					email: 'zengks@outlook.com',
					firstName: 'Steven',
					lastName: 'Zeng',
					bioLink: 'my bio description',
					imageLink: '',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			},
			blogPost: {},
			project: {},
			education: {},
			workExperience: {},
			certificate: {},
			socialMedia: {},
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	});

	const guestUser = await prisma.user.upsert({
		where: { username: 'jimmy123' },
		update: {},
		create: {
			username: 'jimmy123',
			password: '123456',
			role: 'guest',
			profile: {
				create: {
					email: 'jimmy@email.com',
					firstName: 'Jimmy',
					lastName: 'Bao',
					bioLink: 'jimmy bio des',
					imageLink: '',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			},
			blogPost: {},
			project: {},
			education: {},
			workExperience: {},
			certificate: {},
			socialMedia: {},
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	});

	await prisma.project.createMany({
		data: [
			{
				userId: adminUser.id,
				username: adminUser.username,
				title: 'BCIT Quiz Page',
				tech_stack: ['mongodb', 'reactjs', 'expressjs', 'nodejs'],
				projectYear: 2023,
			},
			{
				userId: adminUser.id,
				username: adminUser.username,
				title: 'Personal Portfolio Website',
				tech_stack: ['nextjs', 'prisma', 'tailwindcss', 'typescript'],
				projectYear: 2025,
			},
			{
				userId: adminUser.id,
				username: adminUser.username,
				title: 'Kombucha Guide',
				tech_stack: ['reactjs', 'python', 'css'],
				projectYear: 2024,
			},
		],
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
