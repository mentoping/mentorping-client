// stores/adminStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAdminStore = defineStore('adminStore', () => {
	const activeTab = ref('reports');
	const selectedReport = ref(null); // 선택된 신고
	const selectedInquiry = ref(null); // 선택된 문의
	const selectedDashboard = ref(null); // 선택된 문의

	function setActiveTab(tab) {
		activeTab.value = tab;
	}

	function setSelectedReport(report) {
		selectedReport.value = report;
	}

	function setSelectedInquiry(inquiry) {
		selectedInquiry.value = inquiry;
	}

	function setSelectedDashboard(dashboard) {
		selectedDashboard.value = dashboard;
	}

	return {
		activeTab,
		selectedReport,
		selectedInquiry,
		selectedDashboard,
		setActiveTab,
		setSelectedReport,
		setSelectedInquiry,
		setSelectedDashboard,
	};
});
