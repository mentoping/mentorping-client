<template>
	<div class="admin-page">
		<AdminSidebar />
		<AdminContent />
	</div>
</template>

<script setup>
import AdminSidebar from '@/components/AdminSidebarComp.vue';
import AdminContent from '@/components/AdminContentComp.vue';
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
