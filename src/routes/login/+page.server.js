import { fail, redirect } from '@sveltejs/kit';

import {
	encryptData,
	getRowByPassword,
	getSheet,
	isEmail,
	isPassword,
	isRole
} from '$lib/utilities';

export async function load({ cookies }) {
	// delete cookie
	cookies.delete('sessionTokenID', { path: '/' });
}

export const actions = {
	login: async ({ cookies, request }) => {
		// from data login page
		const data = await request.formData();

		// Validate user data
		const email = data.get('email');
		const password = data.get('password');
		const role = data.get('role');

		// - check if the email is a valid email string
		const isEmailFormat = isEmail(email);
		// - check if it's isalphanumeric and length is equal to 6
		const isPasswordFormat = isPassword(password);
		// - check if role is a valid role
		const isRoleFormat = isRole(role);
		//- check validity : fail if invalid
		if (!(isEmailFormat && isPasswordFormat && isRoleFormat))
			return fail(401, { email, message: 'Invalid password or email address' });

		// Check if credentials is valid
		const sheet = await getSheet(role);

		if (sheet) {
			const rowData = await getRowByPassword(sheet, password);

			if (rowData) {
				const isEmailVerified = rowData['Email'] === email;

				if (isEmailVerified) {
					// do send user password
					delete rowData['Password'];
					const accessToken = `${password}|${role}|${Date.now()}`;

					// remove this
					const encryptedData = encryptData(JSON.stringify(accessToken));
					cookies.set('sessionTokenID', encryptedData, { path: '/', expires: 0 });

					throw redirect(303, '/dashboard');
				} else {
					// // emial is found
					return fail(401, { email, message: 'Invalid password or email address' });
				}
			} else {
				// password is found
				return fail(401, { email, message: 'Invalid password or email address' });
			}
		} else {
			return fail(500, { email, message: 'something went wrong try again' });
		}
	}
};
