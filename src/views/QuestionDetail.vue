<template>
	<div class="question-layouts"><QuestionDetailComp></QuestionDetailComp></div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useQuestionStore } from '@/stores/questionAndMentoringStore';

import QuestionDetailComp from '@/components/QuestionDetailComp.vue';

const { id } = defineProps({
	id: {
		type: String,
		required: true,
	},
});

// Pinia 스토어 사용
const questionStore = useQuestionStore();

onMounted(() => {
	// onMounted에서 스토어에 있는 fetchQuestionDetail 호출
	questionStore.setQuestionDetail(id);
});
</script>

<style scoped></style>
