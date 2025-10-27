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
			<main className="flex justify-around">
				<section className="w-1/3 sticky top-50 self-start">
					<Suspense fallback={<div>Loading...</div>}>
						<SideBar />
					</Suspense>
				</section>
				<section className="w-2/3">
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
