<template>
	<div class="chat-container">
		<h3>
			{{
				room.chatRoomNames && room.chatRoomNames[userId]
					? room.chatRoomNames[userId]
					: room.name
			}}
		</h3>
		<div class="chat-messages" ref="chatMessages">
			<!-- 메시지 목록 -->
			<div
				v-for="(msg, index) in messages"
				:key="index"
				class="message-wrapper"
				:class="{
					'my-message-wrapper': msg.senderId === userId,
					'other-message-wrapper': msg.senderId !== userId,
				}"
			>
				<!-- 읽음 여부에 따라 숫자 1 표시 -->
				<span
					v-if="msg.senderId === userId && !msg.isRead"
					class="read-indicator"
					>1</span
				>
				<!-- 메시지 내용 -->
				<div
					:class="{
						'my-message': msg.senderId === userId,
						'other-message': msg.senderId !== userId,
					}"
				>
					<!-- 프로필과 사용자 이름, 전송 시간 표시 -->
					<div class="message-header">
						<img
							src="https://via.placeholder.com/40"
							alt="Profile Picture"
							class="profile-pic"
						/>
						<span class="username">{{ msg.senderName }}</span>
						<span class="timestamp">{{ formatTimestamp(msg.timestamp) }}</span>
					</div>
					<!-- 메시지 내용 -->
					<div class="message-content">
						<!-- 파일 URL이 있을 경우 파일 링크를 보여줌 -->
						<template v-if="msg.fileURL && isImageFile(msg.fileURL)">
							<img
								:src="msg.fileURL"
								:key="msg.fileURL"
								alt="Uploaded Image"
								class="uploaded-image"
							/>
						</template>
						<!-- 이미지가 아닌 파일은 다운로드 링크로 표시 -->
						<template v-else-if="msg.fileURL">
							<a :href="msg.fileURL" target="_blank">📎 파일 다운로드</a>
						</template>
						<!-- 파일이 없을 경우 일반 텍스트 메시지 보여줌 -->
						<template v-else>
							{{ msg.content }}
						</template>
					</div>
				</div>
			</div>
		</div>
		<!-- 채팅 입력 영역 -->
		<div class="chat-input-container">
			<input
				v-model="messageContent"
				placeholder="메시지 입력..."
				@keyup.enter="sendMessage"
				class="chat-input"
			/>
			<!-- 파일 전송 버튼 -->
			<button @click="triggerFileInput" class="file-upload-button">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					width="24"
					height="24"
					fill="white"
				>
					<path
						d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"
					/>
				</svg>
			</button>
			<!-- 파일 선택 입력 (숨김 처리) -->
			<input
				type="file"
				@change="onFileChange"
				ref="fileInput"
				class="hidden-file-input"
			/>
			<!-- 전송 버튼 -->
			<button @click="sendMessage" class="send-button" :disabled="isSending">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					width="24"
					height="24"
					fill="white"
				>
					<path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
				</svg>
			</button>
		</div>
		<!-- 이미지 미리보기 영역 -->
		<div v-if="previewImage" class="image-preview">
			<h4>Image Preview:</h4>
			<img :src="previewImage" alt="Preview Image" class="uploaded-image" />
		</div>
	</div>
</template>

<script>
import { ref, watch, nextTick } from 'vue';
import { useUserStore } from '../stores/userStore'; // Pinia의 userStore 가져오기
import { db } from '../firebaseConfig';
import {
	collection,
	addDoc,
	query,
	onSnapshot,
	orderBy,
	doc,
	updateDoc,
	where,
	getDocs,
} from 'firebase/firestore';
import {
	getStorage,
	ref as storageRef,
	uploadBytes,
	getDownloadURL,
} from 'firebase/storage';

