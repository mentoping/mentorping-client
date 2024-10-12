import { ref } from 'vue';
import axiosInstance from '@/plugins/axios';

export function useInquiriesStore() {
	const inquiries = ref([]); // 문의 리스트
	const isLoading = ref(false); // 로딩 상태 관리
	const error = ref(null); // 에러 상태 관리

	// 문의 리스트 가져오기
	async function fetchInquiries() {
		isLoading.value = true; // 로딩 상태 시작
		error.value = null; // 이전 에러 초기화

		try {
			const response = await axiosInstance.get('/admin/inquiries'); // 문의 데이터 가져오기
			// inquiries.value = response.data.inquiries;
			const data = response.data; // 서버에서 받은 데이터를 저장

			if (data && Array.isArray(data.inquiries)) {
				this.inquiries = data.inquiries.map(inquiry => ({
					id: inquiry.id,
					userId: inquiry.userId, // 문의내역 작성 ID
					userName: inquiry.userName, // 신고자 Name
					title: inquiry.subject,
					// date: new Date().toLocaleDateString(), // 임시로 현재 날짜 추가 (백엔드에서 날짜 제공 필요)
					date: inquiry.createAt, // 임시로 현재 날짜 추가 (백엔드에서 날짜 제공 필요)
					inquiryContent: inquiry.inquiryContent, // 문의 내역
					answerContent: inquiry.answerContent,
				}));
			} else {
				console.error('API 응답 데이터 형식이 예상과 다릅니다:', data);
			}
		} catch (err) {
			error.value = err; // 에러 발생 시 상태 업데이트
			console.error('Failed to fetch inquiries:', err);
		} finally {
			isLoading.value = false; // 로딩 상태 종료
		}
	}

	// 문의 삭제하기
	async function deleteInquiry(inquiryId) {
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
	}

	// 문의 답변 업데이트
	async function updateInquiryAnswer(inquiryId, answerContent) {
		isLoading.value = true;
		error.value = null;

		try {
			const response = await axiosInstance.put(
				`/admin/inquiries/${inquiryId}/answer`,
				{
					answerContent,
				},
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
	}

	return {
		inquiries,
		isLoading,
		error,
		fetchInquiries,
		deleteInquiry,
		updateInquiryAnswer,
	};
}
