import { getSheet, isEmail, isLocation, isMessage, isName } from '$lib/utilities';
import { fail } from '@sveltejs/kit';

export const actions = {
	request: async ({ request }) => {
		const data = await request.formData();

		const Name = data.get('Name');
		const Email = data.get('Email');
		const Location = data.get('location');
		const Message = data.get('message');
		const isActive = data.get('isActive');

		const _isName = isName(Name);
		const _isEmail = isEmail(Email);
		const _isLocation = isLocation(Location);
		const _isMessage = isMessage(Message);

		if (isActive === 'false')
			return fail(303, { errorMessage: 'you dont have access to this service' });

		if (_isName && _isEmail && _isLocation && _isMessage) {
			try {
				console.log('send request');
				const sheet = await getSheet('Maintenance Request');
				const row = await sheet.addRow({ Name, Email, Location, Message });

				const rowData = row.toObject();

				return {
					request: rowData,
					successMessage: 'Maintenance request submitted successfully'
				};
			} catch (err) {
				return fail(303, { errorMessage: 'something went wrong, try again' });
			}
		} else {
			return fail(303, { errorMessage: 'something went wrong, try again' });
		}
	}
};
