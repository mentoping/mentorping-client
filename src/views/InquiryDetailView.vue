<template>
	<AdminLayout>
		<div class="inquiry-detail">
			<button @click="goBack" class="back-button">뒤로 가기</button>
			<h2>문의 상세 내역</h2>
			<div v-if="inquiry" class="inquiry-info">
				<p><strong>작성자:</strong> {{ inquiry.author }}</p>
				<p><strong>내용:</strong> {{ inquiry.content }}</p>
				<p><strong>날짜:</strong> {{ inquiry.date }}</p>
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
import AdminLayout from './AdminLayout.vue';

const route = useRoute();
const router = useRouter();

const inquiry = ref(null);
const replies = ref([]);
const newReply = ref('');

const inquiriesData = [
	{ id: 1, author: '사용자3', content: '문의 내용 1', date: '2024-10-11' },
	{ id: 2, author: '사용자4', content: '문의 내용 2', date: '2024-10-12' },
	// ... 추가 더미 데이터 ...
];

onMounted(() => {
	const inquiryId = Number(route.params.id);
	inquiry.value = inquiriesData.find(i => i.id === inquiryId);
});

function goBack() {
	if (route.query.prevTab) {
		router.push({ path: '/admin', query: { tab: route.query.prevTab } });
	} else {
		router.push('/admin');
	}
}

function addReply() {
	if (newReply.value.trim()) {
		replies.value.push({
			id: replies.value.length + 1,
			content: newReply.value,
			date: new Date().toLocaleString(),
		});
		newReply.value = '';
	}
}
</script>

<style scoped>
.inquiry-detail {
	padding: 20px;
}

.back-button {
	margin-bottom: 20px;
	padding: 10px;
	background-color: #4caf50;
	color: white;
	border: none;
	cursor: pointer;
}

.back-button:hover {
	background-color: #45a049;
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
