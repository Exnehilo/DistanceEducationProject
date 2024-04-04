import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Context } from '../index';
import './styles/courses.css';
import { createLesson, getAllLessonsByCourseId } from '../http/lessonAPI';

const CourseLessons = () => {
	const { user } = useContext(Context);
	const { courseId } = useParams();
	const [course, setCourse] = useState(null);
	const [newLesson, setNewLesson] = useState({
		title: '',
		description: '',
		tasksCount: 0
	});
	useEffect(() => {
		const fetchData = async () => {
			try {
				const lessonsData = await getAllLessonsByCourseId(courseId);
				console.log('lessonsData:', lessonsData);
				setCourse(lessonsData.data);
			} catch (error) {
				console.error('Failed to fetch lessons:', error);
			}
		};


		fetchData();
	}, [courseId]);

	const handleLessonSubmit = async (e) => {
		e.preventDefault();
		try {
			await createLesson(newLesson.title, courseId);
			alert('New Lesson created successfully!');
		} catch (error) {
			alert('Failed to create new lesson:', error);
		}
	};

	return (
		<div className="courses-container">
			{course && course.map(lesson => (
				<div className="course-card" key={lesson.id}>
					<div className="course-info">
						<h3 className="course-title">{lesson.lesson_name}</h3>
						<p className="course-tasks">Number of Tasks: {lesson.tasksCount}</p>
						<Link to={`/courses/${courseId}/lessons/${lesson.id}/tasks`} className="course-link">View Tasks</Link>
					</div>
				</div>
			))}
			{(user._user.title === 'admin' || user._user.title === 'teacher') && (
				<div className="course-card">
					<form onSubmit={handleLessonSubmit}>
						<div className="course-info">
							<h3 className="course-title">Add New Lesson</h3>
							<div className="form-group">
								<label htmlFor="title">Title:</label>
								<input type="text" id="title" className="form-control" value={newLesson.title} onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })} />
							</div>
							<button type="submit" className="btn btn-primary">Add Lesson</button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
};

export default CourseLessons;
