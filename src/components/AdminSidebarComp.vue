<!-- components/AdminSidebar.vue -->
<template>
	<aside class="sidebar">
		<ul>
			<li
				:class="{ active: activeTab === 'reports' }"
				@click="setTab('reports')"
			>
				신고
			</li>
			<li
				:class="{ active: activeTab === 'inquiries' }"
				@click="setTab('inquiries')"
			>
				문의
			</li>
			<li
				:class="{ active: activeTab === 'dashboard' }"
				@click="setTab('dashboard')"
			>
				대쉬보드
			</li>
			<li
				:class="{ active: activeTab === 'userManagement' }"
				@click="setTab('userManagement')"
			>
				유저 관리
			</li>
		</ul>
	</aside>
</template>

<script setup>
import { useAdminStore } from '@/stores/adminStore';
import { computed } from 'vue';

const adminStore = useAdminStore();
const activeTab = computed(() => adminStore.activeTab);

function setTab(tab) {
	// 'reports' 탭이 클릭되면 selectedReport를 초기화
	if (tab === 'reports') {
		adminStore.setSelectedReport(null); // 신고 목록을 보기 위해 selectedReport 초기화
	} else if (tab === 'inquiries') {
		adminStore.setSelectedInquiry(null); // 신고 목록을 보기 위해 selectedReport 초기화
	} else if (tab === 'dashboard') {
		adminStore.setSelectedDashboard(null); // 신고 목록을 보기 위해 selectedReport 초기화
	}
	// } else if (tab === 'userManagement') {
	// 	adminStore.setSelectedReport(null); // 신고 목록을 보기 위해 selectedReport 초기화
	// }

	// activeTab을 변경
	adminStore.setActiveTab(tab);
}
</script>

<style scoped>
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
</style>
