<template>
	<div class="question-container">
		<div>
			<ExplainComp :button-route="'/create-question'">
				<!-- 제목 slot -->
				<template #title> 질문하기 </template>
				<!-- 설명 slot -->
				<template #description> 전문가인 멘토에게 조언을 구해보세요 </template>
				<!-- 버튼 slot -->
				<template #button> 질문하기 </template>
			</ExplainComp>
		</div>
		<div><SearchComp></SearchComp></div>
		<div><CategoriesComp contextType="question"></CategoriesComp></div>
		<div class="order"><OrderConditonComp></OrderConditonComp></div>
		<div><QuestionBoxComp></QuestionBoxComp></div>
		<div><QuestionPagingComp></QuestionPagingComp></div>
	</div>
</template>

<script setup>
import ExplainComp from '@/components/ExplainComp.vue';
import SearchComp from '@/components/SearchComp.vue';
import CategoriesComp from '@/components/CategoriesComp.vue';
import OrderConditonComp from '@/components/OrderConditonComp.vue';
import QuestionBoxComp from '@/components/QuestionBoxComp.vue';
import QuestionPagingComp from '@/components/QuestionPagingComp.vue';
import { onMounted } from 'vue';
import { useQandMStore } from '@/stores/questionAndMentoringStore';
import { fetchQuestions } from '@/api/question';

const questionStore = useQandMStore();

onMounted(async () => {
	try {
		/*현재 로그인한 유저의 좋아요 질문 목록 id들도 불러와야한다.*/
		//전체 질문목록의 1페이지 불러오기
		const questionsData = await fetchQuestions();
		questionStore.setQuestionList(questionsData);
	} catch (error) {
		console.error('Failed to fetch questions:', error);
	}
});
</script>

<style scoped>
.question-container {
	display: flex;
	flex-direction: column; /* 세로 방향으로 정렬 */
	align-items: center; /* 가로 축에서 가운데 정렬 */
	margin-top: 10vh;
	gap: 4vh;
}

.order {
	max-width: 1200px;
	width: 80vw;
}
</style>
