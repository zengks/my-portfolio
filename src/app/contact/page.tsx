import SideBar from '../components/SideBar';
import ContactForm from '../components/ContactForm';

export default function Contact() {
	return (
		<main className="flex flex-col md:flex-row">
			<section className="w-full md:w-1/4">
				<SideBar />
			</section>

			<section className="w-full md:w-3/4">
				<ContactForm />
			</section>
		</main>
	);
}
