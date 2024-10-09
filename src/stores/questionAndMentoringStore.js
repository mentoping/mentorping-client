//불러온 질문 목록을 저장할 store
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useQuestionStore = defineStore('questionStore', () => {
	const questions = ref([]);
	const mentorings = ref([]);
	const currentPage = ref('null');
	const totalPages = ref('null');
	const orderCondition = ref('createdAt'); //likeCount

	const setQuestions = newQuestions => {
		questions.value = newQuestions;
		currentPage.value = String(Number(questions.value.pageable.pageNumber) + 1);
		totalPages.value = questions.value.totalPages;
	};

	const setMentorings = newMentorings => {
		questions.value = newMentorings;
	};

	return {
		questions,
		mentorings,
		totalPages,
		currentPage,
		orderCondition,
		setQuestions,
		setMentorings,
	};
});
