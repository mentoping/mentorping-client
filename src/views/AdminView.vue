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
							<h3>{{ report.reporterName }}님의 신고</h3>
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
							<h3>{{ inquiry.userName }}님의 문의</h3>
							<!-- <p>{{ inquiry.title }}</p> -->
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
import { useInquiriesStore } from '@/stores/useInquiriesStore';

const activeTab = ref('reports');
const route = useRoute();
const router = useRouter();
const currentPage = ref(1);
const itemsPerPage = 10;

// 스토어
const reportsStore = useReportsStore();
const inquiriesStore = useInquiriesStore();

// 스토어에서 reports 가져오기
const reports = computed(() => reportsStore.reports);

// 스토어에서 inquirys 가져오기
const inquiries = computed(() => inquiriesStore.inquiries);

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
	await inquiriesStore.fetchInquiries();
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
