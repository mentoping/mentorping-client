<template>
	<div class="login-container">
		<div class="title">Login</div>
		<div class="explain">일반 회원 로그인</div>
		<div @click="handleLogin" class="login-button">
			<img src="@/assets/kakao.png" alt="" />
			<span>카카오 계정으로 로그인</span>
		</div>
		<div class="end-line">
			<div class="ask-content">
				admin 이십니까?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			</div>
			<RouterLink class="admin-go" to="/admin-login"
				>admin으로 로그인하러가기</RouterLink
			>
		</div>
	</div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

/*		const login = async () => {
			try {
				const response = await axios.post('http://localhost:8089/login', {
					email: email.value,
					password: password.value,
				});
				userStore.setUser(response.data); // 로그인 성공 시 사용자 정보를 Pinia 스토어에 저장
				errorMessage.value = '';
				console.log('Login successful:', response.data);
*/

const authStore = useAuthStore();
const router = useRouter();

// 로그인 버튼 클릭 시 실행되는 함수
const handleLogin = async () => {
	try {
		await authStore.login(); // login 함수 호출 (비동기 처리)
		router.push('/'); // 로그인 후 홈으로 이동
	} catch (error) {
		console.error('Login failed:', error);
	}
};
</script>

<style scoped>
.login-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 150px;
}

.explain {
	margin-top: 15px;
	color: #808080;
	font-size: 25px;
}

.title {
	font-weight: 800;
	font-size: 4vw;
	color: #369261;
}

.login-button {
	margin-top: 80px;
	border: 1px solid #c4c4c4;
	border-radius: 10px;
	padding: 15px 70px;
	font-weight: 800;
	font-size: 25px;
	display: flex; /* 플렉스 컨테이너로 설정 */
	align-items: center; /* 아이템들을 세로 중앙에 정렬 */
	gap: 10px; /* 이미지와 텍스트 사이의 간격 설정 */
	cursor: pointer;
}

.login-button img {
	width: 40px;
	height: 40px;
}

.end-line {
	margin-top: 100px;
	display: flex;
	justify-content: center;
	width: 600px;
	font-size: 20px;
}

.ask-content {
	color: #969696;
}

.admin-go {
	font-weight: 800;
	font-size: 20px;
	color: #369261;
}
</style>
