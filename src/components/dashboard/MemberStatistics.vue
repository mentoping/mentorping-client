<template>
	<div class="chart">
		<h3>회원 통계</h3>
		<div class="chart-wrapper">
			<div class="chart-container">
				<DoughnutChart :data="chartData" :options="chartOptions" />
			</div>
			<div class="chart-text">
				<p>멘티:{{ roleCountStore.menteeCount }}</p>
				<p>멘토:{{ roleCountStore.mentorCount }}</p>
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRoleCountStore } from '@/stores/dashboard/memberStore';
import DoughnutChart from '@/components/charts/DoughnutElement.vue';

const roleCountStore = useRoleCountStore();

const chartData = computed(() => ({
	labels: ['멘티', '멘토'],
	datasets: [
		{
			label: '역할별 사용자 수',
			backgroundColor: ['#f87979', '#79f879'],
			data: [roleCountStore.menteeCount, roleCountStore.mentorCount], // store의 데이터를 기반으로 자동으로 계산
		},
	],
}));

const chartOptions = {
	responsive: true,
	maintainAspectRatio: false, // 사이즈를 직접 조정할 수 있게 설정
	cutout: '60%',
};

onMounted(() => {
	roleCountStore.fetchRoleCounts();
	chartData.value.datasets[0].data = [
		roleCountStore.menteeCount,
		roleCountStore.mentorCount,
	];
});
</script>

<style scoped>
.chart {
	background: #fff;
	padding: 20px;
	border-radius: 8px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.chart-wrapper {
	display: flex;
	align-items: center;
}

.chart-container {
	width: 300px;
	height: 300px;
}

.chart-text {
	margin-left: 20px;
}
</style>
