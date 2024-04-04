import React from 'react';

const Profile = ({ user }) => {
	const formatPhoneNumber = (phoneNumber) => {
		const cleaned = ('' + phoneNumber).replace(/\D/g, '');
		const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);
		if (match) {
			return '8 (' + match[2] + ') ' + match[3] + ' ' + match[4] + '-' + match[5];
		}
		return phoneNumber;
	};
	const formattedPhoneNumber = formatPhoneNumber(user._user.phoneNumber);

	return (
		<div>
			<h2>Profile</h2>
			<p>Name: {user._user.person_info}</p>
			<p>Email: {user._user.email}</p>
			<p>Phone number: {formattedPhoneNumber}</p>
		</div>
	);
};

export default Profile;
