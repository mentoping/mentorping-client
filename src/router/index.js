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
import ReportDetailView from '@/views/ReportDetailView.vue';
import InquiryDetailView from '@/views/InquiryDetailView.vue';
import UserDetailView from '@/views/UserDetailView.vue';
import CreateMentoringView from '@/views/CreateMentoringView.vue';
import MentoringDetail from '@/views/MentoringDetail.vue';

import MyPageMenteeProfile from '@/components/mypage/MyPageMenteeProfile.vue';
import MyPageMentorProfile from '@/components/mypage/MyPageMentorProfile.vue';
import MyPageLikeQuestion from '@/components/mypage/MyPageLikeQuestion.vue';

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
		path: '/report-detail/:id',
		name: 'ReportDetail',
		component: ReportDetailView,
		props: true, // id를 prop으로 전달할 수 있게 설정
	},
	{
		path: '/inquiry-detail/:id',
		name: 'InquiryDetailView',
		component: InquiryDetailView,
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
});

export default router;
