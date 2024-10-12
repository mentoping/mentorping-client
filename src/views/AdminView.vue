<template>
	<div class="admin-page">
		<aside class="sidebar">
			<ul>
				<li
					:class="{ active: activeTab === 'reports' }"
					@click="activeTab = 'reports'"
				>
					신고
				</li>
				<li
					:class="{ active: activeTab === 'inquiries' }"
					@click="activeTab = 'inquiries'"
				>
					문의
				</li>
				<li
					:class="{ active: activeTab === 'dashboard' }"
					@click="activeTab = 'dashboard'"
				>
					대쉬보드
				</li>
				<li
					:class="{ active: activeTab === 'userManagement' }"
					@click="activeTab = 'userManagement'"
				>
					유저 관리
				</li>
			</ul>
		</aside>
		<main class="content">
			<div class="tab-content" v-if="activeTab === 'reports'">
				<h2>신고 관리</h2>
				<div class="board">
					<ul class="report-list">
						<li
							v-for="report in paginatedReports"
							:key="report.id"
							@click="viewReportDetail(report.id)"
							class="report-item"
						>
							<h3>{{ report.reporter }}님의 신고</h3>
							<p>{{ report.date }}</p>
						</li>
						<li v-if="reports.length === 0">신고 데이터가 없습니다.</li>
					</ul>
					<div class="pagination">
						<button @click="prevPage" :disabled="currentPage === 1">
							이전
						</button>
						<span>페이지 {{ currentPage }} / {{ totalPages }}</span>
						<button @click="nextPage" :disabled="currentPage === totalPages">
							다음
						</button>
					</div>
				</div>
			</div>
			<div class="tab-content" v-if="activeTab === 'inquiries'">
				<h2>문의 관리</h2>
				<div class="board">
					<ul class="inquiry-list">
						<li
							v-for="inquiry in paginatedInquiries"
							:key="inquiry.id"
							@click="viewInquiryDetail(inquiry.id)"
							class="inquiry-item"
						>
							<h3>{{ inquiry.author }}님의 문의</h3>
							<p>{{ inquiry.date }}</p>
						</li>
						<li v-if="inquiries.length === 0">문의 데이터가 없습니다.</li>
					</ul>
					<div class="pagination">
						<button @click="prevPage" :disabled="currentPage === 1">
							이전
						</button>
						<span>페이지 {{ currentPage }} / {{ totalPages }}</span>
						<button @click="nextPage" :disabled="currentPage === totalPages">
							다음
						</button>
					</div>
				</div>
			</div>
			<div class="tab-content" v-if="activeTab === 'dashboard'">
				<h2>대쉬보드</h2>
				<div class="dashboard-content">
					<!-- 사용자 데이터 대쉬보드 -->
					<p>사용자 데이터 시각화 영역입니다.</p>
				</div>
			</div>
			<div class="tab-content" v-if="activeTab === 'userManagement'">
				<h2>유저 관리</h2>
				<div class="board">
					<ul class="user-list">
						<li
							v-for="user in paginatedUsers"
							:key="user.id"
							@click="viewUserDetail(user.id)"
							class="user-item"
						>
							<h3>{{ user.name }} ({{ user.role }})</h3>
							<p>신청일: {{ user.applicationDate }}</p>
						</li>
						<li v-if="users.length === 0">유저 데이터가 없습니다.</li>
					</ul>
					<div class="pagination">
						<button @click="prevPage" :disabled="currentPage === 1">
							이전
						</button>
						<span>페이지 {{ currentPage }} / {{ totalPages }}</span>
						<button @click="nextPage" :disabled="currentPage === totalPages">
							다음
						</button>
					</div>
				</div>
			</div>
		</main>
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useReportsStore } from '@/stores/useReportsStore';

const activeTab = ref('reports');
const route = useRoute();
const router = useRouter();
const currentPage = ref(1);
const itemsPerPage = 10;

// 스토어
const reportsStore = useReportsStore();

// const reports = ref([]);

// 스토어에서 reports 가져오기
const reports = computed(() => reportsStore.reports);
// const isLoading = computed(() => reportsStore.isLoading);
// const error = computed(() => reportsStore.error);

// 임시 더미 데이터로 UI 구성
// const reports = ref([
// 	{ id: 1, reporter: '사용자1', content: '신고 내용 1', date: '2024-10-11' },
// 	{ id: 2, reporter: '사용자2', content: '신고 내용 2', date: '2024-10-12' },
// 	{ id: 3, reporter: '사용자3', content: '신고 내용 3', date: '2024-10-13' },
// 	{ id: 4, reporter: '사용자4', content: '신고 내용 4', date: '2024-10-14' },
// 	{ id: 5, reporter: '사용자5', content: '신고 내용 5', date: '2024-10-15' },
// 	{ id: 6, reporter: '사용자6', content: '신고 내용 6', date: '2024-10-16' },
// 	{ id: 7, reporter: '사용자7', content: '신고 내용 7', date: '2024-10-17' },
// 	{ id: 8, reporter: '사용자8', content: '신고 내용 8', date: '2024-10-18' },
// 	{ id: 9, reporter: '사용자9', content: '신고 내용 9', date: '2024-10-19' },
// 	{ id: 10, reporter: '사용자10', content: '신고 내용 10', date: '2024-10-20' },
// 	{ id: 11, reporter: '사용자11', content: '신고 내용 11', date: '2024-10-21' },
// 	{ id: 12, reporter: '사용자12', content: '신고 내용 12', date: '2024-10-22' },
// 	{ id: 13, reporter: '사용자13', content: '신고 내용 13', date: '2024-10-23' },
// 	{ id: 14, reporter: '사용자14', content: '신고 내용 14', date: '2024-10-24' },
// 	{ id: 15, reporter: '사용자15', content: '신고 내용 15', date: '2024-10-25' },
// 	{ id: 16, reporter: '사용자16', content: '신고 내용 16', date: '2024-10-26' },
// 	{ id: 17, reporter: '사용자17', content: '신고 내용 17', date: '2024-10-27' },
// 	{ id: 18, reporter: '사용자18', content: '신고 내용 18', date: '2024-10-28' },
// 	{ id: 19, reporter: '사용자19', content: '신고 내용 19', date: '2024-10-29' },
// 	{ id: 20, reporter: '사용자20', content: '신고 내용 20', date: '2024-10-30' },
// ]);

