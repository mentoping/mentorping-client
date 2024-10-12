//불러온 질문 목록을 저장할 store
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { fetchDetailQuestion } from '@/api/question';
import { fetchDetailMentoring } from '@/api/mentoring';

export const useQandMStore = defineStore('questionStore', () => {
	const mentoringAndQuestionList = ref([]); //질문, 멘토링 리스트 받아올 변수

	const currentPage = ref('null'); //현재 페이지
	const totalPages = ref('null'); //전체 몇페이지인지

	const orderCondition = ref('createdAt'); //정렬 기준

	const currentQuestion = ref({}); //상세 질문 페이지에 현재 해당하는 question객체
	const currentMentoring = ref({}); //상세 멘토링 페이지에 현재 해당하는 mentoring객체

	const setMandQLists = newQuestions => {
		mentoringAndQuestionList.value = newQuestions;
		currentPage.value = String(
			Number(mentoringAndQuestionList.value.pageable.pageNumber) + 1,
		);
		totalPages.value = mentoringAndQuestionList.value.totalPages;
	};

	// API에서 특정 질문을 받아와 currentQuestion에 저장하는 함수
	const setQuestionDetail = async questionId => {
		try {
			const detailQuestion = await fetchDetailQuestion(questionId); // 상세페이지 질문에 대한 API 호출
			currentQuestion.value = detailQuestion;
		} catch (error) {
			console.error('Error fetching question detail:', error);
		}
	};

	const setMentoringDetail = async mentoringId => {
		try {
			const detailMentoring = await fetchDetailMentoring(mentoringId); //상세페이지 멘토링에 대한 API호출
			currentMentoring.value = detailMentoring;
		} catch (error) {
			console.error('Error fetching mentoring detail:', error);
		}
	};

	return {
		mentoringAndQuestionList,
		totalPages,
		currentPage,
		orderCondition,
		currentQuestion,
		setMandQLists,
		setQuestionDetail,
		setMentoringDetail,
	};
});
