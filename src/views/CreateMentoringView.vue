<template>
	<div class="center-container">
		<SelectCategoryComp></SelectCategoryComp>
		<input
			type="text"
			class="large-input"
			placeholder="제목을 입력하세요"
			v-model="title"
		/>
		<textarea
			v-model="summary"
			class="medium-textarea"
			placeholder="개설하시는 멘토링에 대해서 간략한 설명을 기입해주세요"
		></textarea>
		<div class="price-container">
			<p>멘토링 가격</p>
			<input
				type="number"
				placeholder="무료이면 0을 입력해주세요"
				min="0"
				step="1"
				v-model="price"
			/>
		</div>
		<SelectHashTagComp v-model="hashtags"></SelectHashTagComp>
		<div class="thumbnail-container">
			<p class="thumbnail-title">썸네일 등록</p>
			<p class="thumbnail-explain">
				멘토링 썸네일에 등록할 이미지를 첨부해주세요.<br />
				지정하지 않을 경우 기본 이미지가 사용됩니다.
			</p>
			<div class="thumbnail-preview">
				<img
					:src="thumbnailUrl"
					alt="썸네일 이미지 미리보기"
					v-if="thumbnailUrl"
					class="thumbnail-image"
				/>
				<button
					@click="removeThumbnail"
					v-if="thumbnailUrl"
					class="remove-thumbnail-button"
				>
					X
				</button>
				<input
					type="file"
					ref="thumbnailInput"
					@change="onThumbnailChange"
					class="thumbnail-input-overlay"
				/>
			</div>
		</div>
		<TextEditorComp
			v-model="content"
			class="text-editor"
			:placeholder="'질문내용을 입력해주세요'"
			:height="600"
		></TextEditorComp>
		<div class="button-container">
			<router-link to="/question">
				<button class="cancel-button">취소</button>
			</router-link>
			<button class="save-button" @click="handleSave">저장</button>
		</div>
	</div>
</template>

<script setup>
import axios from 'axios';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useCategoryStore } from '@/stores/category';
import SelectCategoryComp from '@/components/SelectCategoryComp.vue';
import SelectHashTagComp from '@/components/SelectHashTagComp.vue';
import TextEditorComp from '@/components/TextEditorComp.vue';

const router = useRouter();
const categoryStore = useCategoryStore();

const { selectedCategory } = storeToRefs(categoryStore); //현재 선택된 카테고리

const title = ref(''); //질문 제목
const hashtags = ref([]); // 해시태그 배열
const summary = ref('');
const content = ref('');
const price = ref('');

const thumbnailUrl = ref(null);
const thumbnailInput = ref(null); // 파일 입력 요소를 참조하는 변수

const onThumbnailChange = event => {
	const file = event.target.files[0];
	if (file) {
		thumbnailUrl.value = URL.createObjectURL(file);
	}
};

const removeThumbnail = () => {
	thumbnailUrl.value = null;
	if (thumbnailInput.value) {
		thumbnailInput.value.value = ''; // 파일 입력 요소 초기화
	}
};

const handleSave = async () => {
	if (selectedCategory.value === 'ALL') {
		alert('카테고리를 선택해주세요.');
		return;
	}
	if (!title.value.trim()) {
		alert('제목을 입력해주세요.');
		return;
	}
	if (!content.value.trim()) {
		alert('멘토링 내용을 입력해주세요.');
		return;
	}
	if (!summary.value.trim()) {
		alert('멘토링에 대한 요약 내용을 입력해주세요.');
		return;
	}
	if (!price.value) {
		alert('가격을 입력해주세요.');
		return;
	}
	if (!thumbnailUrl.value.trim()) {
		alert('썸네일을 등록해주세요.');
		return;
	}

	try {
		// API 요청 보내기
		await axios.post(
			'/api//mentorings',
			{
				title: title.value,
				content: content.value,
				category: selectedCategory.value,
				hashtags: hashtags.value,
				price: price.value,
				thumbnailUrl: thumbnailUrl.value,
				summary: summary.value,
			},
			{
				withCredentials: true, // withCredentials는 세 번째 인자로 전달해야 함
			},
		);
		// 저장 성공 후 페이지 이동
		alert('멘토링이 성공적으로 생성되었습니다.');
		router.push('/mentoring');
	} catch (error) {
		console.error('멘토링 생성 중 오류가 발생했습니다:', error);
		alert('멘토링 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
	}
};
</script>

<style scoped>
.center-container {
	margin-top: 100px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.large-input {
	width: 60vw;
	padding: 1rem;
	margin-top: 1rem;
	height: 17vh;
	margin-top: 40px;
	border: none;
	text-align: center;
	font-weight: 800;
	font-size: 10vh;
	outline: none;
}

.medium-textarea {
	width: 30vw;
	margin-top: 70px;
	height: 17vh;
	border: none;
	font-weight: 800;
	font-size: 23px;
	text-align: center;
	outline: none;
	resize: none; /* 크기 조절 불가능하도록 설정 */
	padding: 1rem;
}

.medium-textarea::placeholder {
	text-align: center; /* placeholder를 가로로 가운데 정렬 */
}

.text-editor {
	margin-top: 50px;
	width: 70%;
}

.button-container {
	width: 70%;
	display: flex;
	justify-content: flex-end;
	margin-top: 60px;
}

.cancel-button,
.save-button {
	padding: 0.5rem 1rem;
	margin-left: 10px;
	font-size: 1rem;
	border: none;
	cursor: pointer;
	font-weight: bold;
	border-radius: 10px;
	margin-bottom: 100px;
	width: 70px;
}

.save-button {
	background-color: #369261;
	color: white;
}

.price-container {
	margin-top: 50px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-bottom: 50px;
}

.price-container p {
	font-weight: 800;
	font-size: 22px;
	margin-bottom: 10px;
}

.price-container input {
	border-radius: 10px;
	width: 12vw;
	padding: 5px;
	border: 2px solid rgb(185, 185, 185);
}

.price-container input::placeholder {
	text-align: center; /* placeholder를 가로로 가운데 정렬 */
}

.thumbnail-container {
	margin-top: 100px;
	text-align: center;
}

.thumbnail-preview {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
}

.thumbnail-preview img.thumbnail-image {
	width: 500px;
	height: 260px;
	border-radius: 10px;
}

.remove-thumbnail-button {
	position: absolute;
	top: 5px;
	right: 5px;
	background-color: rgba(0, 0, 0, 0.5);
	color: white;
	border: none;
	border-radius: 50%;
	width: 25px;
	height: 25px;
	cursor: pointer;
}

.thumbnail-title {
	font-weight: 800;
	font-size: 20px;
}

.thumbnail-explain {
	width: 500px;
	margin-top: 10px;
	margin-bottom: 50px;
	color: #878787;
}

.thumbnail-input-overlay {
	position: absolute;
	bottom: 0px;
	left: 50%;
	transform: translateX(-50%);
	background-color: rgba(0, 0, 0, 0.613);
	padding: 8px;
	border-radius: 10px;
	cursor: pointer;
	width: 500px;
	height: 40px;
	color: white;
}
</style>