const inquiries = ref([
	{ id: 1, author: '사용자3', content: '문의 내용 1', date: '2024-10-11' },
	{ id: 2, author: '사용자4', content: '문의 내용 2', date: '2024-10-12' },
	{ id: 3, author: '사용자5', content: '문의 내용 3', date: '2024-10-13' },
	{ id: 4, author: '사용자6', content: '문의 내용 4', date: '2024-10-14' },
	{ id: 5, author: '사용자7', content: '문의 내용 5', date: '2024-10-15' },
	{ id: 6, author: '사용자8', content: '문의 내용 6', date: '2024-10-16' },
	{ id: 7, author: '사용자9', content: '문의 내용 7', date: '2024-10-17' },
	{ id: 8, author: '사용자10', content: '문의 내용 8', date: '2024-10-18' },
	{ id: 9, author: '사용자11', content: '문의 내용 9', date: '2024-10-19' },
	{ id: 10, author: '사용자12', content: '문의 내용 10', date: '2024-10-20' },
	{ id: 11, author: '사용자13', content: '문의 내용 11', date: '2024-10-21' },
	{ id: 12, author: '사용자14', content: '문의 내용 12', date: '2024-10-22' },
	{ id: 13, author: '사용자15', content: '문의 내용 13', date: '2024-10-23' },
	{ id: 14, author: '사용자16', content: '문의 내용 14', date: '2024-10-24' },
	{ id: 15, author: '사용자17', content: '문의 내용 15', date: '2024-10-25' },
	{ id: 16, author: '사용자18', content: '문의 내용 16', date: '2024-10-26' },
	{ id: 17, author: '사용자19', content: '문의 내용 17', date: '2024-10-27' },
	{ id: 18, author: '사용자20', content: '문의 내용 18', date: '2024-10-28' },
]);

const users = ref([
	{
		id: 1,
		name: '멘티1',
		role: '멘티',
		applicationDate: '2024-10-11',
		specialty: 'IT',
		file: '자격증.pdf',
	},
	{
		id: 2,
		name: '멘티2',
		role: '멘티',
		applicationDate: '2024-10-12',
		specialty: '디자인',
		file: '경력증명서.pdf',
	},
	// ... 추가 더미 데이터 ...
]);

const paginatedReports = computed(() => {
	const start = (currentPage.value - 1) * itemsPerPage;
	const end = start + itemsPerPage;
	return reports.value.slice(start, end);
});

const paginatedInquiries = computed(() => {
	const start = (currentPage.value - 1) * itemsPerPage;
	const end = start + itemsPerPage;
	return inquiries.value.slice(start, end);
});

const paginatedUsers = computed(() => {
	const start = (currentPage.value - 1) * itemsPerPage;
	const end = start + itemsPerPage;
	return users.value.slice(start, end);
});

const totalPages = computed(() => {
	return Math.ceil(
		(activeTab.value === 'reports'
			? reports.value.length
			: activeTab.value === 'inquiries'
				? inquiries.value.length
				: users.value.length) / itemsPerPage,
	);
});

function viewReportDetail(reportId) {
	router.push({
		name: 'ReportDetail',
		params: { id: reportId },
		query: { prevTab: 'reports' },
	});
}

function viewInquiryDetail(inquiryId) {
	router.push({
		name: 'InquiryDetailView',
		params: { id: inquiryId },
		query: { prevTab: 'inquiries' },
	});
}

function viewUserDetail(userId) {
	router.push({
		name: 'UserDetailView',
		params: { id: userId },
		query: { prevTab: 'userManagement' },
	});
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

// 컴포넌트가 마운트되었을 때 신고 데이터 가져오기
onMounted(async () => {
	if (route.query.tab) {
		activeTab.value = route.query.tab;
	}
	await reportsStore.fetchReports();
});
</script>

<style lang="scss" scoped>
.admin-page {
	display: flex;
	flex-wrap: wrap;
}

.sidebar {
	flex: 1 1 200px;
	max-width: 300px;
	background-color: #f5f5f5;
	padding: 20px;
	border-right: 2px solid #4caf50; /* 사이드바와 콘텐츠 구분을 위한 선 추가 */
	min-height: 100vh; /* 반응형으로 화면 높이에 맞춰서 사이드바가 늘어나도록 설정 */
	ul {
		list-style: none;
		padding: 0;
		li {
			padding: 10px;
			cursor: pointer;
			&.active {
				background-color: #4caf50;
				color: white;
			}
			&:hover {
				background-color: #e0e0e0;
			}
		}
	}
}

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
