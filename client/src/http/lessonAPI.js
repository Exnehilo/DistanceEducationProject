import axios from './axiosConfig';

export const createLesson = async (title, courseId) => {
	await axios.post(`/api/courses/${courseId}/lessons/createlesson`, { lesson_name: title })
}

export const getAllLessonsByCourseId = async (courseId) => {
	const response = await axios.get(`/api/courses/${courseId}/lessons`)
	return response
}