export const actions = {
	login: async ({ request }) => {
		// console.log(request);
		const data = await request.formData();

		const email = data.get('email');
		const password = data.get('password');
		const role = data.get('role');

		// get the right sheet
		// look for the password
		// verify email

		console.log(email, password, role);
	}
};
