import UserAbout from './components/UserAbout';
import WorkExpSection from './components/WorkExpSection';
import EducationSection from './components/EducationSection';
import CertificateSection from './components/CertificateSection';
import SkillSection from './components/SkillSection';

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
