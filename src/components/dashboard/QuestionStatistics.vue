<template>
	<div class="chart">
		<h3>질문 통계</h3>
		<BarChart v-if="chartDataReady" :data="chartData" :options="chartOptions" />
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useQuestionStore } from '@/stores/dashboard/questionStore';
import BarChart from '@/components/charts/BarChart.vue';

const questionStore = useQuestionStore();
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
			label: '카테고리 별 질문 수',
			backgroundColor: '#f87979',
			data: [
				questionStore.categoryCounts.ITSW || 0,
				questionStore.categoryCounts.DESIGN || 0,
				questionStore.categoryCounts.MARKETING || 0,
				questionStore.categoryCounts.FINANCE || 0,
				questionStore.categoryCounts.MD || 0,
				questionStore.categoryCounts.ADBERTISE || 0,
				questionStore.categoryCounts.PRIDUCTION || 0,
				questionStore.categoryCounts.MEDIA || 0,
				questionStore.categoryCounts.ETC || 0,
			],
		},
	],
}));

const chartOptions = {
	responsive: true,
};

onMounted(async () => {
	await questionStore.fetchCategoryCounts();
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
</style>
