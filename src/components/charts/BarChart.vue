<template>
	<Bar :data="data" :options="options" />
</template>

<script>
import { Bar } from 'vue-chartjs';
import {
	Chart as ChartJS,
	Title,
	Tooltip,
	Legend,
	BarElement,
	CategoryScale,
	LinearScale,
} from 'chart.js';

// Chart.js에서 필요한 구성 요소를 등록
ChartJS.register(
	Title,
	Tooltip,
	Legend,
	BarElement,
	CategoryScale,
	LinearScale,
);

export default {
	name: 'BarChart',
	props: {
		data: {
			type: Object,
			required: true,
		},
		options: {
			type: Object,
			required: true,
		},
	},
	components: {
		Bar,
	},
};
</script>
