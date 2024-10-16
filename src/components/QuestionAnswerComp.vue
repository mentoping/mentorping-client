<template>
	<div class="answer-list" v-if="currentQuestion && currentQuestion.answers">
		<div
			v-for="(answer, index) in currentQuestion.answers"
			:key="index"
			:class="['answer-container', { 'selected-answer': answer.isSelected }]"
		>
			<div v-if="answer.isSelected" class="selected-banner">
				<p>채택되었습니다</p>
			</div>
			<div class="answer-header">
				<img
					:src="answer.author.profileUrl"
					alt="장원석석석석"
					class="profile-img"
				/>
				<div class="author-info">
					<p class="author-name">{{ answer.author.name }} 멘토</p>
					<p class="created-at">{{ answer.createdAt }} 작성</p>
				</div>
				<button class="report-button">🚨</button>
			</div>
			<div class="answer-content">
				<p>{{ answer.content }}</p>
			</div>
			<div class="answer-footer">
				<button class="adopt-button">채택하기</button>
				<div class="footer-right">
					<p class="footer-text">더 자세한 사항을 멘토와 상의해보세요</p>
					<button
						class="chat-button"
						@click="
							goToChatRoom(
								answer.author.id,
								answer.author.name,
								answer.author.profileUrl,
							)
						"
					>
						채팅하러 가기
					</button>
				</div>
			</div>
			<div v-if="answer.isSelected" class="selected-review-box">
				<p>
					<i class="fa-solid fa-turn-up fa-rotate-90"></i>
					&nbsp;&nbsp;&nbsp;{{ answer.selectedReview }}
				</p>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useQandMStore } from '@/stores/questionAndMentoringStore';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { db } from '@/firebaseConfig';
import { useAuthStore } from '@/stores/auth';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';

const router = useRouter();

const questionStore = useQandMStore();
const { currentQuestion } = storeToRefs(questionStore);

const authStore = useAuthStore();
const { userInfo } = storeToRefs(authStore);

async function goToChatRoom(mentorId, mentorName, mentorProfileurl) {
	try {
		const receiverId = mentorId;
		const receiverName = mentorName; //받는사람 이름 설정
		const receiverProfileUrl = mentorProfileurl;

		const senderId = userInfo.value.id;
		const senderName = userInfo.value.name; // 보내는사람(로그인유저)이름 설정
		const senderProfileUrl = userInfo.value.profile;

		console.log('senderProfileUrl:', senderProfileUrl); // 값 확인
		console.log('receiverProfileUrl:', receiverProfileUrl); // Firestore의 'rooms' 컬렉션에서 senderId와 receiverId 조합의 방을 검색

		const roomsCollection = collection(db, 'rooms');
		let q = query(
			roomsCollection,
			where('receiverId', '==', parseInt(receiverId)),
			where('senderId', '==', parseInt(senderId)),
		);
		let querySnapshot = await getDocs(q);
		// 방을 찾지 못했다면 반대 조합으로도 검색
		if (querySnapshot.empty) {
			q = query(
				roomsCollection,
				where('receiverId', '==', parseInt(senderId)),
				where('senderId', '==', parseInt(receiverId)),
			);
			querySnapshot = await getDocs(q);
		}
		// 쿼리 결과 디버깅
		console.log('Query results:', querySnapshot.docs);
		querySnapshot.forEach(doc => {
			console.log('Found room:', doc.data());
		});
		if (querySnapshot.empty) {
			// 채팅방이 존재하지 않으면 새 채팅방 생성
			console.log('senderProfileUrl:', senderProfileUrl);
			console.log('receiverProfileUrl:', receiverProfileUrl);

			const newRoom = await addDoc(roomsCollection, {
				senderId: parseInt(senderId), // 현재 사용자 ID를 senderId로 저장
				receiverId: parseInt(receiverId), // 답변 작성자의 ID를 receiverId로 저장
				// name: `${receiverName}와의 채팅방`, // 채팅방 이름 설정
				chatRoomNames: {
					[senderId]: `${receiverName}`, // 현재 사용자가 볼 이름
					[receiverId]: `${senderName}`, // 상대방이 볼 이름
				},
				lastMessage: '',
				lastMessageTimestamp: Date.now(),
				// senderProfile: authStore.profile,
				// receiverProfile: receiverProfileUrl,
				chatProfiles: {
					// chatProfiles 필드 추가
					[senderId]: receiverProfileUrl || 'https://via.placeholder.com/100', // 상대방의 프로필 이미지

					[receiverId]:
						userInfo.value.profile || 'https://via.placeholder.com/100', // 로그인한 사용자의 프로필 이미지
				},
				createdAt: Date.now(),
			});
			console.log('new rooommmmmmmmm ::  ', newRoom);
			// 새로 생성한 채팅방으로 이동
			router.push({
				path: '/mypage/chatting',
			});
		} else {
			router.push({
				path: '/mypage/chatting',
			});
		}
	} catch (error) {
		console.error('Error accessing or creating chat room:', error);
	}
}
</script>

<style scoped>
.answer-list {
	width: 100%;
}
.answer-container {
	border: 1px solid #d2c7c7;
	border-radius: 10px;
	padding: 20px;
	margin-bottom: 50px;
}
.selected-answer {
	border-color: #3b946f; /* 선택된 경우 border 색상 변경 */
	border-width: 3px;
}
.answer-header {
	display: flex;
	align-items: center;
	position: relative;
}
.profile-img {
	width: 50px;
	height: 50px;
	border-radius: 50%;
	object-fit: cover;
	margin-right: 15px;
}
.author-info {
	display: flex;
	flex-direction: column;
}
.author-name {
	font-weight: bold;
	color: #3b946f; /* 이름 색상 */
}
.created-at {
	color: #999;
	font-size: 14px;
}
.report-button {
	position: absolute;
	right: 0;
	top: 0;
	background: none;
	border: none;
	cursor: pointer;
	font-size: 20px;
}
.answer-content {
	margin: 40px 0;
	font-size: 16px;
}
.answer-footer {
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: #999;
	font-size: 14px;
}
.adopt-button {
	background-color: #3b946f;
	color: white;
	border: none;
	padding: 8px 16px;
	border-radius: 5px;
	cursor: pointer;
	font-weight: 800;
}
.footer-right {
	display: flex;
	align-items: center;
}
.footer-text {
	margin: 0;
	margin-right: 10px; /* 오른쪽 간격 추가 */
}
.chat-button {
	border-radius: 40px;
	background-color: #3b946f58;
	color: white;
	border: none;
	padding: 8px 16px;
	cursor: pointer;
	color: green;
	font-weight: 800;
}
.selected-review-box {
	margin-top: 20px;
	padding: 15px;
	border: 1px solid #3b946f;
	border-radius: 10px;
	background-color: #f0f0f0;
	color: #333;
}

.selected-banner {
	color: #16a1ef;
	font-weight: 800;
	font-size: 20px;
	margin-bottom: 15px;
}
</style>
