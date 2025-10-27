import UserAbout from './components/UserAbout';
import SideBar from './components/SideBar';
import WorkExpSection from './components/WorkExpSection';
import EducationSection from './components/EducationSection';
import CertificateSection from './components/CertificateSection';
import SkillSection from './components/SkillSection';

import { Suspense } from 'react';

export const revalidate = 3600;

export default async function Home() {
	return (
		<div>
			<main className="flex justify-between">
				<section>
					<Suspense fallback={<div>Loading...</div>}>
						<SideBar />
					</Suspense>
				</section>
				<section>
					<Suspense fallback={<div>Loading...</div>}>
						<UserAbout />
					</Suspense>
					<Suspense fallback={<div>Loading...</div>}>
						<SkillSection />
					</Suspense>
					<Suspense fallback={<div>Loading...</div>}>
						<WorkExpSection />
					</Suspense>
					<Suspense fallback={<div>Loading...</div>}>
						<EducationSection />
					</Suspense>
					<Suspense fallback={<div>Loading...</div>}>
						<CertificateSection />
					</Suspense>
				</section>
			</main>
		</div>
	);
}
