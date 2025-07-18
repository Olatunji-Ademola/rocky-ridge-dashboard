import { getSheet } from '$lib/utilities';
import { json } from '@sveltejs/kit';

export const POST = async ({ request }) => {
	const { email } = await request.json();

	const sheet = await getSheet('Maintenance Request');
	const rows = await sheet.getRows();

	const rowsData = rows.map((row) => {
		return row.toObject();
	});

	const requestHistory = rowsData.filter((value) => value['Email'] === email);

	return json({ requestHistory });
};
