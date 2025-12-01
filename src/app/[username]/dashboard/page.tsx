'use client';
import { useEffect, useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { SignOutButton } from '@/app/components/UI/AuthButtons';
import type { User } from 'types/userType';

import EducationModal from '@/app/components/modalWindows/EducationModal';
import WorkExpModal from '@/app/components/modalWindows/WorkExpModal';
import ProjectModal from '@/app/components/modalWindows/ProjectModal';
import ProfileModal from '@/app/components/modalWindows/ProfileModal';
import CertificateModal from '@/app/components/modalWindows/CertificateModal';
import SkillModal from '@/app/components/modalWindows/SkillModal';
import AboutUserModal from '@/app/components/modalWindows/AboutUserModal';

import type { Education } from 'types/educationType';
import type { WorkExperience } from 'types/workExpType';
import type { Project } from 'types/projectType';
import type { Profile } from 'types/profileType';
import type { Certificate } from 'types/certificateType';
import type { Skill } from 'types/skillType';
import type { AboutUser } from 'types/aboutUserType';

import WorkAccordion from '@/app/components/WorkAccordion';
import EducationAccordion from '@/app/components/EducationAccordion';
import ProjectAccordion from '@/app/components/ProjectAccordion';
import CertificateAccordion from '@/app/components/CertificateAccordion';
import SkillsAccordion from '@/app/components/SkillsAccordion';

const ADD_BTN_STYLE =
	'px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors shadow-sm';
const BUTTON_WRAPPER_STYLE = 'flex justify-end items-center gap-3 mt-3';
const EDIT_BTN_STYLE =
	'px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100 transition-colors';
const DELETE_BTN_STYLE =
	'px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors';

export default function UsersPage() {
	const { data: session, status } = useSession();

	const router = useRouter();

	const [activeModal, setActiveModal] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [currentUserData, setCurrentUserData] = useState<User | null>(null);
	const [selectedEducation, setSelectedEducation] = useState<Education | null>(null);
	const [selectedWorkExp, setSelectedWorkExp] = useState<WorkExperience | null>(null);
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);
	const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
	const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
	const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
	const [selectedAboutUserSection, setSelectedAboutUserSection] = useState<AboutUser | null>(null);

	const username = session?.user?.username;

	const fetchCurrentUserData = async () => {
		try {
			const res = await fetch(`/api/users/${username}/dashboard`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (res.ok) {
				const data = await res.json();
				console.log('dashboard received data', data);
				setCurrentUserData(data.user);
			} else {
				console.log('Failed to get user data.');
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
			fetchCurrentUserData();
		}
	}, [router, status, username]);

	const closeModal = () => {
		setActiveModal(null);
		setSelectedProfile(null);
		setSelectedEducation(null);
		setSelectedWorkExp(null);
		setSelectedProject(null);
		setSelectedCertificate(null);
		setSelectedSkill(null);
		setSelectedAboutUserSection(null);
		fetchCurrentUserData();
	};

	const uniqueSkillCategories = useMemo(() => {
		if (!currentUserData?.skills) return [];
		const categories = currentUserData.skills.map((s) => s.categoryName);
		return Array.from(new Set(categories));
	}, [currentUserData]);

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

	const handleDeleteProject = async (projectId: number) => {
		try {
			const response = await fetch(`/api/users/${username}/project`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(projectId),
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

	const handleDeleteCertificate = async (certificateId: number) => {
		try {
			const response = await fetch(`/api/users/${username}/certificate`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(certificateId),
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

	const handleDeleteSkill = async (skillId: number) => {
		try {
			const response = await fetch(`/api/users/${username}/skill`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(skillId),
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

	const handleDeleteAboutUserSection = async (aboutUserId: number) => {
		try {
			const response = await fetch(`/api/users/${username}/aboutUser`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(aboutUserId),
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
						{/* Header Section */}
						<div className="flex justify-between items-start mb-6 border-b border-gray-100 pb-4">
							<div>
								<h2 className="text-2xl font-bold text-gray-800">
									Welcome, {currentUserData.profile?.firstName}
								</h2>
								<p className="text-sm text-gray-500 mt-1">
									Manage your account details and portfolio settings.
								</p>
							</div>
							<SignOutButton />
						</div>

						{currentUserData.profile && (
							<div className="bg-slate-50 rounded-xl p-6 border border-slate-200 shadow-sm">
								{/* Main Grid Layout */}
								<div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
									{/* Left Column: Personal Info */}
									<div className="space-y-4">
										<h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-slate-200 pb-1 mb-2">
											Personal Information
										</h3>

										<div className="grid grid-cols-3 gap-2 text-sm">
											<span className="text-gray-500 col-span-1">Username:</span>
											<span className="font-medium text-gray-800 col-span-2">
												{currentUserData.profile.username}
											</span>
										</div>

										<div className="grid grid-cols-3 gap-2 text-sm">
											<span className="text-gray-500 col-span-1">Email:</span>
											<span className="font-medium text-gray-800 col-span-2 break-all">
												{currentUserData.profile.email}
											</span>
										</div>

										<div className="grid grid-cols-3 gap-2 text-sm">
											<span className="text-gray-500 col-span-1">Role:</span>
											<span className="font-medium text-gray-800 col-span-2 capitalize">
												{session?.user?.role}
											</span>
										</div>

										<div className="grid grid-cols-3 gap-2 text-sm">
											<span className="text-gray-500 col-span-1">User ID:</span>
											<span className="font-mono text-gray-600 col-span-2 text-xs bg-slate-100 p-1 rounded w-fit">
												{currentUserData.profile.userId}
											</span>
										</div>
									</div>

									{/* Right Column: Professional Info */}
									<div className="space-y-4">
										<h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-slate-200 pb-1 mb-2">
											Professional Details
										</h3>

										<div className="grid grid-cols-3 gap-2 text-sm">
											<span className="text-gray-500 col-span-1">Job Title:</span>
											<span className="font-medium text-gray-800 col-span-2">
												{currentUserData.profile.jobTitle || 'Not set'}
											</span>
										</div>

										<div className="grid grid-cols-3 gap-2 text-sm">
											<span className="text-gray-500 col-span-1">Location:</span>
											<span className="font-medium text-gray-800 col-span-2">
												{[
													currentUserData.profile.city,
													currentUserData.profile.province,
													currentUserData.profile.country,
												]
													.filter(Boolean)
													.join(', ') || 'Not set'}
											</span>
										</div>

										<div className="grid grid-cols-3 gap-2 text-sm">
											<span className="text-gray-500 col-span-1">Bio Link:</span>
											<span className="font-medium text-gray-800 col-span-2 truncate">
												{currentUserData.profile.bioLink ? (
													<a
														href={currentUserData.profile.bioLink}
														target="_blank"
														className="hover:text-indigo-600 hover:underline"
													>
														{currentUserData.profile.bioLink}
													</a>
												) : (
													'Not set'
												)}
											</span>
										</div>
									</div>
								</div>

								{/* Links Footer Section */}
								<div className="mt-6 pt-4 border-t border-slate-200">
									<h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
										Links & Documents
									</h3>
									<div className="flex flex-wrap gap-4">
										{currentUserData.profile.linkedInUrl && (
											<a
												href={currentUserData.profile.linkedInUrl}
												target="_blank"
												className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-blue-700 hover:bg-blue-50 hover:border-blue-200 transition-colors"
											>
												<span>LinkedIn</span>
											</a>
										)}

										{currentUserData.profile.githubUrl && (
											<a
												href={currentUserData.profile.githubUrl}
												target="_blank"
												className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-800 hover:bg-gray-50 hover:border-gray-300 transition-colors"
											>
												<span>GitHub</span>
											</a>
										)}

										{currentUserData.profile.resumeUrl && (
											<a
												href={currentUserData.profile.resumeUrl}
												target="_blank"
												className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-indigo-700 hover:bg-indigo-50 hover:border-indigo-200 transition-colors"
											>
												<span>View Resume</span>
											</a>
										)}

										{!currentUserData.profile.linkedInUrl &&
											!currentUserData.profile.githubUrl &&
											!currentUserData.profile.resumeUrl && (
												<span className="text-sm text-gray-400 italic">
													No social links or resume added yet.
												</span>
											)}
									</div>
								</div>

								{/* Action Buttons */}
								<div className={BUTTON_WRAPPER_STYLE}>
									<button
										className={EDIT_BTN_STYLE}
										onClick={() => {
											if (!currentUserData.profile) return;
											setActiveModal('profile');
											const profileToEdit: Profile = {
												id: currentUserData.profile.id,
												userId: currentUserData.profile.userId,
												username: currentUserData.profile.username,
												firstName: currentUserData.profile.firstName,
												lastName: currentUserData.profile.lastName ?? '',
												email: currentUserData.profile.email ?? '',
												jobTitle: currentUserData.profile.jobTitle ?? '',
												bioLink: currentUserData.profile.bioLink ?? '',
												imageLink: currentUserData.profile.imageLink ?? '',
												city: currentUserData.profile.city ?? '',
												province: currentUserData.profile.province ?? '',
												country: currentUserData.profile.country ?? '',
												resumeUrl: currentUserData.profile.resumeUrl ?? '',
												linkedInUrl: currentUserData.profile.linkedInUrl ?? '',
												githubUrl: currentUserData.profile.githubUrl ?? '',
												aboutUser: currentUserData.profile.aboutUser ?? null,
											};
											setSelectedProfile(profileToEdit);
										}}
									>
										Edit Profile
									</button>
								</div>
							</div>
						)}
					</section>
					{/* <section className="section-container section-card">
						<div className="flex justify-between items-center section-title">
							<p>Welcome, {currentUserData.profile?.firstName}</p>
							<SignOutButton />
						</div>
						{currentUserData.profile && (
							<>
								<p>ID: {currentUserData.profile.userId}</p>
								<p>Username: {currentUserData.profile.username}</p>
								<p>Role: {session.user.role}</p>
								<p>Email: {currentUserData.profile.email}</p>
								<p>Job Title: {currentUserData.profile.jobTitle}</p>
								<p>City: {currentUserData.profile.city}</p>
								<p>Province: {currentUserData.profile.province}</p>
								<p>Country: {currentUserData.profile.country}</p>
								<p>LinkedIn Link: {currentUserData.profile.linkedInUrl}</p>
								<p>GitHub Link: {currentUserData.profile.githubUrl}</p>
								<p>Bio: {currentUserData.profile.bioLink}</p>
								<p>Resume: {currentUserData.profile.resumeUrl}</p>
								<div className={BUTTON_WRAPPER_STYLE}>
									<button
										className={EDIT_BTN_STYLE}
										onClick={() => {
											if (!currentUserData.profile) return;
											setActiveModal('profile');
											const profileToEdit: Profile = {
												id: currentUserData.profile.id,
												userId: currentUserData.profile.userId,
												username: currentUserData.profile.username,
												firstName: currentUserData.profile.firstName,
												lastName: currentUserData.profile.lastName ?? '',
												email: currentUserData.profile.email ?? '',
												jobTitle: currentUserData.profile.jobTitle ?? '',
												bioLink: currentUserData.profile.bioLink ?? '',
												imageLink: currentUserData.profile.imageLink ?? '',
												city: currentUserData.profile.city ?? '',
												province: currentUserData.profile.province ?? '',
												country: currentUserData.profile.country ?? '',
												resumeUrl: currentUserData.profile.resumeUrl ?? '',
												linkedInUrl: currentUserData.profile.linkedInUrl ?? '',
												githubUrl: currentUserData.profile.githubUrl ?? '',
												aboutUser: currentUserData.profile.aboutUser ?? null,
											};
											setSelectedProfile(profileToEdit);
										}}
									>
										Edit
									</button>
								</div>
							</>
						)}
					</section> */}

					<ProfileModal
						isOpen={activeModal === 'profile'}
						closeModal={closeModal}
						username={username!}
						selectedProfile={selectedProfile}
					/>

					<section className="section-container section-card">
						<div className="section-title flex justify-between items-center">
							<div>About User</div>
							<button className={ADD_BTN_STYLE} onClick={() => setActiveModal('aboutUser')}>
								Add
							</button>
						</div>
						{currentUserData.profile && currentUserData.profile.aboutUser.length > 0 && (
							<>
								{currentUserData.profile.aboutUser.map((each) => (
									<div key={each.id} className="mb-5">
										<p>{each.header}</p>
										<p>{each.aboutContent}</p>
										<div className={BUTTON_WRAPPER_STYLE}>
											<button
												className={EDIT_BTN_STYLE}
												onClick={() => {
													setActiveModal('aboutUser');
													const aboutUserSectionToEdit: AboutUser = {
														id: each.id,
														header: each.header,
														aboutContent: each.aboutContent,
													};
													setSelectedAboutUserSection(aboutUserSectionToEdit);
												}}
											>
												Edit
											</button>
											<button
												className={DELETE_BTN_STYLE}
												onClick={() => handleDeleteAboutUserSection(each.id)}
											>
												Delete
											</button>
										</div>
									</div>
								))}
							</>
						)}
					</section>

					<AboutUserModal
						isOpen={activeModal === 'aboutUser'}
						closeModal={closeModal}
						username={username!}
						selectedAboutUserSection={selectedAboutUserSection}
					/>

					<section className="section-container section-card">
						<div className="section-title flex justify-between items-center">
							<div>Education</div>
							<button className={ADD_BTN_STYLE} onClick={() => setActiveModal('education')}>
								Add
							</button>
						</div>
						{currentUserData.education && currentUserData.education.length > 0 ? (
							<>
								{currentUserData.education.map((edu) => (
									<div key={edu.id} className="mb-5">
										<EducationAccordion education={edu} />
										<div className={BUTTON_WRAPPER_STYLE}>
											<button
												className={EDIT_BTN_STYLE}
												onClick={() => {
													setActiveModal('education');
													const educationToEdit: Education = {
														id: edu.id,
														school: edu.school,
														degree: edu.degree,
														fieldOfStudy: edu.fieldOfStudy,
														schoolLogoUrl: edu.schoolLogoUrl ?? '',
														city: edu.city ?? '',
														province: edu.province ?? '',
														country: edu.country ?? '',
														startYear: edu.startYear,
														endYear: edu.endYear ?? null,
														gpa: edu.gpa,
														description: edu.description ?? '',
													};
													setSelectedEducation(educationToEdit);
												}}
											>
												Edit
											</button>
											<button
												className={DELETE_BTN_STYLE}
												onClick={() => handleDeleteEducation(edu.id)}
											>
												Delete
											</button>
										</div>
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
							<button className={ADD_BTN_STYLE} onClick={() => setActiveModal('workExperience')}>
								Add
							</button>
						</div>
						{currentUserData.workExperience && currentUserData.workExperience.length > 0 ? (
							<>
								{currentUserData.workExperience.map((work) => (
									<div key={work.id} className="mb-5">
										<WorkAccordion work={work} />
										<div className={BUTTON_WRAPPER_STYLE}>
											<button
												className={EDIT_BTN_STYLE}
												onClick={() => {
													setActiveModal('workExperience');
													const workExpToEdit: WorkExperience = {
														id: work.id,
														jobTitle: work.jobTitle,
														company: work.company,
														companyLogoUrl: work.companyLogoUrl,
														city: work.city,
														province: work.province,
														country: work.country,
														locationType: work.locationType,
														employmentType: work.employmentType,
														startYear: work.startYear,
														endYear: work.endYear ?? null,
														description: work.description ?? null,
													};
													setSelectedWorkExp(workExpToEdit);
												}}
											>
												Edit
											</button>
											<button
												className={DELETE_BTN_STYLE}
												onClick={() => handleDeleteWorkExp(work.id)}
											>
												Delete
											</button>
										</div>
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
						<div className="section-title flex justify-between items-center">
							<div>Project</div>
							<button className={ADD_BTN_STYLE} onClick={() => setActiveModal('project')}>
								Add
							</button>
						</div>
						{currentUserData.project && currentUserData.project.length > 0 ? (
							<>
								{currentUserData.project.map((each) => (
									<div key={each.id} className="mb-5">
										<ProjectAccordion project={each} />
										<div className={BUTTON_WRAPPER_STYLE}>
											<button
												className={EDIT_BTN_STYLE}
												onClick={() => {
													setActiveModal('project');
													const projectToEdit: Project = {
														id: each.id,
														title: each.title,
														repo_link: each.repo_link ?? null,
														description: each.description ?? null,
														project_link: each.project_link ?? null,
														preview_image_link: each.preview_image_link ?? null,
														tech_stack: each.tech_stack,
														projectYear: each.projectYear,
													};
													setSelectedProject(projectToEdit);
												}}
											>
												Edit
											</button>
											<button
												className={DELETE_BTN_STYLE}
												onClick={() => handleDeleteProject(each.id)}
											>
												Delete
											</button>
										</div>
									</div>
								))}
							</>
						) : (
							'No Projects'
						)}
					</section>

					<ProjectModal
						isOpen={activeModal === 'project'}
						closeModal={closeModal}
						username={username!}
						selectedProject={selectedProject}
					/>

					<section className="section-container section-card">
						<div className="section-title flex justify-between items-center">
							<div>Licenses & Certifications</div>
							<button className={ADD_BTN_STYLE} onClick={() => setActiveModal('certificate')}>
								Add
							</button>
						</div>
						{currentUserData.certificate && currentUserData.certificate.length > 0 ? (
							<>
								{currentUserData.certificate.map((each) => (
									<div key={each.id} className="mb-5">
										<CertificateAccordion cert={each} />
										<div className={BUTTON_WRAPPER_STYLE}>
											<button
												className={EDIT_BTN_STYLE}
												onClick={() => {
													setActiveModal('certificate');
													const certificateToEdit: Certificate = {
														id: each.id,
														name: each.name,
														issuingOrg: each.issuingOrg,
														companyLogoUrl: each.companyLogoUrl,
														dateIssued: each.dateIssued,
														dateExpired: each.dateExpired ?? null,
														credentialId: each.credentialId ?? null,
														credentialUrl: each.credentialUrl ?? null,
													};
													setSelectedCertificate(certificateToEdit);
												}}
											>
												Edit
											</button>
											<button
												className={DELETE_BTN_STYLE}
												onClick={() => handleDeleteCertificate(each.id)}
											>
												Delete
											</button>
										</div>
									</div>
								))}
							</>
						) : (
							<p>No Licenses & Certifications found</p>
						)}
					</section>

					<CertificateModal
						isOpen={activeModal === 'certificate'}
						closeModal={closeModal}
						username={username!}
						selectedCertificate={selectedCertificate}
					/>

					<section className="section-container section-card">
						<div className="section-title flex justify-between items-center">
							<div>Skills</div>
							<button className={ADD_BTN_STYLE} onClick={() => setActiveModal('skills')}>
								Add
							</button>
						</div>
						{currentUserData.skills && currentUserData.skills.length > 0 ? (
							<>
								{uniqueSkillCategories.map((eachCategory) => (
									<div
										key={eachCategory}
										className="mb-5 rounded-lg border py-2 px-4 border-gray-200 bg-neutral-50 shadow-sm "
									>
										<p className="text-lg font-light tracking-wider text-gray-700 uppercase mb-3">
											{eachCategory}
										</p>
										{currentUserData.skills
											.filter((skill) => skill.categoryName === eachCategory)
											.map((each, index) => (
												<div key={index} className="mb-4">
													<SkillsAccordion skill={each} />
													<div className={BUTTON_WRAPPER_STYLE}>
														<button
															className={EDIT_BTN_STYLE}
															onClick={() => {
																setActiveModal('skills');
																const skillToEdit: Skill = {
																	id: each.id,
																	categoryName: each.categoryName,
																	subCategoryName: each.subCategoryName,
																	skills: each.skills,
																	description: each.description,
																};
																setSelectedSkill(skillToEdit);
															}}
														>
															Edit
														</button>
														<button
															className={DELETE_BTN_STYLE}
															onClick={() => handleDeleteSkill(each.id)}
														>
															Delete
														</button>
													</div>
												</div>
											))}
									</div>
								))}
							</>
						) : (
							<p>No Skills Found</p>
						)}
					</section>

					<SkillModal
						isOpen={activeModal === 'skills'}
						closeModal={closeModal}
						username={username!}
						selectedSkill={selectedSkill}
					/>
				</>
			)}
		</>
	);
}
