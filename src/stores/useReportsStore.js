import { defineStore } from 'pinia';
import axiosInstance from '@/plugins/axios';

export const useReportsStore = defineStore('reports', {
	state: () => ({
		reports: [], // 신고 리스트
		isLoading: false, // 로딩 상태 관리
		error: null, // 에러 상태 관리
	}),
	actions: {
		// 날짜 포맷팅 함수 추가
		formatDate(dateString) {
			const date = new Date(dateString);
			const year = date.getFullYear();
			const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
			const day = String(date.getDate()).padStart(2, '0');
			const hours = String(date.getHours()).padStart(2, '0');
			const minutes = String(date.getMinutes()).padStart(2, '0');

			return `${year}-${month}-${day} ${hours}:${minutes}`;
		},

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
						reporterName: report.reporterName, // 신고자 Name
						targetMemberId: report.targetMemberId, // 신고 대상자 ID
						targetMemberName: report.targetMemberName,
						date: this.formatDate(report.createdAt), // 날짜 포맷 적용
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

		// 신고 삭제하기
		async deleteReport(reportId) {
			this.isLoading = true;
			this.error = null;

			try {
				await axiosInstance.delete(`/admin/reports/${reportId}`);
				// 스토어에서 삭제된 신고 제거
				this.reports = this.reports.filter(report => report.id !== reportId);
			} catch (error) {
				this.error = error;
				console.error('Failed to delete report:', error);
			} finally {
				this.isLoading = false;
			}
		},
	},
});
