<template>
	<div class="mentoring-container">
		<div>
			<ExplainComp :button-route="'/create-mentoring'">
				<!-- 제목 slot -->
				<template #title> 멘토링 </template>
				<!-- 설명 slot -->
				<template #description>
					멘토링을 통해 멘토화 함께 성장해보세요
				</template>
				<!-- 버튼 slot -->
				<template #button> 개설하기 </template>
			</ExplainComp>
		</div>
		<div><SearchComp contentType="mentoring"></SearchComp></div>
		<div><CategoriesComp contextType="mentoring"></CategoriesComp></div>
		<div class="order"><OrderConditonComp></OrderConditonComp></div>
		<div class="card-view">
			<MentoringCardComp></MentoringCardComp>
		</div>
		<div class="page-move"><MentoringPagingComp></MentoringPagingComp></div>
	</div>
</template>

<script setup>
import ExplainComp from '@/components/ExplainComp.vue';
import SearchComp from '@/components/SearchComp.vue';
import CategoriesComp from '@/components/CategoriesComp.vue';
import OrderConditonComp from '@/components/OrderConditonComp.vue';
import MentoringCardComp from '@/components/MentoringCardComp.vue';
import MentoringPagingComp from '@/components/MentoringPagingComp.vue';

import { useQandMStore } from '@/stores/questionAndMentoringStore';
import { onMounted } from 'vue';
import { fetchMentorings } from '@/api/mentoring';

const questionStore = useQandMStore();

onMounted(async () => {
	try {
		/*현재 로그인한 유저의 좋아요 질문 목록 id들도 불러와야한다.*/
		//전체 질문목록의 1페이지 불러오기
		const mentoringsData = await fetchMentorings();
		questionStore.setMentoringList(mentoringsData);
	} catch (error) {
		console.error('Failed to fetch questions:', error);
	}
});
</script>

<style scoped>
.mentoring-container {
	display: flex;
	flex-direction: column; /* 세로 방향으로 정렬 */
	align-items: center; /* 가로 축에서 가운데 정렬 */
	margin-top: 10vh;
	gap: 4vh;
}

.card-view {
	width: 80vw;
}

.order {
	width: 80vw;
}

.page-move {
	margin-bottom: 60px;
	display: flex;
	justify-content: center; /* 가로 가운데 정렬 */
	align-items: center; /* 세로 가운데 정렬 (필요에 따라 추가) */
	width: 100%; /* 부모 요소의 너비를 전체로 설정 */
	height: 100%; /* 부모 요소의 높이를 필요에 따라 설정 */
}
</style>
