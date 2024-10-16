<template>
	<div class="dashboard">
		<div class="grid-container">
			<MemberStatistics />
			<QuestionStatistics />
			<MentoringStatistics />
			<MentorStatistics />
		</div>
	</div>
</template>

<script setup>
import MemberStatistics from '@/components/dashboard/MemberStatistics.vue';
import QuestionStatistics from '@/components/dashboard/QuestionStatistics.vue';
import MentoringStatistics from '@/components/dashboard/MentoringStatistics.vue';
import MentorStatistics from '@/components/dashboard/MentorStatistics.vue';
</script>

<style scoped>
.grid-container {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: repeat(2, 1fr);
	grid-gap: 20px;
	padding: 20px;
}
</style>
