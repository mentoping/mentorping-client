<template>
	<div class="report-detail">
		<button @click="goBack" class="back-button">뒤로 가기</button>
		<h2>신고 상세 내역</h2>
		<div v-if="report" class="report-info">
			<p><strong>신고자:</strong> {{ report.reporter }}</p>
			<p><strong>신고 당한 자:</strong> {{ report.targetMemberId }}</p>
			<p><strong>내용:</strong> {{ report.content }}</p>
			<p><strong>날짜:</strong> {{ report.date }}</p>
		</div>
		<div v-else>
			<p>신고 데이터를 불러오는 중입니다...</p>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useReportsStore } from '@/stores/useReportsStore';

const route = useRoute();

const reportsStore = useReportsStore();

const report = ref(null);

onMounted(async () => {
	// 스토어에서 데이터 가져오기 (이미 로드된 경우 재요청하지 않음)
	if (!reportsStore.reports.length) {
		await reportsStore.fetchReports();
	}

	// 보고서 ID 가져오기
	const reportId = Number(route.params.id);

	// 보고서 리스트에서 해당 ID에 맞는 보고서 찾기
	report.value = reportsStore.reports.find(r => r.id === reportId);
});
</script>

<style scoped>
.report-detail {
	padding: 20px;
}

.back-button {
	margin-bottom: 20px;
	padding: 10px;
	background-color: #4caf50;
	color: white;
	border: none;
	cursor: pointer;
}

.back-button:hover {
	background-color: #45a049;
}

.report-info {
	padding: 15px;
	border: 1px solid #ddd;
	background-color: #fafafa;
}
</style>
