import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import QuestionView from '@/views/QuestionView.vue';
import MentoringView from '@/views/MentoringView.vue';
import AdminView from '@/views/AdminView.vue';
import MypageView from '@/views/MypageView.vue';
import LoginView from '@/views/LoginView.vue';

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
		component: LoginView,
	},
];

const router = createRouter({
	history: createWebHistory('/'),
	routes,
});

export default router;
