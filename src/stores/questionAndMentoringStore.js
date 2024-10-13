//불러온 질문 목록을 저장할 store
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { fetchDetailQuestion } from '@/api/question';
import { fetchDetailMentoring } from '@/api/mentoring';

export const useQandMStore = defineStore('questionStore', () => {
	const questionList = ref([]); //질문 리스트 받아올 변수
	const mentoringList = ref([]); //멘토링 리스트 받아올 변수

	const currentQuestionPage = ref('null'); //현재 질문 페이지
	const currentQuestionTotalPages = ref('null'); //전체 질문 몇페이지인지
	const currentMentoringPage = ref('null'); //현재 질문 페이지
	const currentMentoringTotalPages = ref('null'); //전체 질문 몇페이지인지

	const orderCondition = ref('createdAt'); //정렬 기준

	const currentQuestion = ref({}); //상세 질문 페이지에 현재 해당하는 question객체
	const currentMentoring = ref({}); //상세 멘토링 페이지에 현재 해당하는 mentoring객체

	const setQuestionList = newQuestions => {
		questionList.value = newQuestions;
		currentQuestionPage.value = String(
			Number(questionList.value.pageable.pageNumber) + 1,
		);
		currentQuestionTotalPages.value = questionList.value.totalPages;
	};

	const setMentoringList = newQuestions => {
		mentoringList.value = newQuestions;
		currentMentoringPage.value = String(
			Number(mentoringList.value.pageable.pageNumber) + 1,
		);
		currentMentoringTotalPages.value = mentoringList.value.totalPages;
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
		questionList,
		mentoringList,
		currentQuestionTotalPages,
		currentQuestionPage,
		currentMentoringPage,
		currentMentoringTotalPages,
		orderCondition,
		currentQuestion,
		currentMentoring,
		setQuestionList,
		setMentoringList,
		setQuestionDetail,
		setMentoringDetail,
	};
});
