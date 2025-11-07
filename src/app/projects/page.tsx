import SideBar from '../components/SideBar';
import ProjectList from '../components/projects/ProjectList';

export default function Projects() {
	return (
		<main className="flex">
			<section className="w-1/4">
				<SideBar />
			</section>
			<section className="w-3/4">
				<section className="section-container">
					<p className="section-title">Projects</p>
					<ProjectList />
				</section>
			</section>
		</main>
	);
}
