import { fail, redirect } from '@sveltejs/kit';
import { SPREADSHEET_ID, SERVICE_ClIENT_EMAIL, SERVICE_PRIVATE_KEY } from '$env/static/private';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

function init() {
	const serviceAccountAuth = new JWT({
		email: SERVICE_ClIENT_EMAIL,
		key: SERVICE_PRIVATE_KEY.replace(/\\n/g, '\n'),
		scopes: ['https://www.googleapis.com/auth/spreadsheets']
	});

	return new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);
}
const doc = init();

const getSheet = async (sheetRole) => {
	try {
		await doc.loadInfo();
		const sheet = doc.sheetsByTitle[sheetRole];
		return sheet;
	} catch (err) {
		return null;
	}
};
const getRowByPassword = async (sheet, password) => {
	try {
		let data = null;
		const rows = await sheet.getRows();
		const rowData = rows.filter((row) => {
			// change Cabin Code to password
			return row.toObject()['Cabin Code'] == password;
		});

		data = rowData.length ? rowData[0].toObject() : null;
		return data;
	} catch (err) {
		return null;
	}
};

export const actions = {
	login: async ({ cookies, request }) => {
		// from data login page
		const data = await request.formData();

		// Validate user data
		const email = data.get('email');
		const password = data.get('password');
		const role = data.get('role');

		// - check if the email is a valid email string
		const isEmailFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
		// - check if it's isalphanumeric and length is equal to 6
		const isPasswordFormat = /^[a-zA-Z0-9]{6}$/.test(password);
		// - check if role is a valid role
		const isRoleFormat = /Student|Staff|Faculty/.test(role);
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
					delete rowData['Cabin Code'];
					const userData = { ...rowData, role };
					cookies.set('accessToken', JSON.stringify(userData), { path: '/' });

					redirect(303, '/dashboard');
				} else {
					// // emial is found
					return fail(401, { email, message: 'Invalid password or email address' });
				}
			} else {
				// password is found
				return fail(401, { email, message: 'Invalid password or email address' });
			}
		} else {
			return fail(500, { message: 'something went wrong try again' });
		}
	}
};
