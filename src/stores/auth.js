// stores/user.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useUserStore = defineStore('user', () => {
	const isLoggedIn = ref(false);
	const userInfo = ref(null);

	// 로그인 상태 설정 함수
	function setLoginStatus(status) {
		isLoggedIn.value = status;
	}

	// 유저 정보 설정 함수
	function setUserInfo(info) {
		userInfo.value = info;
	}

	// JSON Server에서 유저 정보 가져오기
	async function fetchUserInfo() {
		try {
			const response = await axios.get('http://localhost:8089/members');
			if (response.data) {
				setUserInfo(response.data);
				setLoginStatus(true);
				console.log('로그인 정보: ', userInfo);
			}
		} catch (error) {
			console.error('Failed to fetch user info:', error);
		}
	}

	return {
		isLoggedIn,
		userInfo,
		setLoginStatus,
		setUserInfo,
		fetchUserInfo,
	};
});
