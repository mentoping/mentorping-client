<template>
	<div class="user-detail">
		<button @click="goBack" class="back-button">뒤로 가기</button>
		<h2>유저 상세 정보</h2>
		<div v-if="user" class="user-info">
			<div class="form-group">
				<label>이름</label>
				<div class="input-field">{{ user.name }}</div>
			</div>
			<div class="form-group">
				<label>역할</label>
				<div class="input-field">{{ user.role }}</div>
			</div>
			<div class="form-group">
				<label>전문 분야</label>
				<div class="input-field">{{ user.specialty }}</div>
			</div>
			<div class="form-group">
				<label>신청일</label>
				<div class="input-field">{{ user.applicationDate }}</div>
			</div>
			<div class="form-group">
				<label>제출 파일</label>
				<div class="input-field">
					<a :href="user.file" target="_blank">다운로드</a>
				</div>
			</div>
			<button @click="changeRoleToMentor" class="change-role-button">
				멘토로 역할 변경
			</button>
		</div>
		<div v-else>
			<p>유저 데이터를 불러오는 중입니다...</p>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const user = ref(null);

// 임시 더미 데이터
const usersData = [
	{
		id: 1,
		name: '멘티1',
		role: '멘티',
		applicationDate: '2024-10-11',
		specialty: 'IT',
		file: '자격증.pdf',
	},
	{
		id: 2,
		name: '멘티2',
		role: '멘티',
		applicationDate: '2024-10-12',
		specialty: '디자인',
		file: '경력증명서.pdf',
	},
	// ... 추가 더미 데이터 ...
];

onMounted(() => {
	const userId = Number(route.params.id);
	user.value = usersData.find(u => u.id === userId);
});

function goBack() {
	if (route.query.prevTab) {
		router.push({ path: '/admin', query: { tab: route.query.prevTab } });
	} else {
		router.push('/admin');
	}
}

function changeRoleToMentor() {
	if (user.value) {
		user.value.role = '멘토';
		alert(`${user.value.name}님의 역할이 멘토로 변경되었습니다.`);
	}
}
</script>

<style scoped>
.user-detail {
	max-width: 600px;
	margin: 0 auto;
	padding: 20px;
	background-color: #f9f9f9;
	border-radius: 8px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.back-button {
	margin-bottom: 20px;
	padding: 10px;
	background-color: #4caf50;
	color: white;
	border: none;
	cursor: pointer;
}

.form-group {
	margin-bottom: 20px;
}

label {
	display: block;
	font-weight: bold;
	margin-bottom: 5px;
}

.input-field {
	padding: 10px;
	background-color: #fff;
	border: 1px solid #ddd;
	border-radius: 4px;
}

.change-role-button {
	display: block;
	width: 100%;
	padding: 15px;
	background-color: #4caf50;
	color: white;
	border: none;
	cursor: pointer;
	font-size: 1.1em;
	font-weight: bold;
	text-align: center;
}

.change-role-button:hover {
	background-color: #45a049;
}
</style>
