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

//디테일 페이지에서 현재 페이지의 질문 정보를 가져오는(질문만)
export const fetchQuestionDetail = async questionId => {
	try {
		const response = await axios.get(
			// `http://localhost:3000/question-detail/${questionId}`,
			'http://localhost:8089/question-detail',
		);
		console.log(questionId); //에러 때문에 넣어본거. 잘 넘어오는지 확인
		return response.data;
	} catch (error) {
		console.error('Error fetching question detail:', error);
		throw error;
	}
};
