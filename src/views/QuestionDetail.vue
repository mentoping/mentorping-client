<template>
	<QuestionDetailComp class="shared-width question-detail"></QuestionDetailComp>
	<div class="answer-explain">답변 작성</div>
	<TextEditorComp
		class="shared-width text-editor"
		:placeholder="'답변을 작성해보세요.'"
		:height="150"
	></TextEditorComp>
	<div ref="advertiseBox" class="advertise-box">
		<img
			src="C:/myproject/kosa/mentain/mentorping-client/src/assets/advertise.png"
			alt="광고 이미지"
			class="advertise-image"
		/>
	</div>
	<button class="answer-button">답변하기</button>
	<div class="answer-count">
		<span>{{ currentQuestion.answerCount }}</span> 개의 답변이 달렸어요!
	</div>
	<QuestionAnswerComp class="shared-width answer-box"></QuestionAnswerComp>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useQandMStore } from '@/stores/questionAndMentoringStore';

import QuestionDetailComp from '@/components/QuestionDetailComp.vue';
import TextEditorComp from '@/components/TextEditorComp.vue';
import QuestionAnswerComp from '@/components/QuestionAnswerComp.vue';

const { id } = defineProps({
	id: {
		type: String,
		required: true,
	},
});

// Pinia 스토어 사용
const questionStore = useQandMStore();

const { currentQuestion } = storeToRefs(questionStore);

const advertiseBox = ref(null);

/*
		return {
			userStore,
			userName,
			userId, // 현재 사용자 ID 반환
		};
	},

	data() {
		return {
			newAnswerContent: '', // 새로운 답변의 내용
			newAnswerUserId: '', // 새로운 답변의 사용자 ID
			answers: [
				{ userId: '1', content: '재혁이 일시오다.' },
				{ userId: '5', content: '원석이 일시오다.' },
			],
		};
	},
	methods: {
		// getUserNameById(userId) {
		//   const userStore = useUserStore();
		//   const user = userStore.users.find(user => user.id === userId); // 스토어의 users 배열에서 userId를 검색

		//   if (user) {
		//     return user.name; // 사용자 이름 반환
		//   } else {
		//     console.log("user 정보ㅗㅗㅗ ::: " , user);

		//     console.error('User not found in store!');
		//     return 'Unknown User';
		//   }
		// },

		// userId 로 UserName 가져오기
		getUserNameById(userId) {
			const userStore = useUserStore();

			// receiverId 값 확인
			console.log('getUserNameById - Searching for userId:', userId);

			// userStore.users 배열 내용 확인
			console.log('getUserNameById - Current users in store:', userStore.users);

			// 배열에서 userId에 해당하는 사용자 검색
			const user = userStore.users.find(user => {
				console.log(`Checking user with id: ${user.id} and name: ${user.name}`);
				return user.id === parseInt(userId); // Make sure the comparison is done correctly
			});

			if (user) {
				console.log('getUserNameById - Found user:', user);
				return user.name; // 사용자 이름 반환
			} else {
				console.error('User not found in store!');
				return 'Unknown User';
			}
		},

		// 채팅 상대방의 Id를 이용하여 채팅방 검색 후 있으면 채팅방이동 , 없으면 채팅방 생성
		async goToChatRoom(receiverId) {
			try {
				// Pinia 스토어에서 receiverId에 해당하는 사용자 이름을 가져옴
				const receiverName = this.getUserNameById(receiverId);
				const senderName = this.userName; // 현재 로그인한 사용자의 이름 가져오기

				// Firestore의 'rooms' 컬렉션에서 senderId와 receiverId 조합의 방을 검색
				const roomsCollection = collection(db, 'rooms');
				let q = query(
					roomsCollection,
					where('receiverId', '==', parseInt(receiverId)),
					where('senderId', '==', parseInt(this.userId)),
				);

				let querySnapshot = await getDocs(q);

				// 방을 찾지 못했다면 반대 조합으로도 검색
				if (querySnapshot.empty) {
					q = query(
						roomsCollection,
						where('receiverId', '==', parseInt(this.userId)),
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
					const newRoom = await addDoc(roomsCollection, {
						senderId: parseInt(this.userId), // 현재 사용자 ID를 senderId로 저장
						receiverId: parseInt(receiverId), // 답변 작성자의 ID를 receiverId로 저장
						// name: `${receiverName}와의 채팅방`, // 채팅방 이름 설정
						chatRoomNames: {
							[this.userId]: `${receiverName}`, // 현재 사용자가 볼 이름
							[receiverId]: `${senderName}`, // 상대방이 볼 이름
						},
						lastMessage: '',
						lastMessageTimestamp: Date.now(),
						createdAt: Date.now(),
					});

					console.log('new rooommmmmmmmm ::  ', newRoom);
					// 새로 생성한 채팅방으로 이동
					this.$router.push({
						name: 'ChatRoom',
						params: { roomId: newRoom.id },
					});
				} else {
					// 채팅방이 존재하면 해당 채팅방으로 이동
					const existingRoom = querySnapshot.docs[0];
					this.$router.push({
						name: 'ChatRoom',
						params: { roomId: existingRoom.id },
					});
				}
			} catch (error) {
				console.error('Error accessing or creating chat room:', error);
			}
		},
	},

const handleScroll = () => {
	if (advertiseBox.value) {
		const offset = Math.max(265, window.scrollY + 200);
		advertiseBox.value.style.top = `${offset}px`;
	}

*/
};

onMounted(() => {
	questionStore.setQuestionDetail(id); //현재 질문 정보 가져오기
	window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
	window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.shared-width {
	margin-top: 10px;
	width: 65vw;
	margin-left: 10vw;
	margin-right: 20vw;
}

.answer-button {
	margin-top: 0px;
	margin-bottom: 50px;
	margin-left: 69vw;
	width: 6vw;
	border-radius: 10px;
	font-weight: 800;
	color: white;
	background-color: green;
	padding: 8px;
	font-size: 15px;
	border: none;
	cursor: pointer; /* 커서 스타일 추가 */
	transition: background-color 0.3s ease; /* hover 시 배경색 변화 애니메이션 추가 */
}

.answer-button:hover {
	background-color: darkgreen; /* hover 시 배경색 변경 */
}

.question-detail {
	height: auto;
	margin-bottom: 20px;
	margin-top: 100px;
}

.answer-count {
	border-radius: 10px;
	margin-left: 10vw;
	background-color: #f3f3f3;
	width: 65vw;
	padding: 10px 0 10px 30px;
	font-weight: 800;
	font-size: 25px;
}

.answer-explain {
	margin-top: 30px;
	margin-left: 10vw;
	width: 65vw;
	font-weight: 800;
	font-size: 22px;
	color: #3b946f;
}

.answer-count span {
	color: #3b946f;
}

.advertise-box {
	width: 300px;
	height: 420px;
	position: absolute; /* fixed에서 absolute로 변경 */
	top: 265px;
	left: 77vw;
	border-radius: 20px;
	transition: top 0.5s ease-in-out; /* 자연스러운 움직임을 위해 추가 */
}

.advertise-image {
	width: 100%;
	height: 100%;
	object-fit: cover;
	border-radius: 20px;
}

.answer-box {
	margin-top: 40px;
}
</style>