export default {
	name: 'ChatWindow',
	props: ['room', 'roomId', 'roomName'],
	setup(props) {
		const messages = ref([]);
		const messageContent = ref('');
		const isSending = ref(false); // 전송 상태 관리 변수
		const chatMessages = ref(null); // 스크롤을 제어하기 위한 ref
		const selectedFile = ref(null); // 업로드할 파일을 저장할 변수
		const previewImage = ref(null); // 이미지 미리보기용 변수
		const isReceiverInRoom = ref(false); // 상대방이 채팅방에 있는지 추적하는 상태 변수

		// 현재 선택된 방 ID를 추적하는 상태 변수
		const selectedRoomId = ref(null);

		// Firebase Storage 초기화
		const storage = getStorage();

		// Pinia의 userStore에서 사용자 정보 가져오기
		const userStore = useUserStore();

		// 사용자 정보 감시
		const userId = ref(null);
		const userName = ref(null);

		watch(
			() => userStore.user,
			newUser => {
				if (newUser) {
					userId.value = newUser.id;
					userName.value = newUser.name;
				}
			},
			{ immediate: true }, // 컴포넌트가 마운트될 때 즉시 실행
		);

		// 파일 선택 이벤트 핸들러
		const onFileChange = event => {
			if (event.target.files.length > 0) {
				selectedFile.value = event.target.files[0];
				const reader = new FileReader();

				reader.onload = () => {
					previewImage.value = reader.result; // 파일을 미리보기용 데이터 URL로 변환
				};

				reader.readAsDataURL(selectedFile.value);
			}
		};

		// 파일 선택창 열기 함수
		const triggerFileInput = () => {
			document.querySelector('.hidden-file-input').click();
		};

		// 파일을 Firebase Storage에 업로드하는 함수
		const uploadFile = async () => {
			if (!selectedFile.value) return null;

			const fileRef = storageRef(storage, `uploads/${selectedFile.value.name}`);
			try {
				const snapshot = await uploadBytes(fileRef, selectedFile.value);
				const downloadURL = await getDownloadURL(snapshot.ref);
				selectedFile.value = null; // 파일 업로드 후 선택 파일 초기화
				return downloadURL;
			} catch (error) {
				console.error('Error uploading file:', error);
				return null;
			}
		};

		// 이미지 파일 여부 확인 함수
		const isImageFile = url => {
			return /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(url);
		};

		// 스크롤을 맨 아래로 이동시키는 함수
		const scrollToBottom = () => {
			nextTick(() => {
				if (chatMessages.value) {
					chatMessages.value.scrollTop = chatMessages.value.scrollHeight;
				}
			});
		};

		// 메시지 가져오기 함수
		const fetchMessages = async roomId => {
			// Firestore의 'rooms' 컬렉션에서 특정 채팅방의 메시지 가져오기
			const messagesCollection = collection(db, 'rooms', roomId, 'messages');
			const q = query(messagesCollection, orderBy('timestamp'));

			// onSnapshot을 사용하여 Firestore의 실시간 업데이트 구독
			onSnapshot(q, async querySnapshot => {
				// 다른 방에서 온 메시지가 fetch되지 않도록 확인
				if (selectedRoomId.value !== roomId) return;

				messages.value = [];

				querySnapshot.forEach(doc => {
					const messageData = { id: doc.id, ...doc.data() };
					messages.value.push(messageData);
				});

				// 메시지가 변경될 때마다 스크롤을 맨 아래로 이동
				scrollToBottom();

				// 현재 사용자가 들어온 방에 있는 메시지의 읽음 상태를 업데이트
				await markMessagesAsRead(roomId);
			});
		};

		// 채팅방 변경시
		watch(
			() => props.room,
			async (newRoom, oldRoom) => {
				// 새로운 방이 선택되었을 때만 실행
				if (!newRoom || !newRoom.id) return;

				// 이전 방과 새로운 방이 같은 경우 변경을 막고 함수 종료
				if (oldRoom && oldRoom.id === newRoom.id) {
					return; // 방이 변경되지 않았으므로 fetchMessages를 호출하지 않습니다.
				}

				console.log(`Current roomId: ${newRoom.id}`);

				// 새로운 방이 선택되었을 때만 selectedRoomId를 업데이트
				if (selectedRoomId.value !== newRoom.id) {
					selectedRoomId.value = newRoom.id; // 선택한 방 ID 업데이트
					console.log(`Current roomId: ${newRoom.id}`);

					// 상대방이 채팅방에 있는지 확인하는 로직
					const roomRef = doc(db, 'rooms', newRoom.id);
					onSnapshot(roomRef, docSnapshot => {
						if (docSnapshot.exists()) {
							const roomData = docSnapshot.data();
							isReceiverInRoom.value = roomData.receiverInRoom || false;
						}
					});

					// 메시지 가져오기
					await fetchMessages(newRoom.id);

					// **방 입장 시에만 markMessagesAsRead 호출**
					await markMessagesAsRead(newRoom.id);
				}
			},
			{ immediate: true },
		);

		// 메시지 읽음 상태 업데이트 함수
		const markMessagesAsRead = async roomId => {
			// 현재 선택된 방이 아닌 경우 함수 종료
			if (selectedRoomId.value !== roomId) {
				return;
			}

			const messagesCollection = collection(db, 'rooms', roomId, 'messages');
			const unreadMessagesQuery = query(
				messagesCollection,
				where('isRead', '==', false),
				where('senderId', '!=', userId.value), // 현재 사용자가 보낸 메시지를 제외
			);

			const unreadMessagesSnapshot = await getDocs(unreadMessagesQuery);
			unreadMessagesSnapshot.forEach(async doc => {
				await updateDoc(doc.ref, { isRead: true });
			});
		};

		// 메시지 전송
		const sendMessage = async () => {
			// 메시지가 비어있고 파일도 선택되지 않은 경우 전송하지 않음
			if (messageContent.value.trim() === '' && !selectedFile.value) return;

			// 전송 중이면 함수 종료
			if (isSending.value) return;

			// 전송 상태를 true로 설정하여 버튼을 비활성화
			isSending.value = true;

			const message = {
				senderId: userId.value,
				senderName: userName.value,
				content: messageContent.value,
				timestamp: Date.now(),
				isRead: isReceiverInRoom.value, // 상대방이 채팅방에 있는지 여부에 따라 isRead 설정
			};

			// 파일이 선택되어 있다면 업로드하고 URL을 메시지에 포함
			if (selectedFile.value) {
				const fileURL = await uploadFile();
				if (fileURL) {
					message.fileURL = fileURL;
				}
			}

			try {
				// 메시지를 Firestore에 추가
				await addDoc(
					collection(db, 'rooms', props.roomId, 'messages'),
					message,
				);

				// 채팅방의 lastMessage 필드 업데이트
				const roomRef = doc(db, 'rooms', props.roomId);
				await updateDoc(roomRef, {
					lastMessage: message.content || '파일이 업로드되었습니다.', // 업로드된 파일을 표시하는 메시지
					lastMessageTimestamp: message.timestamp, // 마지막 메시지의 타임스탬프 추가
				});

				// 전송 후 초기화
				messageContent.value = '';
				previewImage.value = null; // 미리보기 초기화
				selectedFile.value = null; // 파일 선택 초기화
				scrollToBottom(); // 메시지가 전송되면 스크롤을 맨 아래로 이동
			} catch (error) {
				console.error('Error sending message:', error);
			} finally {
				// 메시지 전송이 완료되면 버튼을 다시 활성화
				isSending.value = false;
			}
		};

		// 타임스탬프를 포맷팅하는 함수
		const formatTimestamp = timestamp => {
			const date = new Date(timestamp);
			return `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
		};

		return {
			messages,
			messageContent,
			sendMessage,
			userId,
			formatTimestamp,
			scrollToBottom,
			chatMessages,
			onFileChange, // 파일 변경 이벤트 핸들러
			triggerFileInput,
			isImageFile, // 이미지 파일 여부 확인
			previewImage, // 미리보기 이미지 데이터
			isSending,
		};
	},
};
</script>

<style scoped>
/* 스타일 설정 */
.chat-container {
	flex: 1;
	display: flex;
	flex-direction: column;
	padding: 2px;
}

.chat-messages {
	flex: 1;
	overflow-y: auto;
	border: 1px solid #ccc;
	padding: 10px;
	display: flex;
	flex-direction: column;
	margin-bottom: 10px;
	background-color: #f9f9f9;
	border-radius: 10px;
}

.message-wrapper {
	display: flex;
	align-items: center; /* 메시지와 숫자 1을 수직 가운데 정렬 */
	/* margin-bottom: 5px; 메시지 간의 간격 */
}

.read-indicator {
	font-size: 15px;
	color: red;
	margin-left: 5px; /* 메시지 박스와 읽음 표시 사이의 간격 */
}

/* 입력 영역 스타일 */
.chat-input-container {
	display: flex;
	align-items: center;
	padding: 10px;
	border-top: 1px solid #ccc;
	background-color: #fff;
	border-radius: 0 0 15px 15px;
}

.chat-input {
	flex: 1;
	padding: 15px;
	border: 1px solid #ddd;
	border-radius: 25px;
	outline: none;
	font-size: 16px;
	box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
	background-color: #e0e0e0;
	margin-right: 10px;
}

.file-upload-button,
.send-button {
	width: 50px;
	height: 50px;
	background-color: #4caf50;
	border: none;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
	transition: background-color 0.3s;
	margin-left: 5px;
}

.file-upload-button:hover,
.send-button:hover {
	background-color: #45a049;
}

.file-upload-button svg,
.send-button svg {
	fill: white;
}

.hidden-file-input {
	display: none;
}

.send-button {
	width: 50px;
	height: 50px;
	background-color: #4caf50;
	border: none;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
	transition: background-color 0.3s;
}

.send-button:hover {
	background-color: #45a049;
}

.send-button svg {
	fill: white;
}

/* 메시지 스타일 */
.my-message,
.other-message {
	max-width: 60%;
	padding: 10px;
	border-radius: 15px;
	margin: 10px 0;
}

.my-message {
	background-color: #4caf50;
	align-self: flex-end;
	color: white;
	text-align: left;
	margin-left: auto; /* 오른쪽에 정렬되도록 설정 */
}

.other-message {
	background-color: #e0e0e0;
	align-self: flex-start;
	color: black;
	text-align: left;
	margin-right: auto; /* 왼쪽에 정렬되도록 설정 */
}

/* 프로필 이미지와 사용자 정보 */
.message-header {
	display: flex;
	align-items: center;
	margin-bottom: 5px;
}

.profile-pic {
	width: 40px;
	height: 40px;
	border-radius: 50%;
	margin-right: 10px;
}

.username {
	font-weight: bold;
}

.timestamp {
	font-size: 12px;
	color: gray;
	text-align: right;
	margin-top: 5px;
}

/* 메시지 내용 */
.message-content {
	word-break: break-word;
	margin-top: 10px;
}

.uploaded-image {
	max-width: 100%;
	max-height: 200px;
	border-radius: 8px;
	margin-top: 10px;
}
</style>
