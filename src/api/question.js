import axios from 'axios';

const BASE_URL = 'http://localhost:8089';

export const fetchQuestions = async () => {
	try {
		const response = await axios.get(`${BASE_URL}/q-0`);
		return response.data;
	} catch (error) {
		console.error('Failed to fetch questions:', error);
		throw error;
	}
};
