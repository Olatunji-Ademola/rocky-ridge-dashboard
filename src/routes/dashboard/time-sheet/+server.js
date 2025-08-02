import { getSheet } from '$lib/utilities';
import { json } from '@sveltejs/kit';

export const POST = async ({ request }) => {
	const { email } = await request.json();

	// time
	const sheet = await getSheet('Employee Time Sheet');
	const rows = await sheet.getRows();
	const timeSheetList = [];

	for (let i = 0; i < rows.length; i++) {
		const row = rows[i];

		if (row.get('Email') == email) {
			const StartDate = row.get('Start Date');
			const EndDate = row.get('End Date');
			const Hours = row.get('Hours');

			const entry = { StartDate, EndDate, Hours };
			timeSheetList.push(entry);
		}
	}

	// console.log('timeSheet', timeSheetList);

	// time sheet data
	const sheetData = await getSheet('Time Sheet Data');
	const rowsD = await sheetData.getRows();

	const rowsData = rowsD.map((row) => {
		return row.toObject();
	});

	const timeSheetHoursRaw = rowsData.filter((value) => value['Email'] === email);

	let timeSheetHours = {};
	timeSheetHoursRaw.forEach((value) => {
		// console.log(value);
		timeSheetHours[value.Date] = value.Hours;
	});

	return json({ timeSheetHours, timeSheetList });
};
