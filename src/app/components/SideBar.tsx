import Image from 'next/image';
import Link from 'next/link';

import emojiPhoto from 'src/assets/images/emoji.png';
import linkedInIcon from 'src/assets/icons/linkedin.svg';
import githubIcon from 'src/assets/icons/github.svg';
import emailIcon from 'src/assets/icons/email.svg';
import locationIcon from 'src/assets/icons/location.svg';
import resumeIcon from 'src/assets/icons/resume.svg';
import contactMeIcon from 'src/assets/icons/contactMe.svg';
import jobIcon from 'src/assets/icons/job.svg';
import userIcon from 'src/assets/icons/user.svg';

import { getUserProfile } from '@/controllers/userProfileController';

const socialIconSize = {
	width: 30,
	height: 30,
};

const infoIconSize = {
	width: 22,
	height: 22,
};

export default async function SideBar() {
	const profileData = await getUserProfile();
	return (
		<aside className="section-sidebar flex flex-col justify-center items-center gap-8 relative">
			<Image src={emojiPhoto} alt="my emoji style" width={120} priority />

			<section className="mt-3">
				<div className="flex justify-start items-center gap-2">
					<Image
						src={userIcon}
						alt="User Icon"
						width={infoIconSize.width}
						height={infoIconSize.height}
					/>
					<p>
						{profileData ? `${profileData.firstName} ${profileData.lastName || ''}` : 'Loading...'}
					</p>
				</div>

				<div className="flex justify-start items-center gap-2">
					<Image
						src={jobIcon}
						alt="Job Icon"
						width={infoIconSize.width}
						height={infoIconSize.height}
					/>
					<p>FullStack Developer</p>
				</div>
			</section>

			<section className="flex justify-center items-center gap-5">
				<Image
					src={linkedInIcon}
					alt="LinkedIn Icon"
					width={socialIconSize.width}
					height={socialIconSize.height}
				/>
				<Image
					src={githubIcon}
					alt="GitHub Icon"
					width={socialIconSize.width}
					height={socialIconSize.height}
				/>
			</section>

			<section>
				<div className="flex justify-start items-center gap-2">
					<Image
						src={emailIcon}
						alt="Email Icon"
						width={infoIconSize.width}
						height={infoIconSize.height}
					/>
					<p>{profileData ? profileData.email : 'Loading...'}</p>
				</div>
				<div className="flex justify-start items-center gap-2">
					<Image
						src={locationIcon}
						alt="Location Icon"
						width={infoIconSize.width}
						height={infoIconSize.height}
					/>
					<p>Vancouver, BC</p>
				</div>
			</section>

			<section>
				<div className="flex justify-start items-center gap-2 mb-2">
					<Image
						src={contactMeIcon}
						alt="Contact Me Icon"
						width={infoIconSize.width}
						height={infoIconSize.height}
					/>
					<Link href="/contact">Contact Me</Link>
				</div>
				<div className="flex justify-start items-center gap-2">
					<Image
						src={resumeIcon}
						alt="Resume Icon"
						width={infoIconSize.width}
						height={infoIconSize.height}
					/>
					<p>Download Resume</p>
				</div>
			</section>
		</aside>
	);
}
