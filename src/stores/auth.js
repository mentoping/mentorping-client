import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import Cookies from 'js-cookie';

export const useAuthStore = defineStore('auth', () => {
	const isLoggedIn = ref(false);
	const userInfo = ref(null);

	// JSON Server URL
	const apiUrl = 'http://localhost:8089';

	const login = async () => {
		try {
			const response = await axios.get(`${apiUrl}/login`);
			if (response.status === 200) {
				const data = response.data[0];
				isLoggedIn.value = true;
				userInfo.value = data.user;
				Cookies.set('accessToken', data.accessToken);
				Cookies.set('refreshToken', data.refreshToken);
			}
		} catch (error) {
			console.error('Login failed:', error);
		}
	};

	const logout = () => {
		isLoggedIn.value = false;
		userInfo.value = null;
		Cookies.remove('accessToken');
		Cookies.remove('refreshToken');
	};

	const initializeAuth = async () => {
		try {
			const token = Cookies.get('accessToken');
			if (token) {
				//실제로는 토큰이 유효한지 검사를 하겠지.지금은 토큰의 access유무로만 판별
				const response = await axios.get(`${apiUrl}/validate-token`, {
					headers: { Authorization: `Bearer ${token}` },
				});
				if (response.status === 200) {
					isLoggedIn.value = true;
					userInfo.value = response.data[0];
				}
			}
		} catch (error) {
			console.error('Token validation failed:', error);
		}
	};

	return {
		isLoggedIn,
		userInfo,
		login,
		logout,
		initializeAuth,
	};
});
