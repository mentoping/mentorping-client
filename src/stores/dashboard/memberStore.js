// src/stores/rolecountStore.js
import { defineStore } from 'pinia';

export const useRoleCountStore = defineStore('rolecount', {
	state: () => ({
		menteeCount: 0,
		mentorCount: 0,
	}),
	actions: {
		async fetchRoleCounts() {
			try {
				const response = await fetch('http://localhost:8089/members/counts');
				const data = await response.json();
				this.menteeCount = data.menteeCount;
				this.mentorCount = data.mentorCount;
			} catch (error) {
				console.error('Error fetching role counts:', error);
			}
		},
	},
});
