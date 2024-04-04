import React from 'react';
import { useParams } from 'react-router-dom';
import { tasksData } from '../data/tasksData';
import TextTask from '../components/TextTask';
import QuizTask from '../components/QuizTask';
import CheckTask from '../components/CheckTask';
import '../components/styles/Tasks.css';

const Task = () => {
	const { lessonId } = useParams();
	const lessonTasks = tasksData.filter(task => task.lessonId === parseInt(lessonId));
	const renderTaskComponent = (task) => {
		switch (task.type) {
			case 'text':
				return <TextTask key={task.id} task={task} />;
			case 'quiz':
				return <QuizTask key={task.id} task={task} />;
			case 'check':
				return <CheckTask key={task.id} task={task} />;
			default:
				return null;
		}
	};

	return (
		<div className='task-container'>
			{lessonTasks.map(task => (
				<div key={task.id} className="task">
					{renderTaskComponent(task)}
				</div>
			))}
		</div>
	);
};

export default Task;
