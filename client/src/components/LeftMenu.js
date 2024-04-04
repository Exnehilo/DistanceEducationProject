import React, { useState } from 'react';
import './styles/LeftMenu.css';

const LeftMenu = ({ onSelect, userRole }) => {
	const getMenuItems = () => {
		if (userRole === 'admin') {
			return [
				{ id: 'profile', label: 'Profile' },
				{ id: 'changePassword', label: 'Change Password' },
				{ id: 'groups', label: 'Groups' },
				{ id: 'registerUser', label: 'Register User' },
				{ id: 'addCourse', label: 'Add Course' },
			];
		} else {
			return [
				{ id: 'profile', label: 'Profile' },
				{ id: 'changePassword', label: 'Change Password' },
			];
		}
	};

	const menuItems = getMenuItems();

	const [selectedItem, setSelectedItem] = useState(menuItems[0].id);

	const handleItemClick = (itemId) => {
		setSelectedItem(itemId);
		onSelect(itemId);
	};

	return (
		<div className="left-menu">
			{menuItems.map((item) => (
				<div
					key={item.id}
					className={`menu-item ${selectedItem === item.id ? 'selected' : ''}`}
					onClick={() => handleItemClick(item.id)}
				>
					{item.label}
				</div>
			))}
		</div>
	);
};

export default LeftMenu;
