import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const ChangePasswordForm = () => {
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmNewPassword, setConfirmNewPassword] = useState('');
	const [passwordsMatch, setPasswordsMatch] = useState(true);

	const handleSubmit = (event) => {
		event.preventDefault();
		if (newPassword === confirmNewPassword) {
			setPasswordsMatch(true);
		} else {
			setPasswordsMatch(false);
		}
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group controlId="currentPassword">
				<Form.Label>Current Password</Form.Label>
				<Form.Control
					type="password"
					placeholder="Enter current password"
					value={currentPassword}
					onChange={(e) => setCurrentPassword(e.target.value)}
				/>
			</Form.Group>

			<Form.Group controlId="newPassword">
				<Form.Label>New Password</Form.Label>
				<Form.Control
					type="password"
					placeholder="Enter new password"
					value={newPassword}
					onChange={(e) => setNewPassword(e.target.value)}
				/>
			</Form.Group>

			<Form.Group controlId="confirmNewPassword">
				<Form.Label>Confirm New Password</Form.Label>
				<Form.Control
					type="password"
					placeholder="Confirm new password"
					value={confirmNewPassword}
					onChange={(e) => setConfirmNewPassword(e.target.value)}
				/>
			</Form.Group>

			{!passwordsMatch && <p className="text-danger">Passwords do not match</p>}

			<Button variant="primary" type="submit">
				Change Password
			</Button>
		</Form>
	);
};

export default ChangePasswordForm;
