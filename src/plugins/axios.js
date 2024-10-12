import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'http://localhost:8089/', // Spring 서버의 baseURL
	headers: {
		'Content-Type': 'application/json',
	},
});

export default axiosInstance;
