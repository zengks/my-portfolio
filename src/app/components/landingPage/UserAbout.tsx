import { getUserAbout } from '@/controllers/userAboutController';
import ViewMore from '../ViewMoreLink';
import Markdown from 'react-markdown';

export default async function AboutSection() {
	const userAbout = await getUserAbout('zengks');
	return (
		<section className="section-container section-card relative">
			<p className="section-title">About Myself</p>
			{userAbout && userAbout.length > 0 && (
				<>
					<p className="section-title">{userAbout[0].header}</p>
					<div className="text-wrap prose prose-slate list-disc max-w-none">
						<Markdown
							components={{
								ul: ({ ...props }) => <ul className="list-disc pl-5 space-y-1" {...props} />,
								ol: ({ ...props }) => <ol className="list-decimal pl-5 space-y-1" {...props} />,
								li: ({ ...props }) => <li className="pl-1" {...props} />,
							}}
						>
							{userAbout[0].aboutContent}
						</Markdown>
					</div>
				</>
			)}
			<ViewMore target_url="/about" />
		</section>
	);
}
