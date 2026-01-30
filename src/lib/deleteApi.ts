export const deleteEducationApi = async (username: string, educationId: number) => {
	await fetch(`/api/users/${username}/education`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(educationId),
	});
};

export const deleteWorkExpApi = async (username: string, workExpId: number) => {
	await fetch(`/api/users/${username}/work`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(workExpId),
	});
};

export const deleteProjectApi = async (username: string, projectId: number) => {
	await fetch(`/api/users/${username}/project`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(projectId),
	});
};

export const deleteCertificateApi = async (username: string, certificateId: number) => {
	await fetch(`/api/users/${username}/certificate`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(certificateId),
	});
};

export const deleteSkillApi = async (username: string, skillId: number) => {
	await fetch(`/api/users/${username}/skill`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(skillId),
	});
};

export const deleteAboutUserSectionApi = async (username: string, aboutUserId: number) => {
	await fetch(`/api/users/${username}/aboutUser`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(aboutUserId),
	});
};
