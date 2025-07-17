import { getSheet } from '$lib/utilities';
import { json } from '@sveltejs/kit';

export async function GET() {
	// load persent session data and allSession data
	let allSessionList = [];
	let presentSession = '';

	try {
		const sheet = await getSheet('Config');

		allSessionList = await sheet.getCellsInRange('A2:A');
		presentSession = (await sheet.getCellsInRange('B2'))[0][0];

		allSessionList = allSessionList.map((value) => {
			return value[0];
		});
	} catch (err) {}

	return json({ allSessionList, presentSession });
}
