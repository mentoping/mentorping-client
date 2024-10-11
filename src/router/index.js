import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import QuestionView from '@/views/QuestionView.vue';
import MentoringView from '@/views/MentoringView.vue';
import AdminView from '@/views/AdminView.vue';
import MypageView from '@/views/MypageView.vue';
import LoginView from '@/views/LoginView.vue';
import QuestionDetail from '@/views/QuestionDetail.vue';
import ChatRoom from '@/views/ChatRoom.vue';
import InquiryView from '@/views/InquiryView.vue';
import CreateQuestionView from '@/views/CreateQuestionView.vue';

const routes = [
	{
		path: '/',
		component: HomeView,
	},
	{
		path: '/question',
		component: QuestionView,
	},
	{
		path: '/question/:id',
		component: QuestionDetail,
		props: true, // id를 prop으로 전달할 수 있게 설정
	},
	{
		path: '/mentoring',
		component: MentoringView,
	},
	{
		path: '/admin',
		component: AdminView,
	},
	{
		path: '/mypage',
		component: MypageView,
	},
	{
		path: '/login',
		name: 'Login',
		component: LoginView,
	},
	{
		path: '/chat',
		name: 'ChatRoom',
		component: ChatRoom,
	},
	{
		path: '/inquiry',
		name: 'Inquiry',
		component: InquiryView,
	},
	{
		path: '/create-question',
		name: 'CreateQuestion',
		component: CreateQuestionView,
	},
];

const router = createRouter({
	history: createWebHistory('/'),
	routes,
});

export default router;
