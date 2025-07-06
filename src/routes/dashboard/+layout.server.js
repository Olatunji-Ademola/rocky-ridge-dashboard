import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
	const data = cookies.get('accessToken');

	if (!data) redirect(301, '/');
	cookies.delete('accessToken', { path: '/' });

	const userData = JSON.parse(data);

	return userData;
};
