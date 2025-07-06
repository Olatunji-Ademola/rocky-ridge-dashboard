import { fail, redirect } from '@sveltejs/kit';
import { SPREADSHEET_ID, SERVICE_ClIENT_EMAIL, SERVICE_PRIVATE_KEY } from '$env/static/private';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

// add all of this to and .env file
// const spreadsheetId = '1haLFdK-TV1dIwiud02xsE0Uo7pxnRNSirGInATofBlo';
// // '1QMSvhyjOEqAIt6vOqyn-Z0zHUhWUJJ-3H5OAbiOUjC0';
// const clientEmail = 'rrm-spreadsheet-bot@bright-coyote-463719-s9.iam.gserviceaccount.com';
// // 'editsheet-336@norse-figure-463511-m3.iam.gserviceaccount.com';
// const privateKey =
// 	'-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDZSScB6ahxflr+\nlLjnRkdm3Gnr/4Nr1pwCIhlhMyF3oAY+hbcb6G+ZkzihdkOU7NXHYkKihJflNb5N\nA0XFawu2LJ5QuoPLaC4H+s0HdeDua1gFOjjEecrCMJDfjPackg7UZDqg5O+2W5V5\nDA25jg238VrBmEEWp1WdFAdURltXDLuh9Va+Tj0YDHV5VvkYupq1TCO0Y/0Y82wM\ni9mP/qGjiLme+ZOT9HP0J/VdPcO18zlH7NkJTsF3gULPWMxr9rZoWbu0AoGIxXdN\n/oO8BBF692phrbYX2Es9JFE0URzYsvS+nND7T/zypsXjAm3z5rotGfytdHqDIiwh\na3ZdjlTrAgMBAAECggEAEzB6hpjinJH//5oV0a2rZ6JRTnDPOUpc68lO0X6TrD4Q\nicatsFlw5bC9SxvShcf8F0g5F047de2ETsaFC8Ao6sqk+VSHiC1oB0y3J7tZhTor\nWLGBdZnwoKwWV0/ahbhWdpvFcRPW4cApLWVgSZdfOclRw7rVC2b1e30F1VkDVGbB\n+dqtTt/9uwMvAS75ZmvAtbGuWXDkCLQtCSXtXAIhAfNGMbkqAoopJD/7eTPZCEnn\n02zfX4aIa3FeYp9ftYNoA+mkBnNn7RkKjm1dGgg/INjIr6aH2ehUmQ3WzfIEfq8a\nTyTV6+CDD1jsIWCgEVetcrlgSx81dBQVhYvD8CwIEQKBgQDwDK8hfCgDYUm8Iiuk\n819o3f5plYfxsQjch1qxZFO1jFMDVUE0Y133wEkZK0r4RtNogEG7l8FKs92V28LI\nWSgtnAupVdcqgKeXcpf8lFl2JL7lhmyYdgRcAXCNCtfRvOYSPbOCf9LziyHiKZsV\nlVKr7r5dGxOlhfty7sVEksfgkQKBgQDnuT/Jk5CYfETyIZlzvRkBSRHhhlOhef9Q\n/F+RwIx7wYH5YtWzg5Yq4253poijT4+gL2zF+1mkh4J7DWIW0Unim/JPfZsK7r6U\ndbXTMTCrnAzau7kXa6MgLBdwZgiU2NaMq5oycgiLDuVyOOq6QsS7wfWcnaRpxpGj\nrmTfsf4buwKBgH3QWBX3yc0Dt664RiG9QPtopshWDBtcC2XyN1GUYN9dfcDYdUVs\n8zo/+NANRczc6j7yQgF9Z1ys6u15chypxgopqF8HU6++IJibAhfq9PycA8Wu78n0\nyRIj2wbBcR5HoFpdJnG2Zy0odgjgf50PV3Yvumx4HZL6pzC0/oWTXNlRAoGBANVo\nibOW4LNet4ybnxy1icLiTcJ7GKh9l8M5OrccMwWC2LYZ7SBPzswe+0zcpbhp/KeV\nJcNMUmmxl1zGnZDQHRDDeKz2zASMjh5iLhubkOxrYndMLhHAwtJNaSTOA5c6AJY7\nMF7HINEY3f2NJ7h054TYA+DCWnpEMzsg0Kwn3BQjAoGAEY5Ld0H3VSpoRF2Xkv85\nyi1hGIkeVwsLPhOGYbReFHq5vxQvHVthF/WWv7lDayVNh7peponVos9D9mN2ufl9\n2Tz/Xp2rqeCBqFRfB0XWrVgm3Tk10O+Do7ID1ZtAoibhUfStDiVHWOyPCyUXmN06\nFjl7rA6HCSwxhCGAPXSXO2U=\n-----END PRIVATE KEY-----\n'.replace(
// 		/\\n/g,
// 		'\n'
// 	);

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
