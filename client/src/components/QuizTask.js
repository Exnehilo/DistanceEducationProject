import React, { useState } from 'react';
import './styles/Tasks.css';

const QuizTask = ({ task }) => {
	const [selectedAnswers, setSelectedAnswers] = useState([]);

	const handleCheckboxChange = (event) => {
		const { value, checked } = event.target;
		if (checked) {
			setSelectedAnswers([...selectedAnswers, value]);
		} else {
			setSelectedAnswers(selectedAnswers.filter((answer) => answer !== value));
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
	};

	return (
		<div className="quiz-task">
			<h3 className="task-title">{task.title}</h3>
			<p className="task-description">{task.description}</p>
			<form onSubmit={handleSubmit}>
				{task.options.map((option, index) => (
					<div key={index}>
						<input
							type="checkbox"
							id={`option-${index}`}
							value={option}
							onChange={handleCheckboxChange}
							checked={selectedAnswers.includes(option)}
						/>
						<label htmlFor={`option-${index}`}>{option}</label>
					</div>
				))}
				<button type="submit">Отправить</button>
			</form>
		</div>
	);
};

export default QuizTask;
