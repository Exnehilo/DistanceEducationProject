import React from 'react';
import './styles/Tasks.css';

const CheckTask = ({ task }) => {
	const handleSubmit = (event) => {
		event.preventDefault();
	};

	return (
		<div className="check-task">
			<h3 className="task-title">{task.title}</h3>
			<p className="task-description">{task.description}</p>
			<button onClick={handleSubmit}>Выполнено</button>
		</div>
	);
};

export default CheckTask;
