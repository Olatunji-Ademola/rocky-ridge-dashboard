import { SPREADSHEET_ID, SERVICE_ClIENT_EMAIL, SERVICE_PRIVATE_KEY } from '$env/static/private';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export function init() {
	try {
		const serviceAccountAuth = new JWT({
			email: SERVICE_ClIENT_EMAIL,
			key: SERVICE_PRIVATE_KEY.replace(/\\n/g, '\n'),
			scopes: ['https://www.googleapis.com/auth/spreadsheets']
		});

		return new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);
	} catch (err) {
		return null;
	}
}
const doc = init();

(async () => {
	await doc?.loadInfo();
})();

export const getSheet = async (sheetTitle) => {
	try {
		const sheet = doc.sheetsByTitle[sheetTitle];
		return sheet;
	} catch (err) {
		return null;
	}
};
export const getRowByPassword = async (sheet, password) => {
	try {
		let data = null;
		const rows = await sheet.getRows();
		if (!rows) return { success: false };

		const rowData = rows.filter((row) => {
			return row.toObject()['Password'] === password;
		});

		data = rowData.length ? rowData[0].toObject() : null;

		return { success: true, data };
	} catch (err) {
		return { success: false };
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

export const isName = (name) => {
	return /^[a-zA-Z ]+$/.test(name);
};

export const isMessage = (message) => {
	return /^[a-zA-Z0-9 '().,-_]+$/.test(message);
};

export const isLocation = (location) => {
	return /^[a-zA-Z0-9_' ]+$/.test(location);
};
