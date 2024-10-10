//불러온 질문 목록을 저장할 store
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { fetchDetailQuestion } from '@/api/question'; // API 함수 불러오기
import { fetchDetailAnswer } from '@/api/question';

export const useQuestionStore = defineStore('questionStore', () => {
	const questions = ref([]); //질문 리스트 받아올 변수
	const mentorings = ref([]); //멘토링 리스트 받아올 변수
	const currentPage = ref('null'); //현재 페이지
	const totalPages = ref('null'); //전체 몇페이지인지
	const orderCondition = ref('createdAt'); //정렬 기준

	const currentQuestion = ref({}); //상세 질문 페이지에 현재 해당하는 question객체
	const currentAnswer = ref([]); //상세 질문 페이지에 현재 해당하는 Answer객체

	const setQuestions = newQuestions => {
		questions.value = newQuestions;
		currentPage.value = String(Number(questions.value.pageable.pageNumber) + 1);
		totalPages.value = questions.value.totalPages;
	};

	const setMentorings = newMentorings => {
		questions.value = newMentorings;
	};

	// API에서 특정 질문을 받아와 currentQuestion에 저장하는 함수
	const setQuestionDetail = async questionId => {
		try {
			const detailQuestion = await fetchDetailQuestion(questionId); // 상세페이지 질문에 대한 API 호출
			const detailAnswer = await fetchDetailAnswer(questionId);
			currentQuestion.value = detailQuestion;
			currentAnswer.value = detailAnswer.content;
		} catch (error) {
			console.error('Error fetching question detail:', error);
		}
	};

	return {
		questions,
		mentorings,
		totalPages,
		currentPage,
		orderCondition,
		currentQuestion,
		currentAnswer,
		setQuestions,
		setMentorings,
		setQuestionDetail,
	};
});
