<template>
	<div class="profile-container" v-if="userInfo">
		<div class="mypage-header">
			<i class="fa-solid fa-user"></i>&nbsp;&nbsp;멘티 프로필
		</div>
		<div class="content-body">
			<div class="profile-section">
				<div class="profile-image-container">
					<img
						:src="userInfo.profile"
						alt="프로필 이미지"
						class="profile-image"
					/>
					<label for="profile-upload" class="edit-image-icon">
						<i class="fa-solid fa-pen"></i>
					</label>
					<input
						type="file"
						id="profile-upload"
						class="profile-upload"
						@change="handleImageChange"
					/>
				</div>
				<div class="profile-info">
					<div class="profile-name">
						{{ userInfo.nickname }}
						<i class="fa-solid fa-pen edit-icon"></i>
					</div>
				</div>
			</div>
			<div class="intro-section">
				<div class="intro-header">
					자기소개
					<i class="fa-solid fa-pen edit-icon"></i>
				</div>
				<div class="description">자신에 대해 간략하게 소개해 보세요</div>
				<div class="intro-content">
					{{ userInfo.content }}
				</div>
			</div>
			<div class="section">
				<div class="tilte-header">참여 멘토링</div>
				<div class="description">참여했던 멘토링 목록을 확인해보세요</div>
				<div></div>
			</div>
			<div class="section">
				<div class="tilte-header">질문 목록</div>
				<div class="description">질문했던 내용을 확인해보세요</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';

import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const { userInfo } = storeToRefs(authStore);

// 이미지 변경 핸들러
const handleImageChange = event => {
	const file = event.target.files[0];
	if (file) {
		const reader = new FileReader();
		reader.onload = () => {
			authStore.setProfile(reader.result);
		};
		reader.readAsDataURL(file);
	}
};
</script>

<style scoped>
.profile-container {
	width: 85%;
	display: flex;
	flex-direction: column; /* 자식 요소들을 세로 방향으로 배치 */
}

.mypage-header {
	font-size: 20px;
	font-weight: 600;
	border-bottom: 1px solid #d3d1d1;
	padding: 15px;
}

.content-body {
	flex: 1;
	overflow: auto;
	padding: 250px;
	background-color: #f5f7f6; /* 배경 색상 */
	border-radius: 10px; /* 둥근 모서리 */
}

.content-body::-webkit-scrollbar {
	display: none; /* 스크롤바 숨기기 */
}

.profile-section {
	display: flex;
	align-items: center;
	margin-bottom: 100px;
}

.profile-image-container {
	position: relative;
	width: 100px;
	height: 100px;
}

.profile-image {
	width: 100%;
	height: 100%;
	border-radius: 50%; /* 원형 이미지 */
	object-fit: fill; /* 이미지가 잘리지 않도록 설정 */
}

.edit-image-icon {
	position: absolute;
	bottom: 0;
	right: 0;
	background-color: #ffffff;
	border-radius: 50%;
	padding: 5px;
	cursor: pointer;
}

.profile-upload {
	display: none; /* 파일 선택 필드는 화면에 표시되지 않음 */
}

.profile-info {
	margin-left: 15px;
}

.profile-name {
	font-weight: 600;
	font-size: 22px;
	display: flex;
	align-items: center;
	margin-left: 30px;
}

.edit-icon {
	font-size: 14px;
	margin-left: 10px;
	cursor: pointer;
	color: #000000;
}

.intro-section {
	margin-top: 20px;
}

.intro-header {
	font-size: 45px;
	font-weight: 600;
	display: flex;
	align-items: center;
}

.description {
	color: #969696;
	margin-top: 5px;
	font-size: 16px;
}

.intro-content {
	background-color: #ffffff;
	padding: 20px;
	margin-top: 10px;
	border-radius: 10px;
	font-size: 18px;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.tilte-header {
	font-size: 45px;
	font-weight: 600;
	display: flex;
	align-items: center;
	margin-top: 150px;
}
</style>
