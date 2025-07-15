import { getSheet } from '$lib/utilities';
import { json } from '@sveltejs/kit';

export async function GET() {
	const dataList = [];
	try {
		const data = await getSheet('Annoucements');
		const rows = await data.getRows();

		for (let i = 0; i < rows.length; i++) {
			const row = [rows[i].get('Title'), rows[i].get('Message')];

			dataList.push(row);
		}
	} catch (error) {}

	return json(dataList);
}
