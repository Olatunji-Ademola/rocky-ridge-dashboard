import { json } from '@sveltejs/kit';
import { getSheet } from '$lib/utilities';

export async function GET() {
	const WeekSchedule =
		'Jazz Schedule' || 'JAI Week Schedule' || 'Mariachi Schedule' || 'CI Week Schedule';

	const calendarSheet = await getSheet(WeekSchedule);
	const rows = await calendarSheet.getRows();

	let calendarHead = [];
	let calendarBody = [];
	let calendarTitle = '';

	rows.forEach((row, index) => {
		const data = row.toObject();
		const keys = Object.keys(data);

		if (index == rows.length - 1) {
			calendarHead = keys;
			calendarTitle = data[keys[0]];
			return;
		}

		for (let i = 0; i < keys.length; i++) {
			const key = keys[i];

			calendarBody[index] = [...(calendarBody[index] || ''), data[key] || ''];
		}

		return row.toObject();
	});

	return json({ calendarTitle, calendarHead, calendarBody });
}
