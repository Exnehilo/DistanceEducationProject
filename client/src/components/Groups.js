import React, { useState, useEffect } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { create, getAllGroups } from '../http/groupsAPI';

const Groups = () => {
	const [groups, setGroups] = useState([]);
	const [newGroupName, setNewGroupName] = useState('');

	useEffect(() => {
		getAllGroups()
			.then(response => {
				console.log(response)
				setGroups(response);
			})
			.catch(error => {
				console.error('Failed to fetch groups:', error);
			});
	}, []);

	const handleRegisterGroup = () => {
		if (newGroupName.trim() !== '') {
			create(newGroupName)
				.then(() => {
					setGroups([...groups, newGroupName]);
					setNewGroupName('');
				})
				.catch((error) => {
					if (error.response) {
						alert(error.response.data.message);
					} else {
						alert('Failed to register group. Please try again later.');
					}
				});
		}
	};

	return (
		<div>
			<h2>Groups</h2>
			<div className="d-flex align-items-center">
				<InputGroup className="mb-3">
					<FormControl
						placeholder="Enter group name"
						value={newGroupName}
						onChange={(e) => setNewGroupName(e.target.value)}
					/>
					<Button variant="outline-secondary" onClick={handleRegisterGroup}>Register Group</Button>
				</InputGroup>
			</div>
			<ul>
				{groups.map((group, index) => (
					<li key={index}>{group.group_name}</li>
				))}
			</ul>
		</div>
	);
};

export default Groups;
