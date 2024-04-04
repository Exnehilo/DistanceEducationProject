import React, { useState, useEffect } from 'react';
import { YOUTUBE_API_KEY } from '../utils/consts';
import { isYouTubeLink } from '../utils/helpers';
import '../components/styles/Tasks.css';

const TextTask = ({ task }) => {
	const [videoInfo, setVideoInfo] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchVideoInfo = async () => {
			try {
				if (isYouTubeLink(task.documentLink)) {
					const response = await fetch(
						`https://www.googleapis.com/youtube/v3/videos?id=${task.documentLink}&key=${YOUTUBE_API_KEY}&part=snippet`
					);
					if (!response.ok) {
						throw new Error('Failed to fetch video info');
					}
					const data = await response.json();
					setVideoInfo(data.items[0]);
				}
			} catch (error) {
				setError(error.message);
			}
		};
		fetchVideoInfo();
	}, [task.documentLink]);

	const renderDocument = () => {
		if (isYouTubeLink(task.documentLink)) {
			if (error) {
				return <p>{error}</p>;
			}
			if (!videoInfo) {
				return <p>Loading...</p>;
			}
			return (
				<div>
					<h3>{videoInfo.snippet.title}</h3>
					<iframe
						title="YouTube Video"
						width="560"
						height="315"
						src={`https://www.youtube.com/embed/${task.documentLink}`}
						allowFullScreen
					></iframe>
				</div>
			);
		} else {
			return (
				<div>
					<p>Документ: {task.documentLink}</p>
					<a href={task.documentLink} download>
						Скачать документ
					</a>
				</div>
			);
		}
	};

	return (
		<div className="text-task">
			<h3 className="task-title">{task.title}</h3>
			<p className="task-description">{task.description}</p>
			<input type="text" placeholder="Введите ваш ответ" />
			{task.documentLink && renderDocument()}
			<button>Отправить</button>
		</div>
	);
};

export default TextTask;
