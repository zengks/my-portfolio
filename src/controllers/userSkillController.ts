import prisma from '@/lib/prisma';
import type { Skill } from 'types/skillType';

export async function getUserSkills(username: string) {
	return await prisma.skill.findMany({
		where: { username },
	});
}

export async function addSkill(username: string, skillData: Skill) {
	const user = await prisma.user.findUnique({
		where: { username },
		select: { id: true },
	});

	if (!user) throw new Error(`User @${username} not found`);

	const newSkill = await prisma.skill.create({
		data: {
			userId: user.id,
			username: username,
			categoryName: skillData.categoryName,
			skills: skillData.skills,
		},
	});

	return newSkill;
}
export async function updateSkill(username: string, selectedSkillData: Skill) {
	const user = await prisma.user.findUnique({
		where: { username },
		select: { id: true },
	});

	if (!user) throw new Error(`User @${username} not found`);

	const updatedSkill = await prisma.skill.update({
		where: {
			id: selectedSkillData.id,
		},
		data: {
			categoryName: selectedSkillData.categoryName,
			skills: selectedSkillData.skills,
		},
	});

	return updatedSkill;
}
export async function deleteSkill(skillId: number) {
	return await prisma.skill.delete({
		where: { id: skillId },
	});
}
