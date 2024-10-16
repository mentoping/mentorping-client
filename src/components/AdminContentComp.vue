<!-- components/AdminContent.vue -->
<template>
	<div class="content">
		<div v-if="activeTab === 'reports'">
			<ReportList v-if="!selectedReport" />
			<ReportDetail v-else />
		</div>
		<div v-if="activeTab === 'inquiries'">
			<InquiryList v-if="!selectedInquiry" />
			<InquiryDetail v-else />
		</div>
		<div v-if="activeTab === 'dashboard'">
			<Dashboard />
		</div>
		<div v-if="activeTab === 'userManagement'">
			<UserManagement />
		</div>
	</div>
</template>

<script setup>
import { useAdminStore } from '@/stores/adminStore';
import { computed } from 'vue';

import ReportList from '@/components/ReportListComp.vue';
import ReportDetail from '@/components/ReportDetailComp.vue';

import InquiryList from '@/components/InquiryListComp.vue';
import InquiryDetail from '@/components/InquiryDetailComp.vue';

import Dashboard from '@/components/DashboardComp.vue';
import UserManagement from '@/components/UserManagementListComp.vue';

const adminStore = useAdminStore();
const activeTab = computed(() => adminStore.activeTab);

const selectedReport = computed(() => adminStore.selectedReport);
const selectedInquiry = computed(() => adminStore.selectedInquiry);
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
