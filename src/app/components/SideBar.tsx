import Image from 'next/image';
import Link from 'next/link';

import selfieRounded from 'src/assets/images/selfie-rounded.png';
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
	width: 25,
	height: 25,
};

const infoIconSize = {
	width: 22,
	height: 22,
};

export default async function SideBar() {
	const profileData = await getUserProfile();
	return (
		<aside className="section-sidebar flex flex-col justify-center sticky top-24 self-start tracking-wide">
			<section className="flex items-center justify-center">
				<Image src={selfieRounded} alt="selfie emoji photo" width={160} priority />
			</section>

			<section className="section-sidebar-row">
				<div className="section-sidebar-row-item">
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

				<div className="section-sidebar-row-item">
					<Image
						src={jobIcon}
						alt="Job Icon"
						width={infoIconSize.width}
						height={infoIconSize.height}
					/>
					<p>{profileData ? profileData.jobTitle : 'Loading...'}</p>
				</div>
			</section>

			<section className="section-sidebar-row">
				<div className="section-sidebar-row-item">
					<Image
						src={emailIcon}
						alt="Email Icon"
						width={infoIconSize.width}
						height={infoIconSize.height}
					/>
					<p>{profileData ? profileData.email : 'Loading...'}</p>
				</div>
				<div className="section-sidebar-row-item">
					<Image
						src={locationIcon}
						alt="Location Icon"
						width={infoIconSize.width}
						height={infoIconSize.height}
					/>
					<p>
						{profileData
							? `${profileData.city}, ${profileData.province}, ${profileData.country}`
							: 'Loading...'}
					</p>
				</div>
			</section>

			<section className="section-sidebar-row">
				<div className="section-sidebar-row-item">
					<Image
						src={contactMeIcon}
						alt="Contact Me Icon"
						width={infoIconSize.width}
						height={infoIconSize.height}
					/>
					<Link href="/contact">Contact Me</Link>
				</div>
				<div className="section-sidebar-row-item">
					<Image
						src={resumeIcon}
						alt="Resume Icon"
						width={infoIconSize.width}
						height={infoIconSize.height}
					/>

					<p>
						{profileData?.resumeUrl ? (
							<a href={profileData.resumeUrl} target="_blank" rel="noopener noreferrer">
								View Resume
							</a>
						) : (
							<span>No Resume Available</span>
						)}
					</p>
				</div>
			</section>
			<section className="section-sidebar-row">
				<div className="section-sidebar-row-item">
					<Image
						src={linkedInIcon}
						alt="LinkedIn Icon"
						width={socialIconSize.width}
						height={socialIconSize.height}
					/>
					<Link href={profileData?.linkedInUrl ?? '/'}>LinkedIn</Link>
				</div>
				<div className="section-sidebar-row-item">
					<Image
						src={githubIcon}
						alt="GitHub Icon"
						width={socialIconSize.width}
						height={socialIconSize.height}
					/>
					<Link href={profileData?.githubUrl ?? '/'}>GitHub</Link>
				</div>
			</section>
		</aside>
	);
}
