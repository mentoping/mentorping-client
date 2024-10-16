<template>
	<main class="content">
		<div class="tab-content">
			<h2>문의 관리</h2>
			<div class="board">
				<ul class="inquiry-list">
					<li
						v-for="inquiry in paginatedInquiries"
						:key="inquiry.id"
						@click="viewInquiryDetail(inquiry)"
						class="inquiry-item"
					>
						<h3>{{ inquiry.userName }}님의 문의</h3>
						<p>{{ inquiry.date }}</p>
					</li>
					<li v-if="paginatedInquiries.length === 0">
						문의 데이터가 없습니다.
					</li>
				</ul>
				<div class="pagination">
					<button @click="prevPage" :disabled="currentPage === 1">이전</button>
					<span>페이지 {{ currentPage }} / {{ totalPages }}</span>
					<button @click="nextPage" :disabled="currentPage === totalPages">
						다음
					</button>
				</div>
			</div>
		</div>
	</main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useInquiriesStore } from '@/stores/useInquiriesStore';
import { useAdminStore } from '@/stores/adminStore';

const currentPage = ref(1);
const itemsPerPage = 10;
const adminStore = useAdminStore(); // Pinia store 연결

// 스토어에서 inquiries 가져오기
const inquiriesStore = useInquiriesStore();
const inquiries = computed(() => inquiriesStore.inquiries);

// 최신 순으로 정렬된 신고 목록 가져오기
const sortedReports = computed(() => {
	return inquiries.value
		.slice()
		.sort((a, b) => new Date(b.date) - new Date(a.date)); // 최신 순 정렬
});

// 페이징처리
const paginatedInquiries = computed(() => {
	const start = (currentPage.value - 1) * itemsPerPage;
	const end = start + itemsPerPage;
	return sortedReports.value.slice(start, end);
});

const totalPages = computed(() => {
	return Math.ceil(sortedReports.value.length / itemsPerPage);
});

// 문의 상세보기 클릭 시
function viewInquiryDetail(inquiryId) {
	adminStore.setSelectedInquiry(inquiryId); // 선택한 문의글를 Pinia에 저장
}

function prevPage() {
	if (currentPage.value > 1) {
		currentPage.value--;
	}
}

function nextPage() {
	if (currentPage.value < totalPages.value) {
		currentPage.value++;
	}
}

// 컴포넌트가 마운트되었을 때 문의 데이터 가져오기
onMounted(async () => {
	await inquiriesStore.fetchInquiries();
});
</script>

<style scoped>
.content {
	flex: 3 1 auto;
	padding: 20px;
	.tab-content {
		padding: 20px;
		margin-bottom: 20px;
		background-color: #f9f9f9;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	}
	.board {
		.report-list,
		.inquiry-list,
		.user-list {
			list-style: none;
			padding: 0;
			.report-item,
			.inquiry-item,
			.user-item {
				padding: 15px;
				margin-bottom: 10px;
				background-color: #fff;
				border: 1px solid #ddd;
				cursor: pointer;
				&:hover {
					background-color: #f2f2f2;
				}
			}
		}
		.pagination {
			display: flex;
			justify-content: center;
			margin-top: 20px;
			button {
				margin: 0 10px;
				padding: 10px;
				background-color: #4caf50;
				color: white;
				border: none;
				cursor: pointer;
				&:disabled {
					background-color: #ccc;
					cursor: not-allowed;
				}
			}
		}
	}
	.dashboard-content {
		padding: 10px;
		background-color: #fafafa;
		border: 1px solid #ddd;
	}
}
</style>
