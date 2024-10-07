//src/stores/auth.js
// Auth.js - 인증 및 토큰 관련 로직을 처리하는 모듈
import axios from 'axios';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

// 쿠키에서 특정 이름의 값을 가져오는 함수
const getCookie = name => {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
};

// 로그아웃 함수
const useAuth = () => {
	const userStore = useUserStore();
	const router = useRouter();

	const logout = () => {
		document.cookie =
			'accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;';
		document.cookie =
			'refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;';
		userStore.resetUser();
		router.push('/login');
	};

	const login = async provider => {
		try {
			// 로그인 요청 (예: 카카오 로그인)
			const response = await axios.post('http://localhost:8089/login', {
				provider,
			});
			if (response.status === 200) {
				document.cookie = `accessToken=${response.data.accessToken}; Path=/;`;
				document.cookie = `refreshToken=${response.data.refreshToken}; Path=/;`;
				userStore.setUser(response.data.user);
				userStore.isLoggedIn = true;
			}
		} catch (error) {
			console.error('로그인 에러:', error);
		}
	};

	return {
		getCookie,
		logout,
		login,
	};
};

export default useAuth;

// Axios Interceptor 설정
const api = axios.create({
	baseURL: 'http://localhost:8089',
});

const { logout } = useAuth();

api.interceptors.request.use(
	async config => {
		const accessToken = getCookie('accessToken');
		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;

			// 토큰 만료 검사 로직 추가 (임시로 항상 유효하다고 가정)
			const isExpired = false; // 실제로는 만료 여부를 확인하는 로직 필요
			if (isExpired) {
				try {
					const refreshToken = getCookie('refreshToken');
					const response = await axios.post(
						'http://localhost:8089/refreshToken',
						{
							refreshToken,
						},
					);

					if (response.status === 200) {
						document.cookie = `accessToken=${response.data.accessToken}; Path=/;`;
						config.headers.Authorization = `Bearer ${response.data.accessToken}`;
					} else {
						logout();
					}
				} catch (error) {
					console.error('토큰 갱신 에러:', error);
					logout();
				}
			}
		}
		return config;
	},
	error => {
		return Promise.reject(error);
	},
);

export { api };
