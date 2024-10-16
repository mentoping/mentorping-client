<template>
	<div v-if="selectedInquiry" class="inquiry-detail">
		<h2>문의 상세 내역</h2>
		<div class="inquiry-info">
			<p><strong>작성자:</strong> {{ selectedInquiry.userName }}</p>
			<p><strong>내용:</strong> {{ selectedInquiry.inquiryContent }}</p>
			<p><strong>날짜:</strong> {{ selectedInquiry.date }}</p>

			<!-- 삭제 버튼 -->
			<button @click="deleteInquiry" class="delete-button">문의 삭제</button>

			<div class="reply-section">
				<h3>관리자 답변</h3>
				<ul>
					<li v-for="reply in replies" :key="reply.id" class="reply-item">
						<p>{{ reply.content }}</p>
						<p class="reply-date">{{ reply.date }}</p>
					</li>
				</ul>
				<textarea
					v-model="newReply"
					placeholder="답변을 입력하세요"
					class="reply-textarea"
				></textarea>
				<button @click="addReply" class="reply-button">답변 달기</button>
			</div>
		</div>
	</div>
	<div v-else>
		<p>문의 데이터를 불러오는 중입니다...</p>
	</div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router'; // router 사용을 위한 import
import { useInquiriesStore } from '@/stores/useInquiriesStore';
import { useAdminStore } from '@/stores/adminStore';

const inquiriesStore = useInquiriesStore();
const adminStore = useAdminStore();
const router = useRouter(); // router 사용

// const inquiry = ref(null);
const replies = ref([]); // 초기화된 상태
const newReply = ref('');

const selectedInquiry = computed(() => adminStore.selectedInquiry); // 선택된 문의 가져오기

// 컴포넌트가 마운트되었을 때, 선택된 문의에서 답변 목록 가져오기
onMounted(async () => {
	if (selectedInquiry.value) {
		replies.value = selectedInquiry.value.replies || []; // 문의에 답변이 있는 경우 가져오기
	}
});

// 답변 추가 기능
async function addReply() {
	if (newReply.value.trim()) {
		// 새로운 답변을 추가
		const reply = {
			id: replies.value.length + 1,
			content: newReply.value,
			date: new Date().toLocaleString(),
		};
		replies.value.push(reply);

		// 답변을 서버에 업데이트 (inquiriesStore 사용)
		await inquiriesStore.updateInquiryAnswer(
			selectedInquiry.value.id,
			reply.content,
		);

		// 답변 입력창 초기화
		newReply.value = '';
	}
}

// 문의 삭제 기능
async function deleteInquiry() {
	// 삭제 전에 확인 메시지를 보여줌
	const isConfirmed = confirm('정말로 삭제하시겠습니까?');

	// 사용자가 확인을 누르면 삭제 진행
	if (isConfirmed && selectedInquiry.value) {
		await inquiriesStore.deleteInquiry(selectedInquiry.value.id);
		router.push('/admin?tab=inquiries'); // 삭제 후 문의 관리 페이지로 이동
	}
}
</script>

<style scoped>
.inquiry-detail {
	padding: 20px;
}

.back-button,
.delete-button {
	margin-bottom: 20px;
	padding: 10px;
	background-color: #4caf50;
	color: white;
	border: none;
	cursor: pointer;
}

.delete-button {
	background-color: #f44336; /* 삭제 버튼의 색상 */
}

.back-button:hover,
.delete-button:hover {
	background-color: #45a049;
}

.delete-button:hover {
	background-color: #e53935; /* 삭제 버튼 hover 색상 */
}

.inquiry-info {
	padding: 15px;
	border: 1px solid #ddd;
	background-color: #fafafa;
	margin-bottom: 20px;
}

.reply-section {
	margin-top: 20px;
}

.reply-textarea {
	width: 100%;
	height: 80px;
	margin-top: 10px;
	margin-bottom: 10px;
	padding: 10px;
	border: 1px solid #ddd;
	border-radius: 4px;
}

.reply-button {
	padding: 10px;
	background-color: #4caf50;
	color: white;
	border: none;
	cursor: pointer;
}

.reply-button:hover {
	background-color: #45a049;
}

.reply-item {
	padding: 10px;
	border-bottom: 1px solid #ddd;
}

.reply-date {
	font-size: 0.9em;
	color: #888;
}
</style>
