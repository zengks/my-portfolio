import { getUserAbout } from '@/controllers/userAboutController';
import SideBar from '../components/SideBar';

import selfiePhoto from 'src/assets/images/selfie-portrait.jpg';
import Image from 'next/image';

export default async function About() {
	const userAboutContent = await getUserAbout('zengks');
	return (
		<main className="flex">
			<section className="w-1/4">
				<SideBar />
			</section>
			<section className="w-3/4">
				<section className="section-container text-wrap">
					<p className="section-title">Hi, I&apos;m Steven</p>
					<div className="flex justify-between gap-8">
						{userAboutContent && userAboutContent.aboutUser !== null ? (
							<p>{userAboutContent?.aboutUser ? userAboutContent?.aboutUser : 'Loading...'}</p>
						) : (
							<p>Nothing retrieved</p>
						)}

						<Image src={selfiePhoto} alt="selfie photo" width={132} />
					</div>
				</section>
				<section className="section-container text-wrap">
					<p className="section-title">Why Me?</p>
					<p>
						My philosophy is that performance and experience are two sides of the same coin.
						I&apos;m driven to build full-stack applications that are not only technically efficient
						but also beautiful and intuitive to use.
					</p>
					<p>
						I&apos;m passionate about building the entire user journey. I love the challenge of
						architecture a robust backend and connecting it to a fast, pixel-perfect React front-end
						that makes a user&apos;s life easier.
					</p>
					<p>
						I believe that great software is built when technical skill meets human-centric design.
						My goal is to write clean, scalable code that translates directly into a flawless user
						experience.
					</p>
				</section>
				<section className="section-container text-wrap">
					<p className="section-title">When I&apos;m not Coding</p>
					<p>
						Away from the keyboard, I&apos;m always looking for a new challenge. You&apos;ll usually
						find me:
					</p>
					<ul className="list-disc list-inside">
						<li>
							On the court: I&apos;m an avid badminton player. It&apos;s my favorite way to stay
							active, sharpen my focus, and engage in some friendly competition.
						</li>
						<li>
							Watching on YouTube: I&apos;m a huge car enthusiast. I love everything from classic
							combustion Engine powered machines to the latest in EV technology.
						</li>
						<li>
							Learning what&apos;s next: My curiosity doesn&apos;t stop at 5 PM. I genuinely enjoy
							exploring trending tech, tinkering with new coding frameworks, and seeing what&apos;s
							just over the horizon in the web development world.
						</li>
					</ul>
				</section>
				<section className="section-container text-wrap">
					<p className="section-title">Call to Action</p>
					<p>
						My work is just one part of my story. If you&apos;re interested in learning more, you
						can check out my projects, view my full resume, or connect with me on LinkedIn or via
						email. I&apos;m open to new opportunities and always happy to chat about technology.
					</p>
				</section>
			</section>
		</main>
	);
}
