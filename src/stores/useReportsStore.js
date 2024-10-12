import { defineStore } from 'pinia';
import axiosInstance from '@/plugins/axios';

export const useReportsStore = defineStore('reports', {
	state: () => ({
		reports: [], // 신고 리스트
		isLoading: false, // 로딩 상태를 관리
		error: null, // 에러 상태 관리
	}),
	actions: {
		async fetchReports() {
			this.isLoading = true; // 로딩 상태 시작
			this.error = null; // 이전 에러 초기화

			try {
				const response = await axiosInstance.get('/admin/reports'); // 백엔드에서 신고 데이터 가져오기
				const data = response.data; // 서버에서 받은 데이터를 저장

				// reports 배열 추출
				if (data && Array.isArray(data.reports)) {
					this.reports = data.reports.map(report => ({
						id: report.id,
						reporter: report.reporterId, // 신고자 ID
						targetMemberId: report.targetMemberId, // 신고 대상자 ID
						date: new Date().toLocaleDateString(), // 임시로 현재 날짜 추가 (백엔드에서 날짜 제공 필요)
						content: report.reason, // 신고 이유
						status: report.status, // 신고 상태
						reportType: report.reportType, // 신고 유형
					}));
				} else {
					console.error('API 응답 데이터 형식이 예상과 다릅니다:', data);
				}

				// 스토어에 저장된 데이터를 콘솔에 출력 (디버깅용)
				console.log('Fetched reports:', this.reports);
			} catch (error) {
				this.error = error; // 에러 발생 시 상태 업데이트
				console.error('Failed to fetch reports:', error);
			} finally {
				this.isLoading = false; // 로딩 상태 종료
			}
		},
	},
});
