import axios from 'axios';

const BASE_URL = 'http://localhost:8089';

export const fetchMentorings = async () => {
	//멘토링 목록 불러오기
	try {
		const response = await axios.get(`${BASE_URL}/mentorings-1`);
		return response.data;
	} catch (error) {
		console.error('Failed to fetch Mentorings:', error);
		throw error;
	}
};

export const fetchDetailMentoring = async mentoringId => {
	try {
		const response = await axios.get(`${BASE_URL}/mentoring-detail/`);
		console.log(mentoringId); //에러 때문에 넣어본거. 잘 넘어오는지 확인
		return response.data;
	} catch (error) {
		console.error('Error fetching question detail:', error);
		throw error;
	}
};
