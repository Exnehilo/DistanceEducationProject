import React, { useState, useEffect } from 'react';
import { registration, getAllRoles } from '../http/userAPI';
import { getAllGroups } from '../http/groupsAPI';

const RegisterUserForm = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [role, setRole] = useState(null);
	const [group, setGroup] = useState(null);
	const [error, setError] = useState('');
	const [roles, setRoles] = useState([]);
	const [groups, setGroups] = useState([]);

	useEffect(() => {
		getAllRoles()
			.then(response => {
				setRoles(response);
			})
			.catch(error => {
				console.error('Failed to fetch roles:', error);
			});
		getAllGroups()
			.then(response => {
				setGroups(response);
			})
			.catch(error => {
				console.error('Failed to fetch groups:', error);
			});
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		let emailError = '';
		let phoneError = '';
		let nameError = '';

		if (!validateName(firstName, lastName)) {
			nameError = 'Firstname or lastname are empty!';
		}

		if (!validateEmail(email)) {
			console.log("email")
			emailError = 'Invalid email address';
		}
		if (!validatePhoneNumber(phoneNumber)) {
			console.log("phone")
			phoneError = 'Invalid phone number';
		}
		if (emailError || phoneError || nameError) {
			setError(emailError || phoneError || nameError);
			return;
		}
		const userData = {
			firstname: firstName,
			lastname: lastName,
			phoneNumber: phoneNumber,
			email: email,
			password: password,
			userRoleId: role.id,
			groupId: group.id
		};

		registration(userData)
			.then(response => {
				console.log('User registration successful:', response);
			})
			.catch(error => {
				console.error('Failed to register user:', error);
			});
	};

	const validateName = (firstname, lastname) => {
		return firstname !== '' && lastname !== '';
	}

	const validateEmail = (email) => {
		const re = /\S+@\S+\.\S+/;
		return re.test(email);
	};

	const validatePhoneNumber = (phone) => {
		const re = /^\d{11}$/;
		return re.test(phone);
	};

	return (
		<div className="form-container">
			<div className="form-group">
				<label htmlFor="firstName">First Name:</label>
				<input
					className="form-control"
					type="text"
					id="firstName"
					placeholder="Enter first name"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
				/>
			</div>

			<div className="form-group">
				<label htmlFor="lastName">Last Name:</label>
				<input
					className="form-control"
					type="text"
					id="lastName"
					placeholder="Enter last name"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
				/>
			</div>

			<div className="form-group">
				<label htmlFor="phoneNumber">Phone Number:</label>
				<input
					className={`form-control ${error && 'is-invalid'}`}
					type="text"
					id="phoneNumber"
					placeholder="Enter phone number"
					value={phoneNumber}
					onChange={(e) => setPhoneNumber(e.target.value)}
				/>
				{error && <div className="invalid-feedback">{error}</div>}
			</div>

			<div className="form-group">
				<label htmlFor="email">Email:</label>
				<input
					className={`form-control ${error && 'is-invalid'}`}
					type="email"
					id="email"
					placeholder="Enter email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				{error && <div className="invalid-feedback">{error}</div>}
			</div>

			<div className="form-group">
				<label htmlFor="password">Password:</label>
				<input
					className="form-control"
					type="password"
					id="password"
					placeholder="Enter password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>

			<div className="form-group">
				<label htmlFor="role">User Role:</label>
				<select
					className="form-control"
					id="role"
					value={role ? role.id : ''}
					onChange={(e) => setRole(roles.find(r => r.id === parseInt(e.target.value)))}
				>
					<option value="">Select role</option>
					{roles.map(role => (
						<option key={role.id} value={role.id}>{role.title}</option>
					))}
				</select>
			</div>

			{role && role.title === 'student' && (
				<div className="form-group">
					<label htmlFor="group">User Group:</label>
					<select
						className="form-control"
						id="group"
						value={group ? group.id : ''}
						onChange={(e) => setGroup(groups.find(g => g.id === parseInt(e.target.value)))}
					>
						<option value="">Select group</option>
						{groups.map(group => (
							<option key={group.id} value={group.id}>{group.group_name}</option>
						))}
					</select>
				</div>
			)}

			<button className="btn btn-primary" type="submit" onClick={handleSubmit}>
				Register User
			</button>
		</div>
	);
};

export default RegisterUserForm;
