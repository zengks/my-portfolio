import UserAbout from './components/UserAbout';
import SideBar from './components/SideBar';
// import UserSkillSet from './components/userSkills/UserSkillSet';
import WorkExpSection from './components/WorkExpSection';
import EducationSection from './components/EducationSection';

import { getUserByUsername } from '@/controllers/userController';

export default async function Home() {
	const user = await getUserByUsername('zengks');
	console.log(user);

	return user ? (
		<div>
			<main className="flex">
				<section className="flex-30/100 flex flex-col justify-between items-center">
					<SideBar profile={user.profile} />
				</section>
				<section className="flex-70/100 mr-30">
					<UserAbout about={user.aboutUser} />
					{/* <UserSkillSet /> */}
					<WorkExpSection workExp={user.workExperience} />
					<EducationSection eduHistory={user.education} />
				</section>
			</main>
		</div>
	) : (
		<h1>User Not Found!</h1>
	);
}
