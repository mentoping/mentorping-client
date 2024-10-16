<template>
	<Doughnut :data="data" :options="options" />
</template>

<script>
import { Doughnut } from 'vue-chartjs';
import {
	Chart as ChartJS,
	Title,
	Tooltip,
	Legend,
	ArcElement,
	CategoryScale,
	LinearScale,
} from 'chart.js';

ChartJS.register(
	Title,
	Tooltip,
	Legend,
	ArcElement, // ArcElement는 도넛 차트를 위한 구성 요소입니다.
	CategoryScale,
	LinearScale,
);

export default {
	name: 'DoughnutChart',
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
		Doughnut,
	},
};
</script>
