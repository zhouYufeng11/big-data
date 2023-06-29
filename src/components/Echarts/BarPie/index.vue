<template>
	<div id='chartBarPie' class='chart-wrap' :style='{ height: height, width: width }' />
</template>

<script setup lang='ts'>
import * as echarts from 'echarts';
import { EChartsOption, init } from 'echarts';
import { onMounted, reactive, onBeforeUnmount, ref } from 'vue';

const props = defineProps({
	width: {
		type: String,
		default: '460px'
	},
	height: {
		type: String,
		default: '245px'
	}
})

const state: any = reactive({
	chart: null,
});

onMounted(() => {
	initChart();
});

onBeforeUnmount(() => {
	if (!state.chart) {
		return
	}
	state.chart.dispose()
	state.chart = null
})
var category = [
	"一季度",
	"二季度",
	"三季度",
	"四季度",
];
var barData = [{
	"name": "关注数",
	"color": "#1f8df2",
	"value": [
		4000,
		3000,
		5000,
		3500
	]
},
{
	"name": "互动数",
	"color": "#27d1d5",
	"value": [
		500,
		800,
		1000,
		600
	]
}
]
let seriesData: any = barData.map((d, i) => {
	let arr = []
	if (i > 0) {
		let before = barData[i - 1]
		arr = d.value.map((v, j) => {
			let res = v
			res += before.value[j]
			d.value[j] = res
			return res
		})
	} else {
		arr = d.value
	}
	return {
		name: d.name,
		data: arr,
		type: 'pictorialBar',
		symbol: 'rect',
		symbolSize: [20, 10],
		symbolMargin: 3,
		barWidth: 10,
		// emphasis: {
		// 	focus: 'series',
		// 	blurScope: 'coordinateSystem'
		// },
		itemStyle: {
			borderRadius: 10,
			color: d.color,
		},
		// label: {
		// 	show: true,
		// 	borderRadius: 0,
		// 	position: 'top',
		// 	fontSize: 14,
		// 	color: '#fff',
		// 	formatter: (p: any) => {
		// 		return p.value > 0 ? p.value : '';
		// 	},
		// },

		stack: 'all',
		symbolRepeat: true,
		z: -i
	}
});
const colorArr = ['#49CCFFee', '#20D3ABee', '#FDD56Aee'];
const colorAlpha = ['#49CCFF88', '#20D3AB88', '#FDD56A88'];
const piedata = [{
	name: '关注数',
	value: 15500,
	itemStyle: {
		borderWidth: 5,
		shadowBlur: 20,
		borderColor: colorAlpha[0],
		shadowColor: colorArr[0],
		color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
			{
				offset: 0,
				color: colorArr[0],
			},
			{
				offset: 1,
				color: colorAlpha[0],
			},
		])
	}
},
{
	name: '互动数',
	value: 2900,
	itemStyle: {
		borderWidth: 5,
		shadowBlur: 20,
		borderColor: colorAlpha[1],
		shadowColor: colorArr[1],
		color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
			{
				offset: 0,
				color: colorArr[1],
			},
			{
				offset: 1,
				color: colorAlpha[1],
			},
		])
	}
}
];

const initChart = () => {

	const chartEle: HTMLElement = document.getElementById('chartBarPie') as HTMLElement;
	const chart = init(chartEle);
	const option: EChartsOption = {
		animation: true,
		animationEasing: 'elasticOut',
		animationDuration: 5000,
		legend: {
			show: true,
			left: 20,
			top: 20,
			itemWidth: 14,
			itemHeight: 14,
			itemGap: 20,
			data: barData.map((d) => d.name),
			textStyle: {
				color: '#fff',
				lineHeight: 15,
			}
		},
		grid: {
			top: 80,
			left: 250,
			right: 0,
			bottom: 50
		},
		tooltip: {
			backgroundColor: '#19346f',
			formatter: '{b}<br />{a}: {c}',
			textStyle: {
				fontSize: 14,
				color: '#fff'
			}
		},
		xAxis: {
			data: category,
			show: true,
			axisLabel: {
				interval: 0,
				color: '#fff',
				formatter: (value: any, index: number) => {
					return [
						'{national|}',
						'{title|' + value + '}'
					].join('\n')
				},
				rich: {
					title: {
						color: '#eee',
						align: 'center',
						lineHeight: 0
					},
					national: {
						height: 0,
						lineHeight: 10
					},
				}
			},
			axisLine: {
				show: false
			},
			splitLine: {
				show: false
			},
			axisTick: {
				show: false
			},
		},
		yAxis: {
			show: true,
			splitLine: {
				show: false
			},
			axisLine: {
				show: false
			},
			axisLabel: {
				show: true,
				color: '#ccc'
			}
		},
		series: [{
			type: 'pie',
			z: 1,
			radius: ['20%', '35%'],
			center: [100, '60%'],
			startAngle: 90,
			data: piedata,
			tooltip: {
				trigger: 'item',
				formatter: "{b} : {c}人"
			},
			label: {
				show: true,
				fontSize: 12,
				formatter: "{b}\n{c}",
				fontWeight: 'bolder',
				color: '#fff'
			},
		}, ...seriesData],
	};
	option && chart.setOption(option);
}
</script>

<style lang="scss" scoped>
.chart-wrap {
	width: auto;
	height: auto;
}
</style>