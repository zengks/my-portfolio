import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    const steven = await prisma.user.upsert({
        where: { username: "zengks" },
        update: {},
        create: {
            username: "zengks",
            password: "123456",
            role: "ADMIN",
            profile: {
                create: {
                    email: "zengks@outlook.com",
                    firstName: "Steven",
                    lastName: "Zeng",
                    bio: "my bio description",
                    imageLink: "",
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

    const jimmy = await prisma.user.upsert({
        where: { username: "jimmy123" },
        update: {},
        create: {
            username: "jimmy123",
            password: "123456",
            role: "guest",
            profile: {
                create: {
                    email: "jimmy@email.com",
                    firstName: "Jimmy",
                    lastName: "Bao",
                    bio: "jimmy bio des",
                    imageLink: "",
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
    console.log("Steven User: ", { steven });
    console.log("Jimmy User: ", { jimmy });
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
