import React, { useContext, useState } from 'react';
import Profile from '../components/Profile';
import ChangePasswordForm from '../components/ChangePasswordForm';
import RegisterUserForm from '../components/RegisterUserForm';
import LeftMenu from '../components/LeftMenu';
import { Context } from '../index';
import Groups from '../components/Groups';
import AddCourseForm from '../components/AddCourseForm';

const Cabinet = () => {
	const { user } = useContext(Context);
	const [selectedMenuItem, setSelectedMenuItem] = useState('profile');
	const [groups] = useState([]);

	const handleMenuItemSelect = (itemId) => {
		setSelectedMenuItem(itemId);
	};

	return (
		<div style={{ display: 'flex' }}>
			<div style={{ width: '25%', marginRight: '20px' }}>
				<LeftMenu onSelect={handleMenuItemSelect} userRole={user._user.group_name} />
			</div>
			<div style={{ width: '75%' }}>
				{selectedMenuItem === 'profile' && <Profile user={user} />}
				{selectedMenuItem === 'changePassword' && <ChangePasswordForm />}
				{selectedMenuItem === 'registerUser' && <RegisterUserForm />}
				{selectedMenuItem === 'groups' && <Groups />}
				{selectedMenuItem === 'addCourse' && <AddCourseForm groups={groups} />}
			</div>
		</div>
	);
};

export default Cabinet;
