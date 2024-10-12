// stores/useReportsStore.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useReportsStore = defineStore('reports', {
	state: () => ({
		reports: [],
	}),
	actions: {
		async fetchReports() {
			try {
				const response = await axios.get('/api/reports'); // 신고 데이터 가져오기
				this.reports = response.data;
			} catch (error) {
				console.error('Failed to fetch reports:', error);
			}
		},
	},
});
