import React, { useState, useEffect } from 'react';
import { getAllUsersByRole } from '../http/userAPI';
import { getAllGroups } from '../http/groupsAPI';
import { create } from '../http/coursesAPI';

const AddCourseForm = () => {
	const [title, setTitle] = useState('');
	const [groupId, setGroupId] = useState('');
	const [teacherId, setTeacherId] = useState('');
	const [groups, setGroups] = useState([]);
	const [teachers, setTeachers] = useState([]);

	useEffect(() => {
		getAllGroups()
			.then(response => {
				setGroups(response);
			})
			.catch(error => {
				console.error('Failed to fetch groups:', error);
			});
		getAllUsersByRole("teacher", "admin")
			.then(response => {
				setTeachers(response);
			})
			.catch(error => {
				console.error('Failed to fetch teachers:', error);
			});
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		let newCourse = {
			title: title,
			groupId: groupId,
			teacher_id: teacherId
		}
		create(newCourse)
	};

	return (
		<div className="form-container">
			<div className="form-group">
				<label htmlFor="title">Course Title:</label>
				<input
					className={`form-control ${!title.trim() ? 'is-invalid' : ''}`}
					type="text"
					id="title"
					placeholder="Enter course title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				{!title.trim() && <div className="invalid-feedback">Please enter a course title.</div>} { }
			</div>

			<div className="form-group">
				<label htmlFor="group">Group:</label>
				<select
					className="form-control"
					id="group"
					value={groupId}
					onChange={(e) => setGroupId(e.target.value)}
				>
					<option value="">Select group</option>
					{groups.map(group => (
						<option key={group.id} value={group.id}>{group.group_name}</option>
					))}
				</select>
			</div>

			<div className="form-group">
				<label htmlFor="teacher">Teacher:</label>
				<select
					className="form-control"
					id="teacher"
					value={teacherId}
					onChange={(e) => setTeacherId(e.target.value)}
				>
					<option value="">Select teacher</option>
					{teachers.map(teacher => (
						<option key={teacher.id} value={teacher.id}>{`${teacher.firstname} ${teacher.lastname}`}</option>
					))}
				</select>
			</div>

			<button className="btn btn-primary" type="submit" onClick={handleSubmit}>
				Add Course
			</button>
		</div>
	);
};

export default AddCourseForm;
