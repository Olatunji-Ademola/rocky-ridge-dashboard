import { getSheet } from '$lib/utilities';
import { fail } from '@sveltejs/kit';

export const actions = {
	addHours: async ({ request }) => {
		const data = await request.formData();

		const Email = data.get('Email');
		const Date = data.get('Date');
		const Hours = data.get('Hours');
		const isUpdate = data.get('isUpdate');
		const isActive = data.get('isActive');

		if (isActive === 'false')
			return fail(303, { errorMessage: 'you dont have access to this service' });

		const isHours = /^\d*\.?\d*$/.test(Hours);
		if (!isHours) return fail(303, { errorMessage: 'please provide a valid hour format' });
		try {
			const sheet = await getSheet('Time Sheet Data');
			const rows = await sheet.getRows();

			if (isUpdate === 'true') {
				let rowAdded = false;

				for (let i = 0; i < rows.length; i++) {
					const row = rows[i];

					if (row.get('Email') === Email && row.get('Date') === Date) {
						row.set('Hours', Hours);
						await row.save();
						rowAdded = true;
						break;
					}
				}
				if (rowAdded)
					return { successMessage: 'Hours updated successful', date: Date, hours: Hours };
				else return fail(303, { errorMessage: 'something went wrong, try again' });
			} else {
				await sheet.addRow({ Email, Date, Hours });
				return { successMessage: 'Hours added successful', date: Date, hours: Hours };
			}
		} catch (err) {
			return fail(303, { errorMessage: 'something went wrong, try again' });
		}
	},

	clearHours: async ({ request }) => {
		const data = await request.formData();

		const Email = data.get('Email');
		const Date = data.get('Date');
		const isActive = data.get('isActive');

		if (isActive === 'false')
			return fail(303, { errorMessage: 'you dont have access to this service' });

		try {
			const sheet = await getSheet('Time Sheet Data');
			const rows = await sheet.getRows();

			let rowDeleted = false;

			for (let i = 0; i < rows.length; i++) {
				const row = rows[i];

				if (row.get('Email') === Email && row.get('Date') === Date) {
					await row.delete();
					rowDeleted = true;

					break;
				}
			}

			if (rowDeleted) {
				return {
					successMessage: 'Hours cleared successful',
					date: Date,
					cleared: true
				};
			} else {
				return fail(303, { errorMessage: 'something went wrong, try again' });
			}
		} catch (err) {
			return fail(303, { errorMessage: 'something went wrong, try again' });
		}
	},

	submitTimeSheet: async ({ request }) => {
		const data = await request.formData();

		const Name = data.get('Name');
		const Email = data.get('Email');
		const StartDate = data.get('Start Date');
		const EndDate = data.get('End Date');
		const Hours = data.get('Hours');
		const Position = data.get('Position');
		const isActive = data.get('isActive');

		if (isActive === 'false')
			return fail(303, { errorMessage: 'you dont have access to this service' });

		try {
			const sheet = await getSheet('Employee Time Sheet');

			const addedRow = await sheet.addRow({
				Name,
				Email,
				Position,
				'Start Date': StartDate,
				'End Date': EndDate,
				Hours
			});

			if (addedRow) {
				// delete the rows data
				const sheetData = await getSheet('Time Sheet Data');
				const rows = await sheetData.getRows();

				for (let i = 0; i < rows.length; i++) {
					const row = rows[i];

					if (row.get('Email') === Email) {
						await row.delete();
					}
				}

				return {
					successMessage: 'timesheet submitted successful',
					data: {
						StartDate,
						EndDate,
						Hours
					}
				};
			} else {
				return fail(303, { errorMessage: 'something went wrong, try again' });
			}
		} catch (error) {
			return fail(303, { errorMessage: 'something went wrong, try again' });
		}
	}
};
