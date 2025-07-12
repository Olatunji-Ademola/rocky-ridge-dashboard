import { SPREADSHEET_ID, SERVICE_ClIENT_EMAIL, SERVICE_PRIVATE_KEY } from '$env/static/private';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export function init() {
	const serviceAccountAuth = new JWT({
		email: SERVICE_ClIENT_EMAIL,
		key: SERVICE_PRIVATE_KEY.replace(/\\n/g, '\n'),
		scopes: ['https://www.googleapis.com/auth/spreadsheets']
	});

	return new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);
}
const doc = init();

export const getSheet = async (sheetRole) => {
	try {
		await doc.loadInfo();
		const sheet = doc.sheetsByTitle[sheetRole];
		return sheet;
	} catch (err) {
		return null;
	}
};
export const getRowByPassword = async (sheet, password) => {
	try {
		let data = null;
		const rows = await sheet.getRows();

		const rowData = rows.filter((row) => {
			// change Cabin Code to password
			return row.toObject()['Password'] === password;
		});

		data = rowData.length ? rowData[0].toObject() : null;
		return data;
	} catch (err) {
		return null;
	}
};

export const encryptData = (data) => {
	let hexString = '';
	for (let i = 0; i < data.length; i++) {
		// Get the Unicode code point of the character
		const charCode = data.charCodeAt(i);
		// Convert the code point to a hexadecimal string
		const hex = charCode.toString(16).padStart(2, '0');
		hexString += hex;
	}
	return hexString;
};

export const decryptData = (hex) => {
	let originalString = '';
	// Iterate in steps of 2 to process each hex byte
	for (let i = 0; i < hex.length; i += 2) {
		// Extract a two-character hex pair
		const hexPair = hex.substring(i, i + 2);
		// Convert the hex pair to a decimal integer
		const charCode = parseInt(hexPair, 16);
		// Convert the decimal code point back to a character
		originalString += String.fromCharCode(charCode);
	}
	return originalString;
};

export const isPassword = (password) => {
	return /^[a-zA-Z0-9]{6}$/.test(password);
};

export const isRole = (role) => {
	return /Student|Staff|Faculty/.test(role);
};

export const isEmail = (email) => {
	return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
};
