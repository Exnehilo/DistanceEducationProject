import axios from './axiosConfig';

export const create = async (newGroupName) => {
	await axios.post('/api/group', { group_name: newGroupName.trim() });
}

export const getAllGroups = async () => {
	try {
		const response = await axios.post('/api/group/getgrouplist');
		return response.data;
	} catch (error) {
		throw error;
	}
};