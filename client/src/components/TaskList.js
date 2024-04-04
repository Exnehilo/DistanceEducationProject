import React from 'react';
import Task from '../pages/Task';
import { tasksData } from '../data/tasksData';
import './styles/Tasks.css';

const TaskList = () => {
	return (
		<div className="task-list">
			{tasksData.map((task, index) => (
				<Task key={index} task={task} />
			))}
		</div>
	);
};

export default TaskList;
