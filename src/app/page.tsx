import UserAbout from './components/UserAbout';
import SideBar from './components/SideBar';
import WorkExpSection from './components/WorkExpSection';
import EducationSection from './components/EducationSection';
import { Suspense } from 'react';

export const revalidate = 3600;

export default async function Home() {
	return (
		<div>
			<main className="flex">
				<section className="flex-30/100 flex flex-col justify-between items-center">
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
