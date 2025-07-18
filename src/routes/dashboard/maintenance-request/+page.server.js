import { getSheet, isEmail, isLocation, isMessage, isName } from '$lib/utilities';
import { fail } from '@sveltejs/kit';

function filterByKey(obj, key, value) {
	return obj.filter((element) => {
		return (element[key] = value);
	});
}
export const actions = {
	request: async ({ request }) => {
		const data = await request.formData();

		const Name = data.get('Name');
		const Email = data.get('Email');
		const Location = data.get('location');
		const Message = data.get('message');

		// const isName =
		const _isName = isName(Name);
		const _isEmail = isEmail(Email);
		const _isLocation = isLocation(Location);
		const _isMessage = isMessage(Message);

		if (_isName && _isEmail && _isLocation && _isMessage) {
			try {
				console.log('send request');
				const sheet = await getSheet('Maintenance Request');
				const row = await sheet.addRow({ Name, Email, Location, Message });

				const rows = await sheet.getRows();

				rows.map((row) => {
					const rowData = row.toObject();
				});

				return {
					successMessage:
						'thank you for submitting a Maintenance request, it will be reviwed as soon as posible'
				};
			} catch (err) {
				return fail(303, { errorMessage: 'something went wrong, try again' });
			}
		} else {
			return fail(303, { errorMessage: 'something went wrong, try again' });
		}
	}
};
