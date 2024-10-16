import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import QuestionView from '@/views/QuestionView.vue';
import MentoringView from '@/views/MentoringView.vue';
import AdminView from '@/views/AdminView.vue';
import MypageView from '@/views/MypageView.vue';
import CommonUserLoginView from '@/views/CommonUserLoginView.vue';
import AdminUserLoginView from '@/views/AdminUserLoginView.vue';
import QuestionDetail from '@/views/QuestionDetail.vue';
import ChatRoom from '@/views/ChatRoom.vue';
import CreateInquiryView from '@/views/CreateInquiryView.vue';
import CreateQuestionView from '@/views/CreateQuestionView.vue';
import UserDetailView from '@/views/UserDetailView.vue';
import CreateMentoringView from '@/views/CreateMentoringView.vue';
import MentoringDetail from '@/views/MentoringDetail.vue';

import MyPageMenteeProfile from '@/components/mypage/MyPageMenteeProfile.vue';
import MyPageMentorProfile from '@/components/mypage/MyPageMentorProfile.vue';
import MyPageLikeQuestion from '@/components/mypage/MyPageLikeQuestion.vue';
import MyPageLikeMentoring from '@/components/mypage/MyPageLikeMentoring.vue';
import MyPageApplyMentoring from '@/components/mypage/MyPageApplyMentoring.vue';
import MyPageChatting from '@/components/mypage/MyPageChatting.vue';

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
		children: [
			{
				path: '',
				name: 'MenteeProfile',
				component: MyPageMenteeProfile,
			},
			{
				path: 'mentor',
				name: 'MentorProfile',
				component: MyPageMentorProfile,
			},
			{
				path: 'like-question',
				name: 'LikeQuestion',
				component: MyPageLikeQuestion,
			},
			{
				path: 'like-mentoring',
				name: 'LikeMentoring',
				component: MyPageLikeMentoring,
			},
			{
				path: 'apply-mentoring',
				name: 'ApplyMentoring',
				component: MyPageApplyMentoring,
			},
			{
				path: 'chatting',
				name: 'Chatting',
				component: MyPageChatting,
			},
		],
	},
	{
		path: '/login',
		name: 'Login',
		component: CommonUserLoginView,
	},
	{
		path: '/admin-login',
		name: 'AdminLogin',
		component: AdminUserLoginView,
	},
	{
		path: '/chat',
		name: 'ChatRoom',
		component: ChatRoom,
	},
	{
		path: '/inquiry',
		name: 'Inquiry',
		component: CreateInquiryView,
	},
	{
		path: '/create-question',
		name: 'CreateQuestion',
		component: CreateQuestionView,
	},
	{
		path: '/create-mentoring',
		name: 'CreateMentoring',
		component: CreateMentoringView,
	},
	{
		path: '/mentoring/:id',
		name: 'MentoringDetail',
		component: MentoringDetail,
		props: true, // id를 prop으로 전달할 수 있게 설정
	},
	{
		path: '/user-detail/:id',
		name: 'UserDetailView',
		component: UserDetailView,
		props: true, // id를 prop으로 전달할 수 있게 설정
	},
];

const router = createRouter({
	history: createWebHistory('/'),
	routes,
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			// 뒤로가기 했을 때는 이전 위치로 스크롤
			return savedPosition;
		} else {
			// 페이지 이동 시 스크롤을 맨 위로
			return { top: 0 };
		}
	},
});

export default router;
