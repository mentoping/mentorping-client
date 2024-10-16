<template>
	<div class="homepage-container">
		<div class="advertise-container">
			<img ref="adImage" :src="images[currentIndex]" alt="" id="ad-image" />
			<button ref="prevBtn" class="prev-btn">&lt;</button>
			<button ref="nextBtn" class="next-btn">&gt;</button>
		</div>
		<div class="explain">
			<div class="explain-title">Mentain</div>
			<div class="explain-detail">
				Menain은 멘토링(Mentoring)과 마운틴(Mountain)의 합성어로<br />멘토링을
				통해 큰 산을 넘거나 멘토와 함께 성장의 고지를 향해<br />나아간다는
				의미를 담고 있습니다.
			</div>
		</div>
		<div class="application-value">
			<div class="value-card card1">
				<div class="card-logo">
					<i class="fa-solid fa-question" style="color: #226e0c"></i>
				</div>
				<div class="card-explain">
					<div class="card-title">빠르고 정확한 궁금증 해소</div>
					<div class="card-detail">
						다양한 분야의 전문가인 멘토들의 답변을 통해 멘티의 궁금증을 빠르고
						정확하게 해소할 수 있습니다
					</div>
				</div>
			</div>
			<div class="value-card card2">
				<div class="card-logo">
					<i class="fa-regular fa-handshake" style="color: #226e0c"></i>
				</div>
				<div class="card-explain">
					<div class="card-title">지속적인 멘토링</div>
					<div class="card-detail">
						단순히 단발성으로 궁금증을 해소하는 것이 아닌 멘토와의 채팅을 통해서
						지속적인 멘토링을 받을 수 있습니다
					</div>
				</div>
			</div>
			<div class="value-card card3">
				<div class="card-logo">
					<i class="fa-solid fa-hand-holding-dollar" style="color: #226e0c"></i>
				</div>
				<div class="card-explain">
					<div class="card-title">부가 수익 창출</div>
					<div class="card-detail">
						검증된 멘토는 본인의 멘토링을 개설하여 부과적인 수익을 창출할 수
						있습니다
					</div>
				</div>
			</div>
		</div>
		<div class="section">
			<div class="section-header">
				<div class="section-explain">
					<span>질문</span>을 통해 멘토에게 궁금한 점을 물어보세요<br />추가적으로
					궁금한 사항은 채팅을 통해 물어볼 수 있습니다
				</div>
				<div class="section-button">
					<router-link to="/question" class="route-button"
						>질문 보러가기</router-link
					>
				</div>
			</div>
			<div class="section-body">
				<div class="question-card">
					<div class="question-header">
						<img
							src="https://picsum.photos/50"
							alt="프로필 이미지"
							class="profile-img"
						/>
						<div class="user-info">
							<div class="category">IT/SW</div>
							<div class="author">질문자</div>
						</div>
					</div>
					<div class="question-content">
						<h3 class="title">
							Vue3의 공식 store Pinia에 대해 궁금한 점이 있습니다
						</h3>
						<p class="content">
							Vuex로 작업하던 내용을 pinia를 통해 관리하려합니다. 아래에
							해당하는 코드의 내용을 pinia로 사용하려면 어떻게 해야할까요?
						</p>
					</div>
					<div class="question-footer">
						<div class="hashtags">
							<span class="hashtag">#해시태그1</span>
							<span class="hashtag">#해시태그2</span>
							<span class="hashtag">#해시태그3</span>
						</div>
						<div class="actions">
							<span class="likes">
								<span
									><i class="fa-solid fa-heart" style="color: #c21919"></i
								></span>
								1
							</span>
							<span class="answers">
								<i class="fa-regular fa-comment-dots"></i>
								1
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="section">
			<div class="section-header">
				<div class="section-explain">
					<span>멘토링</span>을 통해 본인의 역량을 강화해 보세요<br />검색 및
					분류를 통해 자신에게 필요한 멘토링을 찾을 수 있습니다.<br />또한 직접
					멘토링을 개설하여 멘티들의 성장을 돕는 멘토로 활약할 수 있습니다.
				</div>
				<div class="section-button">
					<router-link to="/mentoring" class="route-button"
						>멘토링 보러가기</router-link
					>
				</div>
			</div>
			<div class="section-body"></div>
			<div class="footer"></div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// 이미지 배열
const images = [
	new URL('@/assets/Banner1.png', import.meta.url).href,
	new URL('@/assets/Banner2.png', import.meta.url).href,
];
let currentIndex = ref(0); // 이미지 인덱스 관리

// DOM 요소를 참조할 ref 선언
const adImage = ref(null);
const prevBtn = ref(null);
const nextBtn = ref(null);

onMounted(() => {
	// DOM 요소에 접근할 때는 .value 사용
	if (prevBtn.value && nextBtn.value && adImage.value) {
		prevBtn.value.addEventListener('click', () => {
			currentIndex.value =
				(currentIndex.value - 1 + images.length) % images.length;
			adImage.value.src = images[currentIndex.value];
		});

		nextBtn.value.addEventListener('click', () => {
			currentIndex.value = (currentIndex.value + 1) % images.length;
			adImage.value.src = images[currentIndex.value];
		});
	}
});
</script>

