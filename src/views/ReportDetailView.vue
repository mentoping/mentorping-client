<template>
	<AdminLayout>
		<div class="report-detail">
			<h2>신고 상세 내역</h2>
			<div v-if="report" class="report-info">
				<p><strong>신고자 ID:</strong> {{ report.reporter }}</p>
				<p><strong>신고자 이름:</strong> {{ report.reporterName }}</p>
				<p><strong>신고 당한 자 ID:</strong> {{ report.targetMemberId }}</p>
				<p><strong>신고 당한 자 이름:</strong> {{ report.targetMemberName }}</p>
				<p><strong>내용:</strong> {{ report.content }}</p>
				<p><strong>신고 타입:</strong> {{ report.reportType }}</p>
				<button @click="deleteReport" class="delete-button">신고 삭제</button>
			</div>
			<div v-else>
				<p>신고 데이터를 불러오는 중입니다...</p>
			</div>
		</div>
	</AdminLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useReportsStore } from '@/stores/useReportsStore';
import AdminLayout from '@/views/AdminLayout.vue';

const route = useRoute();
const router = useRouter();
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

async function deleteReport() {
	if (confirm('정말로 이 신고를 삭제하시겠습니까?')) {
		try {
			await reportsStore.deleteReport(report.value.id);
			alert('신고가 삭제되었습니다.');
			router.push({ path: '/admin', query: { tab: 'reports' } });
		} catch (error) {
			console.error('신고 삭제 중 오류:', error); // 오류 내용을 콘솔에 출력
			alert('신고 삭제 중 오류가 발생했습니다.');
		}
	}
}
</script>

<style scoped>
.report-detail {
	padding: 20px;
}

.delete-button {
	margin-top: 20px;
	padding: 10px;
	background-color: #e53935; /* 붉은색 버튼 */
	color: white;
	border: none;
	cursor: pointer;
}

.delete-button:hover {
	background-color: #d32f2f; /* 버튼 hover 시 더 진한 붉은색 */
}

.report-info {
	padding: 15px;
	border: 1px solid #ddd;
	background-color: #fafafa;
}
</style>
