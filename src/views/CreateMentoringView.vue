<template>
	<div class="center-container">
		<SelectCategoryComp></SelectCategoryComp>
		<input type="text" class="large-input" placeholder="제목을 입력하세요" />
		<textarea
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
			/>
		</div>
		<SelectHashTagComp></SelectHashTagComp>
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
			class="text-editor"
			:placeholder="'질문내용을 입력해주세요'"
			:height="600"
		></TextEditorComp>
		<div class="button-container">
			<router-link to="/question">
				<button class="cancel-button">취소</button>
			</router-link>
			<router-link to="/question">
				<button class="save-button">저장</button>
			</router-link>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import SelectCategoryComp from '@/components/SelectCategoryComp.vue';
import SelectHashTagComp from '@/components/SelectHashTagComp.vue';
import TextEditorComp from '@/components/TextEditorComp.vue';

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
	text-align: left;
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
