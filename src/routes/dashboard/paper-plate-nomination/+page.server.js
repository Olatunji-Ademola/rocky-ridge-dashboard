import { getSheet, isEmail, isMessage, isName } from '$lib/utilities';
import { fail } from '@sveltejs/kit';

export const actions = {
	request: async ({ request }) => {
		const data = await request.formData();

		const Name = data.get('Name');
		const Email = data.get('Email');
		const Nominee = data.get('nominee');
		const Award = data.get('award');

		const _isName = isName(Name);
		const _isEmail = isEmail(Email);
		const _isNominee = isName(Nominee);
		const _isAward = isMessage(Award);

		if (_isName && _isEmail && _isNominee && _isAward) {
			try {
				const sheet = await getSheet('Paper Plate Nomination');
				const row = await sheet.addRow({ Name, Email, Nominee, Award });

				const rowData = row.toObject();

				return {
					request: rowData,
					successMessage: 'Nominee submitted successfully'
				};
			} catch (err) {
				return fail(303, { errorMessage: 'something went wrong, try again' });
			}
		} else {
			return fail(303, { errorMessage: 'something went wrong, try again' });
		}
	}
};
