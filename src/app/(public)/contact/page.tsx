import ContactForm from '../../components/ContactForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Contact Me | Hire a Developer',
	description:
		'Get in touch for freelance opportunities, job inquiries, or collaborations. Send me a message directly.',
};

export default function Contact() {
	return (
		<section className="w-full">
			<ContactForm />
		</section>
	);
}
