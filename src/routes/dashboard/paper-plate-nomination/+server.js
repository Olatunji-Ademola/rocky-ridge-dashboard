import { getSheet } from '$lib/utilities';
import { json } from '@sveltejs/kit';

export const POST = async ({ request }) => {
	const { email } = await request.json();

	const sheet = await getSheet('Paper Plate Nomination');
	const rows = await sheet.getRows();

	const rowsData = rows.map((row) => {
		return row.toObject();
	});

	const nominees = rowsData.filter((value) => value['Email'] === email);

	return json({ nominees });
};
