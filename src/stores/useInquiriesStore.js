import { ref } from 'vue';
import { defineStore } from 'pinia';
import axiosInstance from '@/plugins/axios';

export const useInquiriesStore = defineStore('inquiries', () => {
	// State
	const inquiries = ref([]); // 문의 리스트
	const isLoading = ref(false); // 로딩 상태 관리
	const error = ref(null); // 에러 상태 관리

	// Actions
	const fetchInquiries = async () => {
		isLoading.value = true;
		error.value = null;

		try {
			const response = await axiosInstance.get('/admin/inquiries');
			const data = response.data;

			console.log('Fetched inquiries:', data); // 데이터를 콘솔에 출력하여 확인

			if (data && Array.isArray(data.inquiries)) {
				inquiries.value = data.inquiries.map(inquiry => ({
					id: inquiry.id,
					userId: inquiry.userId,
					userName: inquiry.userName,
					title: inquiry.subject,
					date: formatDate(inquiry.createdAt), // 날짜 포맷 적용
					inquiryContent: inquiry.inquiryContent,
					// answerContent: inquiry.answerContent,
					replies: inquiry.answerContent // answerContent를 replies로 변환
						? [
								{
									id: 1,
									content: inquiry.answerContent,
									date: formatDate(inquiry.updatedAt || inquiry.createdAt),
								},
							]
						: [], // 답변이 없을 경우 빈 배열
					// replies: inquiry.replies || [], // 서버에서 replies 데이터가 존재하는지 확인
				}));
			} else {
				console.error('API 응답 데이터 형식이 예상과 다릅니다:', data);
			}
		} catch (err) {
			error.value = err;
			console.error('Failed to fetch inquiries:', err);
		} finally {
			isLoading.value = false;
		}
	};

	const deleteInquiry = async inquiryId => {
		isLoading.value = true;
		error.value = null;

		try {
			await axiosInstance.delete(`/admin/inquiries/${inquiryId}`);
			inquiries.value = inquiries.value.filter(
				inquiry => inquiry.id !== inquiryId,
			);
		} catch (err) {
			error.value = err;
			console.error('Failed to delete inquiry:', err);
		} finally {
			isLoading.value = false;
		}
	};

	const updateInquiryAnswer = async (inquiryId, answerContent) => {
		isLoading.value = true;
		error.value = null;

		try {
			const response = await axiosInstance.put(
				`/admin/inquiries/${inquiryId}/answer`,
				{ answerContent },
			);
			const updatedInquiry = response.data;
			const index = inquiries.value.findIndex(
				inquiry => inquiry.id === inquiryId,
			);
			if (index !== -1) {
				inquiries.value[index] = updatedInquiry;
			}
		} catch (err) {
			error.value = err;
			console.error('Failed to update inquiry answer:', err);
		} finally {
			isLoading.value = false;
		}
	};

	// 날짜 포맷 함수
	function formatDate(dateString) {
		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');

		return `${year}-${month}-${day} ${hours}:${minutes}`;
	}

	// Store에서 사용할 state와 actions 반환
	return {
		inquiries,
		isLoading,
		error,
		fetchInquiries,
		deleteInquiry,
		updateInquiryAnswer,
	};
});
