'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { SignOutButton } from '@/app/components/UI/AuthButtons';
import { fetchUserByUsername } from '@/controllers/userController';
import { User } from 'types/userType';
import { SKILLS_MAP } from '@/lib/constant';

export default function UsersPage() {
	const { data: session, status } = useSession();

	const router = useRouter();

	const [loading, setLoading] = useState<boolean>(false);
	const [currentUserData, setCurrentUserData] = useState<User | undefined>();

	const username = session?.user?.username;

	useEffect(() => {
		if (status === 'unauthenticated') {
			router.replace('/users/login');
		}

		if (status === 'loading') {
			setLoading(true);
		} else {
			setLoading(false);
		}

		const currentUserData = async (username: string) => {
			try {
				const res = await fetchUserByUsername(username);
				setCurrentUserData(res);
			} catch (error) {
				console.log(error);
			}
		};

		if (status === 'authenticated' && username) {
			currentUserData(username);
		}
	}, [router, status, username]);

	return (
		<>
			{loading && (
				<section className="section-container section-card">Loading current user...</section>
			)}
			{status === 'authenticated' && currentUserData && (
				<>
					<section className="section-container section-card">
						<div className="flex justify-between items-center">
							<p className="text-2xl">
								Welcome,{' '}
								{`${currentUserData.profile?.firstName} ${currentUserData.profile?.lastName}`}
							</p>
							<SignOutButton />
						</div>
						<p>ID: {session?.user?.id}</p>
						<p>Username: {session.user.username}</p>
						<p>Role: {session?.user?.role}</p>
					</section>

					<section className="section-container section-card">
						<p className="section-title">Education</p>
						{currentUserData.education.length > 0 ? (
							<>
								{currentUserData.education.map((edu) => (
									<div key={edu.id} className="border-b-1 mb-5">
										<p>{edu.school}</p>
										<p>{edu.degree}</p>
										<p>{edu.fieldOfStudy}</p>
										<p>{edu.startDate.toString()}</p>
										<p>{edu.endDate?.toString() ?? 'Present'}</p>
										<br />
									</div>
								))}
							</>
						) : (
							'No Education History'
						)}
					</section>

					<section className="section-container section-card">
						<p className="section-title">Work</p>
						{currentUserData.workExperience.length > 0 ? (
							<>
								{currentUserData.workExperience.map((work) => (
									<div key={work.id} className="border-b-1 mb-5">
										<p>{work.jobTitle}</p>
										<p>{work.company}</p>
										<p>{work.startDate.toString()}</p>
										<p>{work.endDate?.toString() ?? 'Present'}</p>
										<p>{work.description}</p>
									</div>
								))}
							</>
						) : (
							'No Job History'
						)}
					</section>

					<section className="section-container section-card">
						<p className="section-title">Projects</p>
						{currentUserData.project.length > 0 ? (
							<>
								{currentUserData.project.map((each) => (
									<div key={each.id} className="border-b-1 mb-5">
										<p>{each.title}</p>
										<p>{each.repo_link}</p>

										{/* Needs to add starting date to the schema */}
										{/* <p>{each.startedAt.toString()}</p> */}

										<p>{each.preview_image_link}</p>
										<p>
											{each.tech_stack.length > 0 ? (
												<span className="flex items-center gap-3">
													{each.tech_stack.map((each, index: number) => (
														<Image
															key={index}
															src={SKILLS_MAP[each as keyof typeof SKILLS_MAP]}
															alt={`${each} icon`}
															height={32}
															className="size-6 md:size-8"
														/>
													))}
												</span>
											) : (
												''
											)}
										</p>
										<p>{each.description}</p>
										<br />
									</div>
								))}
							</>
						) : (
							'No Projects'
						)}
					</section>

					<section className="section-container section-card">
						<p className="section-title">Skills</p>
					</section>
				</>
			)}
		</>
	);
}
