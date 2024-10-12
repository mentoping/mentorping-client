<template>
	<AdminLayout>
		<div class="inquiry-detail">
			<button @click="goBack" class="back-button">뒤로 가기</button>
			<h2>문의 상세 내역</h2>
			<div v-if="inquiry" class="inquiry-info">
				<p><strong>작성자:</strong> {{ inquiry.userName }}</p>
				<p><strong>내용:</strong> {{ inquiry.inquiryContent }}</p>
				<p><strong>날짜:</strong> {{ inquiry.date }}</p>

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
			<div v-else>
				<p>문의 데이터를 불러오는 중입니다...</p>
			</div>
		</div>
	</AdminLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useInquiriesStore } from '@/stores/useInquiriesStore';
import AdminLayout from './AdminLayout.vue';

const route = useRoute();
const router = useRouter();
const inquiriesStore = useInquiriesStore();
const inquiry = ref(null);
const replies = ref([]); // 초기화된 상태
const newReply = ref('');

// 컴포넌트가 마운트되었을 때 문의 데이터를 불러오기
onMounted(async () => {
	// 문의 데이터를 다시 가져와서 최신화
	await inquiriesStore.fetchInquiries();

	// 문의 ID 가져오기
	const inquiryId = Number(route.params.id);

	// 문의 리스트에서 해당 ID에 맞는 문의 찾기
	inquiry.value = inquiriesStore.inquiries.find(inq => inq.id === inquiryId);

	// 문의에 맞는 답변 리스트 가져오기
	if (inquiry.value) {
		replies.value = inquiry.value.replies || []; // 문의에 답변이 있는 경우 처리
	}
});

// 뒤로 가기 기능
function goBack() {
	if (route.query.prevTab) {
		router.push({ path: '/admin', query: { tab: route.query.prevTab } });
	} else {
		router.push('/admin');
	}
}

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
		await inquiriesStore.updateInquiryAnswer(inquiry.value.id, reply.content);

		// 답변 입력창 초기화
		newReply.value = '';
	}
}

// 문의 삭제 기능
async function deleteInquiry() {
	// 삭제 전에 확인 메시지를 보여줌
	const isConfirmed = confirm('정말로 삭제하시겠습니까?');

	// 사용자가 확인을 누르면 삭제 진행
	if (isConfirmed && inquiry.value) {
		await inquiriesStore.deleteInquiry(inquiry.value.id);
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
