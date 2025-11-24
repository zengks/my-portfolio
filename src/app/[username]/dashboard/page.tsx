'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { SignOutButton } from '@/app/components/UI/AuthButtons';
import { User } from 'types/userType';
import { SKILLS_MAP } from '@/lib/constant';

import EducationModal from '@/app/components/modalWindows/EducationModal';
import WorkExpModal from '@/app/components/modalWindows/WorkExpModal';
import type { Education } from 'types/educationType';
import type { WorkExperience } from 'types/workExpType';

export default function UsersPage() {
	const { data: session, status } = useSession();

	const [activeModal, setActiveModal] = useState<string | null>(null); // 'addEducation', 'updateEducation', "edit"

	const router = useRouter();

	const [loading, setLoading] = useState<boolean>(false);
	const [currentUserData, setCurrentUserData] = useState<User | null>(null);
	const [selectedEducation, setSelectedEducation] = useState<Education | null>(null);
	const [selectedWorkExp, setSelectedWorkExp] = useState<WorkExperience | null>(null);

	const username = session?.user?.username;

	const fetchCurrentUserData = async () => {
		try {
			console.log('fetching inside');
			const res = await fetch(`/api/users/${username}/dashboard`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			console.log('res data fetched: ', res);

			if (res.ok) {
				const data = await res.json();
				console.log('dashboard received data', data);
				setCurrentUserData(data.user);
			} else {
				console.log('failed to get user');
			}
		} catch (error) {
			console.log('Failed to fetch:', error);
		}
	};

	useEffect(() => {
		if (status === 'unauthenticated') {
			router.replace('/users/login');
		}

		if (status === 'loading') {
			setLoading(true);
		} else {
			setLoading(false);
		}

		if (status === 'authenticated') {
			console.log('fetching now...');
			fetchCurrentUserData();
		}
	}, [router, status, username]);

	const closeModal = () => {
		setActiveModal(null);
		setSelectedEducation(null);
		setSelectedWorkExp(null);
		fetchCurrentUserData();
	};

	const handleDeleteEducation = async (educationId: number) => {
		try {
			const response = await fetch(`/api/users/${username}/education`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(educationId),
			});

			if (!response.ok) {
				throw new Error('Operation Failed!');
			}
		} catch (error) {
			console.log(error);
		} finally {
			fetchCurrentUserData();
		}
	};

	const handleDeleteWorkExp = async (workExpId: number) => {
		try {
			const response = await fetch(`/api/users/${username}/work`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(workExpId),
			});

			if (!response.ok) {
				throw new Error('Operation Failed!');
			}
		} catch (error) {
			console.log(error);
		} finally {
			fetchCurrentUserData();
		}
	};

	return (
		<>
			{loading && (
				<section className="section-container section-card">Loading current user...</section>
			)}
			{status === 'authenticated' && currentUserData && (
				<>
					<section className="section-container section-card">
						<div className="flex justify-between items-center section-title">
							<p>
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
						<div className="section-title flex justify-between items-center">
							<div>Education</div>
							<button onClick={() => setActiveModal('education')}>Add</button>
						</div>
						{currentUserData.education && currentUserData.education.length > 0 ? (
							<>
								{currentUserData.education.map((edu) => (
									<div key={edu.id} className="border-b mb-5">
										<p>{edu.school}</p>
										<p>{edu.degree}</p>
										<p>{edu.fieldOfStudy}</p>
										<p>{edu.startYear}</p>
										<p>{edu.endYear === 0 ? edu.endYear : 'Present'}</p>
										<button
											onClick={() => {
												setActiveModal('education');
												const educationToEdit: Education = {
													id: edu.id,
													school: edu.school,
													degree: edu.degree,
													fieldOfStudy: edu.fieldOfStudy,
													startYear: edu.startYear,
													endYear: edu.endYear ?? null,
													gpa: edu.gpa,
													description: edu.description,
												};
												setSelectedEducation(educationToEdit);
											}}
										>
											Edit
										</button>
										<button onClick={() => handleDeleteEducation(edu.id)}>Delete</button>
										<br />
									</div>
								))}
							</>
						) : (
							'No Education History'
						)}
					</section>

					<EducationModal
						isOpen={activeModal === 'education'}
						closeModal={closeModal}
						username={username!}
						selectedEducation={selectedEducation}
					/>

					<section className="section-container section-card">
						<div className="section-title flex justify-between items-center">
							<div>Work</div>
							<button onClick={() => setActiveModal('workExperience')}>Add</button>
						</div>
						{currentUserData.workExperience && currentUserData.workExperience.length > 0 ? (
							<>
								{currentUserData.workExperience.map((work) => (
									<div key={work.id} className="border-b mb-5">
										<p>{work.jobTitle}</p>
										<p>{work.company}</p>
										<p>{work.startYear}</p>
										<p>{work.endYear === 0 ? 'Present' : work.endYear}</p>
										<button
											onClick={() => {
												setActiveModal('workExperience');
												const workExpToEdit: WorkExperience = {
													id: work.id,
													jobTitle: work.jobTitle,
													company: work.company,
													startYear: work.startYear,
													endYear: work.endYear ?? null,
													description: work.description ?? null,
												};
												setSelectedWorkExp(workExpToEdit);
											}}
										>
											Edit
										</button>
										<button onClick={() => handleDeleteWorkExp(work.id)}>Delete</button>
										<br />
									</div>
								))}
							</>
						) : (
							'No Job History'
						)}
					</section>

					<WorkExpModal
						isOpen={activeModal === 'workExperience'}
						closeModal={closeModal}
						username={username!}
						selectedWorkExp={selectedWorkExp}
					/>

					<section className="section-container section-card">
						<p className="section-title">Projects</p>
						{currentUserData.project && currentUserData.project.length > 0 ? (
							<>
								{currentUserData.project.map((each) => (
									<div key={each.id} className="border-b mb-5">
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
