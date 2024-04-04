import axios from './axiosConfig';

export const getAll = async () => {
	const { data } = await axios.get('/api/courses');
	return data
}

export const create = async (newCourse) => {
	await axios.post('/api/courses/create', newCourse)
}