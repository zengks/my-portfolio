import WorkAccordion from '../components/WorkAccordion';
import SideBar from '../components/SideBar';

export default function Work() {
	return (
		<main className="flex">
			<section className="w-1/4">
				<SideBar />
			</section>
			<section className="w-3/4">
				<section className="section-container">
					<p className="section-title">Work History</p>
					<WorkAccordion />
				</section>
			</section>
		</main>
	);
}
