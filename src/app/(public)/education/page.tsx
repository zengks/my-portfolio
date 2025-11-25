'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import type { Education } from 'types/educationType';
import { useRouter, useParams } from 'next/navigation';

export default function Education({ params }: { params: { username: string } }) {
	const { status } = useSession();
	const { username } = useParams();
	const router = useRouter();

	const [educationData, setEducationData] = useState<Education[] | undefined>();

	useEffect(() => {
		if (status === 'unauthenticated') {
			router.replace('/user/login');
			return;
		}

		const fetchEducationData = async () => {
			try {
				const res = await fetch(`/api/auth/users/${username}/education`, {
					method: 'GET',
					headers: { 'Content-Type': 'Application/json' },
				});
				if (res.ok) {
					const data = await res.json();
					console.log(data);
					setEducationData(data);
				} else {
					console.error('Failed to fetch');
				}
			} catch (error) {
				console.error(error);
			}
		};

		if (status === 'authenticated') {
			fetchEducationData();
		}
	}, [status, username, router]);

	return (
		<div>
			<h1>User Education</h1>
			<pre>{JSON.stringify(educationData, null, 2)}</pre>
		</div>
	);
}
