<template>
	<div v-if="currentMentoring" class="mento-container">
		<div class="mento-firstline">
			<div class="mento-fix">
				<a href="#">수정하기</a> / <a href="#">삭제하기</a>
			</div>
			<div class="mento-category">{{ currentMentoring.category }}</div>
			<div class="mento-active">
				<div
					v-if="
						userInfo &&
						currentMentoring.author &&
						userInfo.id === currentMentoring.author.id
					"
					class="active-status"
				>
					<span v-if="currentMentoring.active">활성화</span>
					<span v-else>비활성화</span>
					<label class="toggle-switch">
						<input type="checkbox" v-model="currentMentoring.active" />
						<span class="slider"></span>
					</label>
				</div>
			</div>
		</div>
		<div class="mento-title">
			{{ currentMentoring.title }}
		</div>
		<div class="mento-summary">{{ currentMentoring.summary }}</div>
		<div class="mento-price">
			1회 /
			{{
				currentMentoring.price === 0 ? '무료' : currentMentoring.price + '원'
			}}
		</div>
		<div class="hashtags">
			<div class="hashtag-container">
				<div
					v-for="(hashtag, index) in currentMentoring.hashtags"
					:key="index"
					class="hashtag"
				>
					<div>#{{ hashtag }}</div>
				</div>
			</div>
		</div>
		<div class="mento-thumbnail">
			<img :src="currentMentoring.thumbnailUrl" alt="" />
		</div>
		<div class="mento-content content">
			<p v-html="currentMentoring.content"></p>
		</div>
		<div v-if="userInfo" class="mento-buttons">
			<!-- userInfo와 currentMentoring.author가 존재하는지 확인 -->
			<button
				v-if="
					userInfo &&
					currentMentoring.author &&
					userInfo.id === currentMentoring.author.id
				"
				class="manage-button"
			>
				지원자 관리
			</button>
			<button
				v-else-if="
					userInfo &&
					currentMentoring.author &&
					userInfo.id !== currentMentoring.author.id &&
					currentMentoring.active
				"
				class="apply-button"
			>
				지원하기
			</button>
			<buttonv v-else-if="currentMentoring.active">지원취소</buttonv>
			<button class="chat-button">
				<span class="chat-icon">?</span> 채팅 문의
			</button>
		</div>
	</div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';

import { useQandMStore } from '@/stores/questionAndMentoringStore';

const authStore = useAuthStore();
const { userInfo } = storeToRefs(authStore);

const { id } = defineProps({
	id: {
		type: String,
		required: true,
	},
}); //라우팅과 함께 넘어온 id

const mentoringStore = useQandMStore();
const { currentMentoring } = storeToRefs(mentoringStore); //현재 상세페이지의 멘토링

onMounted(() => {
	mentoringStore.setMentoringDetail(id);
});
</script>

<style scoped>
.mento-container {
	width: 60vw;
	max-width: 100%; /* 화면을 벗어나지 않도록 제한 */
	height: auto; /* 필요에 따라 지정 */
	margin: 20px 20vw;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}

.mento-firstline {
	margin-top: 50px;
	width: 100%;
	display: grid;
	grid-template-columns: 1fr auto 1fr; /* 세 개의 컬럼: 왼쪽, 중앙, 오른쪽 */
	align-items: center; /* 세로 가운데 정렬 */
	padding: 10px 0px;
}

.mento-fix {
	justify-self: start;
}

.mento-category {
	justify-self: center; /* 가운데 정렬 */
	text-align: center; /* 텍스트 가운데 정렬 */
	border-radius: 30px;
	background-color: #e9e9e9;
	padding: 5px 20px;
	font-weight: 800;
	font-size: 25px;
}

.mento-active {
	justify-self: end; /* 오른쪽 끝에 정렬 */
}

.active-status {
	display: flex;
	align-items: center; /* 아이템들을 수직 가운데 정렬 */
	gap: 10px; /* 텍스트와 토글 버튼 사이의 간격 */
}

.toggle-switch {
	position: relative;
	display: inline-block;
	width: 50px;
	height: 26px;
}

