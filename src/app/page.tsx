import UserAbout from './components/UserAbout';
import SideBar from './components/SideBar';
import WorkExpSection from './components/WorkExpSection';
import EducationSection from './components/EducationSection';
import CertificateSection from './components/CertificateSection';
import SkillSection from './components/SkillSection';

export default async function Home() {
	return (
		<main className="flex">
			<section className="w-1/4">
				<SideBar />
			</section>
			<section className="w-3/4">
				<UserAbout />
				<SkillSection />
				<WorkExpSection />
				<EducationSection />
				<CertificateSection />
			</section>
		</main>
	);
}
