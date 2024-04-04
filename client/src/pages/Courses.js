import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { getAll } from '../http/coursesAPI';

import "./styles/courses.css";

const Courses = () => {
	const [courses, setCourses] = useState([]);

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const data = await getAll();
				setCourses(data);
			} catch (error) {
				console.error('Error fetching courses:', error);
			}
		};
		fetchCourses();
	});

	return (
		<div className="courses-container">
			{courses.map((course) => (
				<div className="course-card" key={course.id}>
					<div className="course-info">
						<h3 className="course-title">{course.title}</h3>
						<p className="course-description">Teacher: {course.teacher_info}</p> { }
						<p className="course-lessons">Lessons: {course.lesson_count}</p> { }
						<Link to={`/courses/${course.id}/lessons`} className="course-link">
							View Lessons
						</Link>
					</div>
				</div>
			))}
		</div>
	);
};

export default Courses;
