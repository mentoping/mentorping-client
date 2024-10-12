<template>
	<div class="report-detail">
		<button @click="goBack" class="back-button">뒤로 가기</button>
		<h2>신고 상세 내역</h2>
		<div v-if="report" class="report-info">
			<p><strong>신고자:</strong> {{ report.reporter }}</p>
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
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const report = ref(null);

const reportsData = [
	{ id: 1, reporter: '사용자1', content: '신고 내용 1', date: '2024-10-11' },
	{ id: 2, reporter: '사용자2', content: '신고 내용 2', date: '2024-10-12' },
	{ id: 3, reporter: '사용자3', content: '신고 내용 3', date: '2024-10-13' },
	{ id: 4, reporter: '사용자4', content: '신고 내용 4', date: '2024-10-14' },
	{ id: 5, reporter: '사용자5', content: '신고 내용 5', date: '2024-10-15' },
	{ id: 6, reporter: '사용자6', content: '신고 내용 6', date: '2024-10-16' },
	{ id: 7, reporter: '사용자7', content: '신고 내용 7', date: '2024-10-17' },
	{ id: 8, reporter: '사용자8', content: '신고 내용 8', date: '2024-10-18' },
	{ id: 9, reporter: '사용자9', content: '신고 내용 9', date: '2024-10-19' },
	{ id: 10, reporter: '사용자10', content: '신고 내용 10', date: '2024-10-20' },
	{ id: 11, reporter: '사용자11', content: '신고 내용 11', date: '2024-10-21' },
	{ id: 12, reporter: '사용자12', content: '신고 내용 12', date: '2024-10-22' },
	{ id: 13, reporter: '사용자13', content: '신고 내용 13', date: '2024-10-23' },
	{ id: 14, reporter: '사용자14', content: '신고 내용 14', date: '2024-10-24' },
	{ id: 15, reporter: '사용자15', content: '신고 내용 15', date: '2024-10-25' },
	{ id: 16, reporter: '사용자16', content: '신고 내용 16', date: '2024-10-26' },
	{ id: 17, reporter: '사용자17', content: '신고 내용 17', date: '2024-10-27' },
	{ id: 18, reporter: '사용자18', content: '신고 내용 18', date: '2024-10-28' },
	{ id: 19, reporter: '사용자19', content: '신고 내용 19', date: '2024-10-29' },
	{ id: 20, reporter: '사용자20', content: '신고 내용 20', date: '2024-10-30' },
];

onMounted(() => {
	const reportId = Number(route.params.id);
	report.value = reportsData.find(r => r.id === reportId);
});

function goBack() {
	if (route.query.prevTab) {
		router.push({ path: '/admin', query: { tab: route.query.prevTab } });
	} else {
		router.push('/admin');
	}
}
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
