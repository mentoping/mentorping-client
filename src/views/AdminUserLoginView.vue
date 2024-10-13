<template>
	<div class="login-container">
		<div class="title">Admin Login</div>
		<div class="explain">admin 계정 로그인</div>
		<form class="login-form">
			<label for="email" class="input-label">Email</label>
			<input
				type="text"
				id="email"
				class="input-field"
				placeholder="아이디를 입력하세요"
			/>
			<label for="password" class="input-label">Password</label>
			<input
				type="password"
				id="password"
				class="input-field"
				placeholder="******"
			/>
		</form>
		<button class="login-button">로그인</button>
		<div class="end-line">
			<div class="ask-content">
				일반 회원이십니까?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			</div>
			<RouterLink class="admin-go" to="/login">일반 로그인하러가기</RouterLink>
		</div>
	</div>
</template>

<script setup></script>

<style scoped>
.login-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 150px;
}

.explain {
	margin-top: 15px;
	color: #808080;
	font-size: 25px;
}

.title {
	font-weight: 800;
	font-size: 4vw;
	color: #369261;
}

.login-form {
	display: flex;
	flex-direction: column;
	width: 500px;
	margin-top: 60px;
}

.input-label {
	color: #969696;
	margin-bottom: 10px;
	font-size: 18px;
}

.input-field {
	width: 100%;
	padding: 15px;
	font-size: 18px;
	border: 1px solid #e9e9e9;
	border-radius: 10px;
	margin-bottom: 20px;
	outline: none;
}

.input-field::placeholder {
	color: #d3d3d3;
}

.login-button {
	margin-top: 20px;
	width: 500px;
	height: 60px;
	border: none;
	border-radius: 10px;
	background-color: #369261;
	color: white;
	font-weight: 700;
	font-size: 20px;
}

.end-line {
	margin-top: 100px;
	display: flex;
	justify-content: center;
	width: 600px;
	font-size: 20px;
	margin-bottom: 40px;
}

.ask-content {
	color: #969696;
}

.admin-go {
	font-weight: 800;
	font-size: 20px;
	color: #369261;
}
</style>
