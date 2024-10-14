// src/stores/dashboard.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useDashboardStore = defineStore('dashboard', {
	state: () => ({
		memberStats: {},
		questionStats: {},
		mentoringStats: {},
		mentorStats: {},
	}),
	actions: {
		async fetchDashboardStats() {
			try {
				const response = await axios.get('/admin/dashboard');
				this.memberStats = response.data.memberStats;
				this.questionStats = response.data.questionStats;
				this.mentoringStats = response.data.mentoringStats;
				this.mentorStats = response.data.mentorStats;
			} catch (error) {
				console.error(
					'대시보드 통계 데이터를 가져오는 데 실패했습니다.',
					error,
				);
			}
		},
	},
});
