<template>
	<div class="chat-list">
		<input v-model="search" placeholder="유저 이름" />
		<ul>
			<li
				v-for="(room, index) in filteredChatRooms"
				:key="index"
				@click="selectRoom(room)"
				:class="['chatlist-box', { active: selectedRoomId === room.id }]"
			>
				<img
					:src="room.chatProfiles[room.receiverId]"
					alt="Profile Picture"
					class="profile-pic"
				/>
				<div class="chat-info">
					<div class="chat-header">
						<span class="chat-name">{{
							room.chatRoomNames[userId] || room.name
						}}</span>
						<span class="chat-time">{{
							formatTimestamp(room.lastMessageTimestamp)
						}}</span>
					</div>
					<div class="chat-message">
						{{ formatLastMessage(room.lastMessage) }}
					</div>
				</div>
				<div v-if="room.unreadMessages > 0" class="notification-badge">
					{{ room.unreadMessages }}
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
import { ref, onMounted, computed, watch } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { db, realtimeDb } from '@/firebaseConfig';
import {
	collection,
	query,
	onSnapshot,
	orderBy,
	where,
	getDocs,
} from 'firebase/firestore';
import { ref as dbRef, onValue } from 'firebase/database';
import { useRoute } from 'vue-router';

export default {
	name: 'ChatRoomList',
	emits: ['select-room'],
	setup(props, { emit }) {
		const search = ref('');
		const chatRooms = ref([]);
		const selectedRoomId = ref(null);
		const route = useRoute();

		const userStore = useAuthStore();
		const userId = computed(() =>
			userStore.userInfo ? userStore.userInfo.id : null,
		);

		// URL에서 roomId 쿼리 파라미터 읽기
		selectedRoomId.value = route.query.roomId || null;

		watch(
			() => route.query.roomId,
			newRoomId => {
				selectedRoomId.value = newRoomId;
			},
		);

		const formatTimestamp = timestamp => {
			if (!timestamp) return '';
			const date = new Date(timestamp);
			const month = (date.getMonth() + 1).toString().padStart(2, '0');
			const day = date.getDate().toString().padStart(2, '0');
			const hours = date.getHours().toString().padStart(2, '0');
			const minutes = date.getMinutes().toString().padStart(2, '0');
			return `${month}월 ${day}일 ${hours}시 ${minutes}분`;
		};

		const formatLastMessage = message => {
			if (!message) return '';
			return message.length > 20 ? message.slice(0, 20) + '...' : message;
		};

		onMounted(() => {
			const roomsCollection = collection(db, 'rooms');
			const q = query(roomsCollection, orderBy('lastMessageTimestamp', 'desc'));

			onSnapshot(q, async querySnapshot => {
				const updatedRooms = [];

				for (const doc of querySnapshot.docs) {
					const roomData = {
						id: doc.id,
						...doc.data(),
						unreadMessages: 0,
						isReceiverInRoom: false,
					};

					try {
						const messagesCollection = collection(
							db,
							'rooms',
							doc.id,
							'messages',
						);
						const unreadMessagesQuery = query(
							messagesCollection,
							where('isRead', '==', false),
							where('senderId', '!=', userId.value),
						);
						const unreadMessagesSnapshot = await getDocs(unreadMessagesQuery);
						roomData.unreadMessages = unreadMessagesSnapshot.size;
					} catch (error) {
						console.error('Error getting unread messages count:', error);
					}

					const roomUsersRef = dbRef(realtimeDb, `rooms/${roomData.id}/users`);
					onValue(roomUsersRef, snapshot => {
						const users = snapshot.val();
						if (users) {
							const receiverId = roomData.receiverId;
							roomData.isReceiverInRoom = !!users[receiverId];
						} else {
							roomData.isReceiverInRoom = false;
						}
					});

					updatedRooms.push(roomData);
				}

				chatRooms.value = [...updatedRooms].sort((a, b) => {
					return b.lastMessageTimestamp - a.lastMessageTimestamp;
				});
			});
		});

		// 현재 사용자가 속한 채팅방만 필터링 ( 현재 사용자 채팅방 필터링 후 검색 필터링 적용)
		const filteredChatRooms = computed(() => {
			const searchValue = search.value.trim().toLowerCase();

			// 먼저 현재 사용자가 참여한 채팅방만 필터링
			const userRooms = chatRooms.value.filter(room => {
				return (
					room.receiverId === userId.value || room.senderId === userId.value
				);
			});

			// 검색어가 없으면 필터링된 참여 채팅방 목록을 반환
			if (searchValue === '') {
				return userRooms;
			}
			// 검색어가 있으면 참여 채팅방 중 검색어에 맞는 채팅방을 추가로 필터링
			return userRooms.filter(room => {
				const chatRoomName = room.chatRoomNames?.[userId.value] || room.name;
				return chatRoomName && chatRoomName.toLowerCase().includes(searchValue);
			});
		});

		const selectRoom = room => {
			selectedRoomId.value = room.id;
			emit('select-room', room);
		};

		return {
			search,
			chatRooms,
			filteredChatRooms,
			formatTimestamp,
			formatLastMessage,
			userId,
			selectRoom,
			selectedRoomId,
		};
	},
};
</script>

<style scoped>
.chat-list {
	width: 25%;
	border-right: 1px solid #ccc;
	padding: 10px;
	background: #f9f9f9;
	border-radius: 10px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	margin-left: 25px;
	height: 96%;
}

.chat-list input {
	width: 100%;
	padding: 10px;
	margin-bottom: 15px;
	border-radius: 20px;
	border: 1px solid #ddd;
	background-color: #f5f5f5;
}

.chatlist-box {
	width: 100%;
	height: 90px;
	display: flex;
	align-items: center;
	padding: 10px;
	border-bottom: 1px solid #ddd;
	border-top: 1px solid #ddd;
	cursor: pointer;
	transition: background 0.3s;
}

.chatlist-box:hover,
.chatlist-box.active {
	background: #ccc;
}

.profile-pic {
	width: 50px;
	height: 50px;
	border-radius: 50%;
	margin-right: 10px;
}

.chat-info {
	flex-grow: 1;
}

.chat-header {
	display: flex;
	justify-content: space-between;
	font-weight: bold;
}

.chat-time {
	color: #888;
	font-size: 0.85em;
	margin-right: 20px;
}

.chat-message {
	color: #666;
	font-size: 0.9em;
}

.notification-badge {
	background-color: #f00;
	color: #fff;
	font-size: 0.8em;
	width: 20px;
	height: 20px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
