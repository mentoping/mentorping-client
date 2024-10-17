import axios from 'axios';

export const fetchMentorings = async () => {
	//멘토링 목록 불러오기
	try {
		const response = await axios.get('/api/mentorings');
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.error('Failed to fetch Mentorings:', error);
		throw error;
	}
};

export const mentoringCategorySearch = async (category, sort, keyword) => {
	// 분류 눌렀을때 호출되는 데이터(무조건 1페이지로간다.)
	try {
		if (category === 'ALL') {
			const response = await axios.get(
				`/api/mentorings?sort=${sort}&keyword=${keyword}`,
				{
					withCredentials: true,
				},
			);
			return response.data;
		} else {
			const response = await axios.get(
				`/api/mentorings/category/${category}?sort=${sort}&keyword=${keyword}`,
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

export const mentoringPagingSearch = async (category, sort, page, keyword) => {
	// 페이지별 질문 목록 불러오기 (카테고리별, 처음, 정렬순서는 선택)
	try {
		if (category === 'ALL') {
			const response = await axios.get(
				`/api/mentorings?sort=${sort}&page=${page}&keyword=${keyword}`,
				{
					withCredentials: true,
				},
			);
			return response.data;
		} else {
			const response = await axios.get(
				`/api/mentorings/category/${category}?sort=${sort}&page=${page}&keyword=${keyword}`,
				{
					withCredentials: true,
				},
			);
			return response.data;
		}
	} catch (error) {
		console.error('Failed to fetch mentorings:', error);
		throw error;
	}
};

export const fetchDetailMentoring = async mentoringId => {
	try {
		const response = await axios.get(`/api/mentorings/${mentoringId}`, {
			withCredentials: true,
		});
		return response.data;
	} catch (error) {
		console.error('Error fetching question detail:', error);
		throw error;
	}
};

export const menteeProfileMentoring = async () => {
	// 내가 신청한 멘토링 목록 불러오기
	try {
		const response = await axios.get('/api/mentorings/applied/approved', {
			withCredentials: true,
		});
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.error('Failed to fetch Mentorings:', error);
		throw error;
	}
};

export const mentorProfileMentoring = async () => {
	// 내가 개설한 멘토링 목록 불러오기
	try {
		const response = await axios.get('/api/mentorings/my-mentorings', {
			withCredentials: true,
		});
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.error('Failed to fetch Mentorings:', error);
		throw error;
	}
};