<style scoped>
.homepage-container {
	display: flex;
	align-items: center; /* 교차축 방향 중앙 정렬 */
	flex-direction: column;
	width: 100%;
}

.advertise-container {
	position: relative;
	height: 600px;
	width: 75%;
	border-radius: 20px;
	margin-top: 40px;
	background-color: #16a1ef;
}

.advertise-container img {
	width: 100%;
	height: 100%;
	object-fit: fill;
	border-radius: 20px;
}

.prev-btn,
.next-btn {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	color: rgba(0, 0, 0, 0.24);
	border: none;
	padding: 10px;
	cursor: pointer;
	font-size: 40px;
	background-color: transparent;
}

.prev-btn {
	left: 10px; /* 왼쪽 버튼 */
}

.next-btn {
	right: 10px; /* 오른쪽 버튼 */
}

.prev-btn:hover,
.next-btn:hover {
	font-size: 50px;
	color: black;
}

.explain {
	margin-top: 80px;
	display: flex;
	flex-direction: column;
	text-align: center;
}

.explain-title {
	font-weight: 800;
	font-size: 100px;
}

.explain-detail {
	font-size: 20px;
	line-height: 30px;
	color: rgb(107, 107, 107);
}

.application-value {
	margin-top: 50px;
	width: 70%;
	height: 500px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
}

.value-card {
	height: 400px;
	width: 30%;
	border-radius: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
}

.card1 {
	background-color: #36926177;
}

.card2 {
	background-color: #369261a0;
}

.card3 {
	background-color: #369261c9;
}

.card-logo {
	width: 80%;
	height: 45%;
	background-color: white;
	border-radius: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 80px;
}

.card-explain {
	width: 80%;
	height: 40%;
	display: flex;
	flex-direction: column;
	text-align: center;
	justify-content: space-evenly;
}

.card-title {
	font-weight: 800;
	font-size: 25px;
}

.section {
	margin-top: 100px;
	margin-bottom: 100px;
	width: 80%;
	height: 600px;

	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.section-header {
	width: 100%;
	height: 30%;

	display: flex;
	justify-content: space-between;
}

.section-explain {
	font-size: 23px;
	width: 70%;
	height: 100%;
	display: flex;
	align-items: flex-end;
}

.section-explain span {
	font-weight: 800;
	font-size: 80px;
}

.section-button {
	width: 20%;
	height: 100%;
	display: flex;
	align-items: end;
	justify-content: end;
}

.route-button {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 70%;
	height: 25%;
	border-radius: 20px;
	background-color: #16a1ef;
	color: white;
	font-size: 25px;
	border: none;
}

.section-body {
	width: 100%;
	height: 400px;
	background-color: #f2f2f2;
	display: flex;
	align-items: center;
	justify-content: center;
}

.question-card {
	border: 1px solid #e0e0e0;
	border-radius: 8px;
	padding: 16px;
	background-color: #ffffff;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	margin-bottom: 30px;
	max-width: 1200px;
	width: 80vw;
	height: 15vw;
	transition: box-shadow 0.3s ease;
	cursor: pointer; /* 클릭 가능하다는 것을 사용자에게 시각적으로 알려줌 */
	position: relative;

	display: flex;
	flex-direction: column;
	justify-content: space-around;
}

.question-card:hover {
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.question-header {
	display: flex;
	align-items: center;
	height: 30%;
}

.profile-img {
	height: 80%;
	aspect-ratio: 1 / 1;
	border-radius: 50%;
	margin-right: 16px;
}

.user-info {
	display: flex;
	flex-direction: column;
}

.category {
	font-size: 15px;
	font-weight: 600;
	color: #888;
}

.author {
	font-size: 17px;
	font-weight: 700;
}

.question-content {
	height: 50%;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
}

.title {
	font-size: 30px;
	font-weight: 800;
}

.content {
	font-size: 18px;
	color: #646464;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 80%;
}

.question-footer {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.hashtags {
	display: flex;
	gap: 8px;
	flex-wrap: wrap;
}

.hashtag {
	padding: 3px 6px;
	font-size: 15px;
	font-weight: 600;
	color: black;
	background-color: rgb(188, 188, 188);
	border-radius: 10px;
}

.actions {
	display: flex;
	gap: 16px;
}

.likes,
.answers {
	font-size: 23px;
	display: flex;
	align-items: center;
	gap: 4px;
	cursor: pointer;
}

.selected-icon {
	position: absolute;
	top: 20px;
	right: 20px;
	background-color: green;
	padding: 10px;
	width: 65px;
	height: 65px;
	border-radius: 50%;
	font-size: 13px;
	text-align: center;
	display: flex;
	justify-content: center; /* 가로 중앙 정렬 */
	align-items: center; /* 세로 중앙 정렬 */
	color: white;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
</style>
