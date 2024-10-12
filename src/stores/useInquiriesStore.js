// stores/useInquiriesStore.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useInquiriesStore = defineStore('inquiries', {
	state: () => ({
		inquiries: [],
	}),
	actions: {
		async fetchInquiries() {
			try {
				const response = await axios.get('/api/inquiries'); // 문의 데이터 가져오기
				this.inquiries = response.data;
			} catch (error) {
				console.error('Failed to fetch inquiries:', error);
			}
		},
		async replyToInquiry(inquiryId, replyContent) {
			try {
				await axios.post(`/api/inquiries/${inquiryId}/reply`, {
					content: replyContent,
				});
				alert(`문의 ID ${inquiryId}에 댓글을 달았습니다.`);
			} catch (error) {
				console.error('Failed to reply to inquiry:', error);
			}
		},
	},
});
