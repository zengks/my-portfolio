import { cache } from 'react';
import { getUserByUsername } from '@/controllers/userController';

export const getCachedUserByUsername = cache(async (username: string) => {
	return await getUserByUsername(username);
});
