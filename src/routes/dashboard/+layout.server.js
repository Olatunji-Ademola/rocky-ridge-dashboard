import { decryptData, getRowByPassword, getSheet, isPassword, isRole } from '$lib/utilities';
import { fail, redirect } from '@sveltejs/kit';
import { actions } from './maintenance-request/+page.server';

function dataFormSession(id) {
	// decrypting logic ID
	const ID = JSON.parse(decryptData(id));
	const data = ID.split('|');

	const password = data[0];
	const role = data[1];
	const expirationDate = data[2];

	return [password, role, expirationDate];
}

export const load = async ({ cookies }) => {
	const sessionID = cookies.get('sessionTokenID');

	if (!sessionID) throw redirect(301, '/');

	const [password, role, expirationDate] = dataFormSession(sessionID);
	const sec = (Date.now() - expirationDate) / 1000;

	// if any of the values are incorrect or past the expirationDate(1 hour) go back to login page
	if (isNaN(expirationDate) || !isPassword(password) || !isRole(role) || sec > 3600 || sec < 0)
		throw redirect(302, '/');

	// get sheet
	const sheet = await getSheet(role);
	if (!sheet) throw redirect(302, '/');

	// get userdata
	const { success, data: useData } = await getRowByPassword(sheet, password);
	if (!useData) throw redirect(302, '/');

	delete useData['Password'];

	return { ...useData, role };
};
