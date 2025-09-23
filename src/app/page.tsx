import UserAbout from './components/UserAbout';
import SideBar from './components/SideBar';
import UserSkillSet from './components/userSkills/UserSkillSet';
import WorkExpSection from './components/userWorkExperience/WorkExpSection';
import EducationSection from './components/userEducation/EducationSection';

import { getUserByUsername } from '@/controllers/userController';

export default async function Home() {
	const user = await getUserByUsername('zengks');

	return user ? (
		<div>
			<main className="flex">
				<section className="flex-30/100 flex flex-col justify-between items-center">
					<SideBar userId={user?.id} />
				</section>
				<section className="flex-70/100 mr-30">
					<UserAbout about={user?.aboutUser} />
					<UserSkillSet />
					<WorkExpSection userId={user?.id} />
					<EducationSection userId={user?.id} />
				</section>
			</main>
		</div>
	) : (
		<h1>User Not Found!</h1>
	);
}