.toggle-switch input {
	opacity: 0;
	width: 0;
	height: 0;
}

.slider {
	position: absolute;
	cursor: pointer;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #ccc;
	transition: 0.4s;
	border-radius: 34px;
}

.slider:before {
	position: absolute;
	content: '';
	height: 20px;
	width: 20px;
	left: 3px;
	bottom: 3px;
	background-color: white;
	transition: 0.4s;
	border-radius: 50%;
}

input:checked + .slider {
	background-color: #4caf50; /* 활성화된 상태의 색상 */
}

input:checked + .slider:before {
	transform: translateX(24px); /* 활성화된 상태에서 동그라미 이동 */
}

.mento-title {
	margin-top: 50px;
	font-size: 80px;
	font-weight: 800;
	text-align: center;
	word-break: break-word; /* 단어가 너무 길 경우 자동 줄바꿈 */
	overflow-wrap: break-word; /* 텍스트가 컨테이너를 넘어가지 않도록 자동 줄바꿈 */
	width: 100%;
}

.mento-summary {
	width: 60%;
	margin-top: 30px;
	font-size: 20px;
	color: #878787;
	text-align: center;
	word-break: break-word; /* 단어가 너무 길 경우 자동 줄바꿈 */
	overflow-wrap: break-word; /* 텍스트가 컨테이너를 넘어가지 않도록 자동 줄바꿈 */
	margin-bottom: 25px;
}

.mento-price {
	margin-top: 30px;
	font-weight: 600;
	padding: 10px 0;
	font-size: 18px;
	text-align: center;
	width: 100%;
	margin-bottom: 10px;
}

.hashtags {
	display: flex;
	justify-content: center;
	align-items: center; /* 세로 가운데 정렬 */
	width: 100%; /* 전체 너비 사용 */
	margin-top: 30px; /* 상단에 약간의 여백 추가 */
}

.hashtag-container {
	display: flex;
	flex-wrap: wrap; /* 해시태그들이 화면을 넘어가지 않도록 줄바꿈 설정 */
	gap: 10px; /* 해시태그들 사이의 간격 */
	margin: 0 auto; /* 부모 요소 내에서 중앙 정렬 */
	font-weight: 600;
}

.hashtag div {
	background-color: #d8d8d8;
	border-radius: 20px;
	padding: 2px 15px;
}

.mento-thumbnail {
	margin-top: 30px;
	width: 50vw;
	height: 23vw;
}

.mento-thumbnail img {
	width: 100%;
	height: 100%;
	object-fit: fill; /* 이미지가 컨테이너 크기에 맞게 들어가도록 설정 */
	border-radius: 10px;
}

.mento-content {
	margin-top: 70px;
	width: 50vw;
}

.mento-buttons {
	display: flex;
	gap: 20px; /* 버튼들 사이 간격 설정 */
	margin-top: 100px;
}

.apply-button {
	background-color: #3b946f;
	color: white;
	padding: 10px 20px;
	border: none;
	border-radius: 10px;
	font-size: 16px;
	font-weight: 600;
	cursor: pointer;
	transition: background-color 0.3s ease;
}

.apply-button:hover {
	background-color: #27634a; /* 호버 시 더 어두운 초록색 */
}

.chat-button {
	background-color: white;
	color: #3b946f;
	padding: 10px 20px;
	border: 2px solid #3b946f;
	border-radius: 10px;
	font-size: 16px;
	font-weight: 600;
	cursor: pointer;
	display: flex;
	align-items: center;
	gap: 10px; /* 아이콘과 텍스트 사이 간격 */
	transition:
		background-color 0.3s ease,
		color 0.3s ease;
}

.chat-button:hover {
	background-color: #f0f0f0; /* 호버 시 배경 색 변경 */
}

.chat-icon {
	font-size: 18px;
}

.manage-button {
	background-color: #3b946f;
	color: white;
	padding: 10px 20px;
	border: none;
	border-radius: 10px;
	font-size: 16px;
	font-weight: 600;
	cursor: pointer;
	transition: background-color 0.3s ease;
}
</style>
