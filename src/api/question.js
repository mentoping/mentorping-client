import axios from 'axios';

export const fetchQuestions = async () => {
	//질문 목록 불러오기(전체, 처음, 최신순,)
	try {
		const response = await axios.get('/api/questions', {
			withCredentials: true,
		});
		return response.data;
	} catch (error) {
		console.error('Failed to fetch questions:', error);
		throw error;
	}
};

export const questionCategorySearch = async (category, sort, keyword) => {
	// 분류 눌렀을때 호출되는 데이터(무조건 1페이지로간다.)
	try {
		if (category === 'ALL') {
			const response = await axios.get(
				`/api/questions?sort=${sort}&keyword=${keyword}`,
				{
					withCredentials: true,
				},
			);
			return response.data;
		} else {
			const response = await axios.get(
				`/api/questions/category/${category}?sort=${sort}&keyword=${keyword}`,
				{
					withCredentials: true,
				},
			);
			return response.data;
		}
	} catch (error) {
		console.error('Failed to fetch questions:', error);
		throw error;
	}
};

export const questionPagingSearch = async (category, sort, page, keyword) => {
	// 페이지별 질문 목록 불러오기 (카테고리별, 처음, 정렬순서는 선택)
	try {
		if (category === 'ALL') {
			const response = await axios.get(
				`/api/questions?sort=${sort}&page=${page}&keyword=${keyword}`,
				{
					withCredentials: true,
				},
			);
			return response.data;
		} else {
			const response = await axios.get(
				`/api/questions/category/${category}?sort=${sort}&page=${page}&keyword=${keyword}`,
				{
					withCredentials: true,
				},
			);
			return response.data;
		}
	} catch (error) {
		console.error('Failed to fetch questions:', error);
		throw error;
	}
};

//디테일 페이지에서 현재 페이지의 질문 정보를 가져오는(질문만)
export const fetchDetailQuestion = async questionId => {
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
