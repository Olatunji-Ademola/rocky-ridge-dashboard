import { json } from '@sveltejs/kit';

export const actions = {
	request: async ({ request }) => {
		const data = await request.formData();

		console.log(data);
		return { success: true };
	}
};
