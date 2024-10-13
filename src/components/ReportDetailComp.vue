<template>
	<div v-if="selectedReport" class="report-detail">
		<h2>신고 상세 내역</h2>
		<div class="report-info">
			<p><strong>신고자 ID:</strong> {{ selectedReport.reporter }}</p>
			<p><strong>신고자 이름:</strong> {{ selectedReport.reporterName }}</p>
			<p>
				<strong>신고 당한 자 ID:</strong> {{ selectedReport.targetMemberId }}
			</p>
			<p>
				<strong>신고 당한 자 이름:</strong>
				{{ selectedReport.targetMemberName }}
			</p>
			<p><strong>내용:</strong> {{ selectedReport.content }}</p>
			<p><strong>신고 타입:</strong> {{ selectedReport.reportType }}</p>
			<button @click="deleteReport" class="delete-button">신고 삭제</button>
		</div>
	</div>
	<div v-else>
		<p>신고 데이터를 선택해주세요.</p>
	</div>
</template>

<script setup>
import { useAdminStore } from '@/stores/adminStore';
import { useReportsStore } from '@/stores/useReportsStore';
import { computed } from 'vue';

const adminStore = useAdminStore();
const reportsStore = useReportsStore();
// const selectedReport = ref(null);

const selectedReport = computed(() => adminStore.selectedReport); // computed로 연결

async function deleteReport() {
	if (confirm('정말로 이 신고를 삭제하시겠습니까?')) {
		try {
			await reportsStore.deleteReport(selectedReport.value.id);
			alert('신고가 삭제되었습니다.');
			adminStore.setActiveTab('reports');
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
	background-color: #e53935;
	color: white;
	border: none;
	cursor: pointer;
}

.delete-button:hover {
	background-color: #d32f2f;
}

.report-info {
	padding: 15px;
	border: 1px solid #ddd;
	background-color: #fafafa;
}
</style>
