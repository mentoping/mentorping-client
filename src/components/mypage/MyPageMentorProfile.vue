<template>
	<div class="profile-container" v-if="mentorInfo">
		<div class="mypage-header">
			<i class="fa-solid fa-user-tie"></i>&nbsp;&nbsp;멘토 프로필
		</div>
		<div class="content-body">
			<div class="profile-section">
				<div class="profile-image-container">
					<img
						:src="mentorInfo.profile"
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
						{{ mentorInfo.nickname }}
						<i class="fa-solid fa-pen edit-icon"></i>
					</div>
				</div>
			</div>
			<div class="intro-section">
				<div class="intro-header">
					전문가 소개
					<i class="fa-solid fa-pen edit-icon"></i>
				</div>
				<div class="description">멘토 소개</div>
				<div class="intro-content">
					{{ mentorInfo.content }}
				</div>
			</div>
			<div class="intro-section">
				<div class="intro-header">
					활동분야
					<i class="fa-solid fa-pen edit-icon"></i>
				</div>
				<div class="description">멘토가 전문성을 가지고 있는 분야입니다.</div>
				<div class="intro-content">
					{{ mentorInfo.content }}
				</div>
			</div>
			<div class="intro-section">
				<div class="intro-header">
					연락처 및 SNS
					<i class="fa-solid fa-pen edit-icon"></i>
				</div>
				<div class="description">멘토의 연락처 및 SNS</div>
				<div class="intro-content">
					{{ mentorInfo.content }}
				</div>
			</div>
			<div class="section">
				<div class="tilte-header">개설 멘토링 목록</div>
				<div class="description">본인이 개설한 멘토링 목록을 확인해보세요</div>
				<div class="question-list">
					<MentoringCardComp></MentoringCardComp>
					<MentoringPagingComp></MentoringPagingComp>
				</div>
			</div>
			<div class="section">
				<div class="tilte-header">답변 목록</div>
				<div class="description">답변했던 내용을 확인해보세요</div>
				<div class="question-list">
					<QuestionBoxComp></QuestionBoxComp>
					<QuestionPagingComp></QuestionPagingComp>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import MentoringCardComp from '../MentoringCardComp.vue';
import MentoringPagingComp from '../MentoringPagingComp.vue';
import QuestionBoxComp from '../QuestionBoxComp.vue';
import QuestionPagingComp from '../QuestionPagingComp.vue';
import { onMounted } from 'vue';
import { mentorProfileMentoring } from '@/api/mentoring';
import { mentorProfileQuestions } from '@/api/question';
import { useQandMStore } from '@/stores/questionAndMentoringStore';

const qnmstore = useQandMStore();
const qnmstore2 = useQandMStore();

const authStore = useAuthStore();
const { mentorInfo } = storeToRefs(authStore);

onMounted(async () => {
	try {
		const mentoringsData = await mentorProfileMentoring();
		const questionsData = await mentorProfileQuestions();
		qnmstore.setMentoringList(mentoringsData);
		qnmstore2.setQuestionList(questionsData);
	} catch (error) {
		console.error('Failed to fetch mentorings:', error);
	}
});

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
	margin: 0 auto; /* 가로 가운데 정렬 */
	display: flex;
	flex-direction: column;
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
	background-color: #f5f7f6; /* 배경 색상 */
	border-radius: 10px; /* 둥근 모서리 */
	display: flex;
	flex-direction: column;
	align-items: center; /* 자식 요소들을 가로로 가운데 정렬 */
	padding-top: 60px;
}

.content-body::-webkit-scrollbar {
	display: none; /* 스크롤바 숨기기 */
}

.profile-section {
	display: flex;
	align-items: center;
	margin-bottom: 100px;
	width: 1000px;
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
	margin-bottom: 50px;
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
	width: 1000px;
}

.tilte-header {
	font-size: 45px;
	font-weight: 600;
	display: flex;
	align-items: center;
	margin-top: 150px;
}

.question-list {
	margin-top: 30px;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-items: center;
}

.section {
	width: 1000px;
}
</style>
