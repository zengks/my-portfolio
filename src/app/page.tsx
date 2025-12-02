import UserAbout from './components/landingPage/UserAbout';
import WorkExpSection from './components/landingPage/WorkExpSection';
import EducationSection from './components/landingPage/EducationSection';
import CertificateSection from './components/landingPage/CertificateSection';
import SkillSection from './components/landingPage/SkillSection';

export default async function Home() {
	return (
		<section>
			<UserAbout />
			<SkillSection />
			<WorkExpSection />
			<EducationSection />
			<CertificateSection />
		</section>
	);
}
