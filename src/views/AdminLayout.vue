<template>
	<div class="admin-page">
		<aside class="sidebar">
			<ul>
				<li
					:class="{ active: activeTab === 'reports' }"
					@click="setActiveTab('reports')"
				>
					신고
				</li>
				<li
					:class="{ active: activeTab === 'inquiries' }"
					@click="setActiveTab('inquiries')"
				>
					문의
				</li>
				<li
					:class="{ active: activeTab === 'dashboard' }"
					@click="setActiveTab('dashboard')"
				>
					대쉬보드
				</li>
				<li
					:class="{ active: activeTab === 'userManagement' }"
					@click="setActiveTab('userManagement')"
				>
					유저 관리
				</li>
			</ul>
		</aside>
		<main class="content">
			<slot></slot>
		</main>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const activeTab = ref('reports');
const router = useRouter();

function setActiveTab(tab) {
	activeTab.value = tab;
	router.push({ path: '/admin', query: { tab } });
}
</script>

<style scoped>
.admin-page {
	display: flex;
	flex-wrap: wrap;
}

.sidebar {
	flex: 1 1 200px;
	max-width: 300px;
	background-color: #f5f5f5;
	padding: 20px;
	border-right: 2px solid #4caf50;
	min-height: 100vh;
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
}
</style>
