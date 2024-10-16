<template>
	<div class="chart">
		<h3>멘토링 통계</h3>
		<!-- <div class="chart-container"> -->
		<BarChart v-if="chartDataReady" :data="chartData" :options="chartOptions" />
		<!-- </div> -->
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useMentoringStore } from '@/stores/dashboard/mentoringStore';
import BarChart from '@/components/charts/BarChart.vue';

const mentoringStore = useMentoringStore();
const chartDataReady = ref(false); // 데이터가 준비되었는지 여부

const chartData = computed(() => ({
	labels: [
		'IT/SW',
		'디자인',
		'마케팅',
		'경영',
		'상품기획',
		'광고',
		'생산',
		'미디어',
		'기타',
	],
	datasets: [
		{
			label: '카테고리 별 멘토링 수',
			backgroundColor: '#f87979',
			data: [
				mentoringStore.categoryCounts.ITSW || 0,
				mentoringStore.categoryCounts.DESIGN || 0,
				mentoringStore.categoryCounts.MARKETING || 0,
				mentoringStore.categoryCounts.FINANCE || 0,
				mentoringStore.categoryCounts.MD || 0,
				mentoringStore.categoryCounts.ADBERTISE || 0,
				mentoringStore.categoryCounts.PRIDUCTION || 0,
				mentoringStore.categoryCounts.MEDIA || 0,
				mentoringStore.categoryCounts.ETC || 0,
			],
		},
	],
}));

const chartOptions = {
	responsive: true,
};

onMounted(async () => {
	await mentoringStore.fetchCategoryCounts();
	chartDataReady.value = true; // 데이터가 로드된 후 차트 표시
});
</script>

<style scoped>
.chart {
	background: #fff;
	padding: 20px;
	border-radius: 8px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.chart-container {
	width: 300px;
}
</style>
