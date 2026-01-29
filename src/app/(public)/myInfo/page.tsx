import { getUserProfile } from '@/controllers/userProfileController';
import Image from 'next/image';

import emailIcon from 'src/assets/icons/email.svg';
import locationIcon from 'src/assets/icons/location.svg';
import resumeIcon from 'src/assets/icons/resume.svg';
import contactMeIcon from 'src/assets/icons/contactMe.svg';
import linkedInIcon from 'src/assets/icons/linkedin.svg';
import githubIcon from 'src/assets/icons/github.svg';
import NewTabIcon from '@/assets/icons/newTab.svg';
import userIcon from 'src/assets/icons/user.svg';
import jobIcon from 'src/assets/icons/job.svg';
import Link from 'next/link';

const socialIconSize = {
	width: 25,
	height: 25,
};

const infoIconSize = {
	width: 22,
	height: 22,
};

export default async function MyInfo() {
	const profileData = await getUserProfile();

	return (
		<div className="section-container">
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
						{profileData?.resumeUrl || profileData?.resumeUrl?.includes('.pdf') ? (
							<a
								href={profileData.resumeUrl}
								className="flex items-center hover:underline"
								target="_blank"
								rel="noopener noreferrer"
							>
								View Resume <Image src={NewTabIcon} alt="New Tab Icon" width={21} />
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
		</div>
	);
}
