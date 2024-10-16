import { defineStore } from 'pinia';
import axios from 'axios';

export const useQuestionStore = defineStore('questionStore', {
	state: () => ({
		categoryCounts: {}, // 카테고리별 질문 수를 저장하는 상태
	}),
	actions: {
		async fetchCategoryCounts() {
			try {
				const response = await axios.get(
					'http://localhost:8089/questions/category-counts',
				);
				this.categoryCounts = response.data; // 데이터를 상태에 저장
				console.log('question categoryy::', this.categoryCounts);
			} catch (error) {
				console.error('Error fetching category counts:', error);
			}
		},
	},
});
