<template>
	<div v-if="userInfo" class="myPage-container">
		<img :src="userInfo.profile" alt="profile image" />
		<!--<div>{{ userInfo.nickname }}</div>-->
		<div>마이페이지</div>
	</div>
	<div v-else>
		<p>사용자 정보가 없습니다.</p>
	</div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const { userInfo } = storeToRefs(authStore);
</script>

<style scoped>
.myPage-container {
	display: flex; /* 가로 배치 */
	align-items: center; /* 수직 가운데 정렬 */
	border: 3px solid rgb(6, 89, 28);
	padding: 0.5vw; /* 약간의 내부 여백 추가 */
	gap: 10px; /* 이미지와 닉네임 사이의 간격 */
	border-radius: 20px;
	font-weight: 600;
}

img {
	width: 2vw; /* 뷰포트 너비의 10%로 이미지 크기 설정 */
	max-width: 80px; /* 최대 너비 제한 */
	height: 2vw; /* 높이도 너비와 동일하게 설정하여 원형 유지 */
	max-height: 80px; /* 최대 높이도 너비와 동일하게 제한 */
	border-radius: 50%; /* 둥근 프로필 이미지 */
	object-fit: cover; /* 이미지가 요소에 맞게 크기 조정 */
}

/* 미디어 쿼리로 작은 화면에 맞는 이미지 크기 설정 */
@media (max-width: 768px) {
	img {
		width: 15vw; /* 뷰포트 너비의 15%로 크기 조정 */
		max-width: 60px; /* 최대 너비를 줄임 */
		height: 15vw; /* 높이도 너비와 동일하게 설정 */
		max-height: 60px; /* 최대 높이도 동일하게 제한 */
	}
}

@media (max-width: 480px) {
	img {
		width: 20vw; /* 뷰포트 너비의 20%로 크기 조정 */
		max-width: 50px; /* 최대 너비를 더 줄임 */
		height: 20vw; /* 높이도 너비와 동일하게 설정 */
		max-height: 50px; /* 최대 높이도 동일하게 제한 */
	}
}
</style>
