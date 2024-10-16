import { ref } from 'vue';
import { defineStore } from 'pinia';

import axios from 'axios';

export const useAuthStore = defineStore('auth', () => {
	const isLoggedIn = ref(false);
	const userInfo = ref(null); //일반 유저 정보
	const mentorInfo = ref(null); //내 멘토 정보

	const login = () => {
		// 카카오 로그인 페이지로 리다이렉트
		window.location.href = 'http://localhost:8089/oauth2/authorization/kakao';
	};

	const logout = () => {
		isLoggedIn.value = false;
		userInfo.value = null;
		// Cookies.remove('Authorization');나중에 api호출로 쿠키 지워야함
	};

	const initializeAuth = async () => {
		try {
			const response = await axios.get('/api/members/info', {
				withCredentials: true,
			});
			if (response.status === 200) {
				userInfo.value = response.data;
				isLoggedIn.value = true;

				// ROLE_MENTOR인 경우 mentorInfo도 설정
				if (userInfo.value.role === 'ROLE_MENTOR') {
					mentorInfo.value = userInfo.value;
				} else {
					mentorInfo.value = null;
				}

				console.log('User logged in:', userInfo.value.name);
			}
		} catch (error) {
			console.error('Failed to fetch user info:', error);
			isLoggedIn.value = false;
			userInfo.value = null;
			mentorInfo.value = null;
		}
	};

	function setProfile(newProfile) {
		userInfo.value.profile = newProfile;
	}

	return {
		isLoggedIn,
		userInfo,
		mentorInfo,
		login,
		logout,
		initializeAuth,
		setProfile,
	};
});
