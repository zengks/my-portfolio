import { getUserAbout } from '@/controllers/userAboutController';
import Markdown from 'react-markdown';

export default async function About() {
	const userAbout = await getUserAbout('zengks');
	const sortedAbout = userAbout?.sort((a, b) => a.id - b.id);
	return (
		<>
			{sortedAbout &&
				sortedAbout.length > 0 &&
				sortedAbout.map((each) => (
					<section key={each.id} className="section-container section-card text-wrap">
						<p className="section-title">{each.header}</p>
						<div className="prose prose-slate list-disc max-w-none">
							<Markdown
								components={{
									ul: ({ ...props }) => <ul className="list-disc pl-5 space-y-1" {...props} />,
									ol: ({ ...props }) => <ol className="list-decimal pl-5 space-y-1" {...props} />,
									li: ({ ...props }) => <li className="pl-1" {...props} />,
								}}
							>
								{each.aboutContent}
							</Markdown>
						</div>
					</section>
				))}
		</>
	);
}
