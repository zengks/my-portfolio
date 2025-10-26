import UserAbout from './components/UserAbout';
import SideBar from './components/SideBar';
import WorkExpSection from './components/WorkExpSection';
import EducationSection from './components/EducationSection';
import { Suspense } from 'react';

export const revalidate = 3600;

export default async function Home() {
	return (
		<div>
			<main className="flex justify-start items-center gap-20">
				<section>
					<Suspense fallback={<div>Loading...</div>}>
						<SideBar />
					</Suspense>
				</section>
				<section className="flex-70/100 mr-30">
					<Suspense fallback={<div>Loading...</div>}>
						<UserAbout />
					</Suspense>
					<Suspense fallback={<div>Loading...</div>}>
						<WorkExpSection />
					</Suspense>
					<Suspense fallback={<div>Loading...</div>}>
						<EducationSection />
					</Suspense>
				</section>
			</main>
		</div>
	);
}
