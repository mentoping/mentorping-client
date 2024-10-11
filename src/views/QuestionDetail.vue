<template>
	<div class="question-detail">
		<!-- 질문 섹션 -->
		<div class="question-section">
			<h2>KOSA MSA 5차 과정에 대해 질문이 있습니다.</h2>
			<p>안녕하세요. Kosa 교육을 듣고 있는 수강생입니다...</p>
			<!-- 태그 표시 -->
			<div class="tags">
				<span class="tag">#해시태그1</span>
				<span class="tag">#해시태그2</span>
				<span class="tag">#해시태그3</span>
			</div>
		</div>

		<!-- 답변 입력 섹션 -->
		<div class="answer-section">
			<input v-model="newAnswerUserId" placeholder="User ID를 입력하세요" />
			<textarea
				v-model="newAnswerContent"
				placeholder="당신의 답변을 입력해 주세요"
			></textarea>
			<button class="submit-button" @click="goToChatRoom(userId)">
				답변하기
			</button>
		</div>

		<!-- 답변 목록 -->
		<div class="answer-list">
			<h3>{{ answers.length }}개의 답변이 달렸어요!</h3>

			<!-- 개별 답변 -->
			<div class="answer-item" v-for="(answer, index) in answers" :key="index">
				<p>
					{{ answer.content }} <small>(작성자: {{ answer.userId }})</small>
				</p>
				<button @click="goToChatRoom(answer.userId)">채팅하러 가기</button>
			</div>
		</div>
	</div>
</template>

<script>
import { db } from '../firebaseConfig';
import { useUserStore } from '../stores/userStore';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { computed } from 'vue';

export default {
	name: 'QuestionDetail',

	setup() {
		const userStore = useUserStore();

		userStore.fetchUsers();

		// 현재 로그인한 사용자의 정보를 가져옴
		const userName = computed(() => {
			return userStore.user ? userStore.user.name : 'Guest';
		});
		const userId = computed(() => {
			return userStore.user ? userStore.user.id : null;
		});

		console.log('Current users in store:', userStore.users);
		console.log('Current user in store:', userStore.user);

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
};
</script>

<style scoped>
/* 스타일 설정 */
.question-detail {
	padding: 20px;
}

.question-section {
	padding: 20px;
	border: 1px solid #ccc;
	margin-bottom: 20px;
}

.tags .tag {
	background: #eee;
	padding: 5px;
	margin-right: 5px;
}

.answer-section {
	margin-bottom: 20px;
}

.answer-section input {
	width: 100%;
	margin-bottom: 10px;
	padding: 5px;
}

.answer-section textarea {
	width: 100%;
	height: 100px;
}

.submit-button {
	margin-top: 10px;
}

.answer-list {
	padding: 20px;
	border: 1px solid #ccc;
}

.answer-item {
	margin-bottom: 10px;
}
</style>
