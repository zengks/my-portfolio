import Image from 'next/image';
import { getUserAbout } from '@/controllers/userAboutController';
import SkillRow from '../components/SkillRow';

import selfieImage from '@/assets/images/selfie.png';
import {
	MERN_STACK,
	MOBILE_DEV_SKILLS,
	NEXT_STACK,
	PROJECT_MANAGEMENT_TOOLS,
} from '@/lib/constant';

const iconWidth = 30;

export default async function About() {
	const userAboutContent = await getUserAbout('zengks');
	return userAboutContent ? (
		<div className="glass-container glass-section w-10/12 mx-auto">
			<section className="flex justify-center items-center">
				<Image src={selfieImage} alt="Image of Myself" width={200} />
			</section>
			<section className="section-container text-wrap">
				<p className="section-title">Hi, I&apos;m Steven</p>
				<p>{userAboutContent.aboutUser ? userAboutContent.aboutUser : 'Loading...'}</p>
			</section>
			<section className="section-container text-wrap">
				<p className="section-title">Why Me?</p>
				<p>
					My philosophy is that performance and experience are two sides of the same coin. I&apos;m
					driven to build full-stack applications that are not only technically efficient but also
					beautiful and intuitive to use.
				</p>
				<p>
					I&apos;m passionate about building the entire user journey. I love the challenge of
					architecture a robust backend and connecting it to a fast, pixel-perfect React front-end
					that makes a user&apos;s life easier.
				</p>
				<p>
					I believe that great software is built when technical skill meets human-centric design. My
					goal is to write clean, scalable code that translates directly into a flawless user
					experience.
				</p>
			</section>
			<section className="section-container text-wrap">
				<p className="section-title">Skills / Toolkit</p>
				<div>
					<p>MERN Stack</p>
					<SkillRow skillsArray={MERN_STACK} iconWidth={iconWidth} />
				</div>
				<div>
					<p>NextJS Stack</p>
					<SkillRow skillsArray={NEXT_STACK} iconWidth={iconWidth} />
				</div>
				<div>
					<p>Mobile App Development</p>
					<SkillRow skillsArray={MOBILE_DEV_SKILLS} iconWidth={iconWidth} />
				</div>
				<div>
					<p>Project Management Tools</p>
					<SkillRow skillsArray={PROJECT_MANAGEMENT_TOOLS} iconWidth={iconWidth} />
				</div>
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
						In the garage (or on a blog): I&apos;m a huge car enthusiast. I love everything from
						classic restorations to the latest in EV technology.
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
					My work is just one part of my story. If you&apos;re interested in learning more, you can
					check out my projects, view my full resume, or connect with me on LinkedIn or via email.
					I&apos;m open to new opportunities and always happy to chat about technology.
				</p>
			</section>
		</div>
	) : (
		<div></div>
	);
}
