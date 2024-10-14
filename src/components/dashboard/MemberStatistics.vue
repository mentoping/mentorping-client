<template>
	<div class="chart">
		<h3>회원 통계</h3>
		<BarChart :data="chartData" :options="chartOptions" />
	</div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRoleCountStore } from '@/stores/dashboard/memberStore';
import BarChart from '@/components/charts/BarChart.vue';

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
</style>
