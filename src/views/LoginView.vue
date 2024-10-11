<template>
	<div>
		<button @click="handleLogin">loginButton</button>
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

<style lang="scss" scoped></style>
