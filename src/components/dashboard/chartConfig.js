// chartConfig.js
export const data = {
	labels: [
		'월요일',
		'화요일',
		'수요일',
		'목요일',
		'금요일',
		'토요일',
		'일요일',
	],
	datasets: [
		{
			label: '최근 일주일 가입자 수',
			backgroundColor: '#f87979',
			borderColor: '#f87979',
			data: [40, 39, 10, 40, 39, 80, 40],
			fill: false,
		},
	],
};

export const options = {
	responsive: true,
	maintainAspectRatio: false,
};
