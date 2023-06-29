<template>
	<div id="chartServicePie" class="chart-wrap" :style='{ height: height, width: width }' />
</template>

<script setup lang='ts'>
import * as echarts from 'echarts';
import { EChartsOption, init } from 'echarts';
import { onMounted, reactive, onBeforeUnmount, ref } from 'vue';

const props = defineProps({
	width: {
		type: String,
		default: '180px'
	},
	height: {
		type: String,
		default: '200px'
	},
})

const state: any = reactive({
	chart: null,
});

let timer: any = null;

onMounted(() => {
	initChart();
});

onBeforeUnmount(() => {
	if (!state.chart) {
		return
	}
	state.chart.dispose();
	state.chart = null;
	clearInterval(timer);
	timer = null;
});

var dataAll: any = [
	{ name: '已解决', value: 888 },
	{ name: '未解决', value: 666 },
];

var iconUrl = 'https://resource.jszhuiming.com/overseas/cir.png';

var numArr = dataAll.map((item: any) => item.value);
var maxNum = Math.max(...numArr);
var maxArr: any = [];
dataAll.forEach((item: any) => {
	maxArr.push(maxNum);
});
var generateDotted = (color?: string) => {
	var dataArr = [];
	for (var i = 0; i < 100; i++) {
		if (i % 2 === 0) {
			dataArr.push({
				name: (i + 1).toString(),
				value: 25,
				itemStyle: {
					color: color,
					borderWidth: 0,
					borderColor: "rgba(0,0,0,0)"
				}
			})
		} else {
			dataArr.push({
				name: (i + 1).toString(),
				value: 20,
				itemStyle: {
					color: "rgba(0,0,0,0)",
					borderWidth: 0,
					borderColor: "rgba(0,0,0,0)"
				}
			})
		}
	}
	return dataArr
}
const color = [
	new echarts.graphic.LinearGradient(0, 1, 0, 0, [
		{
			offset: 0,
			color: '#114be2',
		},
		{
			offset: 1,
			color: '#3e88e2',
		},
	]),
	new echarts.graphic.LinearGradient(0, 1, 0, 0, [
		{
			offset: 0,
			color: '#d75f42',
		},
		{
			offset: 1,
			color: '#d34791',
		},
	]),
];

const initChart = () => {

	const chartEle: HTMLElement = document.getElementById("chartServicePie") as HTMLElement;
	const chart = init(chartEle);
	const option: EChartsOption = {
		animation: true,
		animationEasing: 'elasticOut',
		animationDuration: 5000,
		color: color,
		grid: {
			top: 0,
			left: 0,
			right: '1%',
			bottom: 5,
			containLabel: true,
		},
		tooltip: {
			show: true
		},
		legend: {
			right: '15%',
			top: '5%',
			icon: 'rect',
			itemWidth: 15,
			itemHeight: 15,
			data: ['已解决', '未解决'],
			textStyle: {
				color: '#8dbee9',
				fontSize: 14,
				lineHeight: 20
			},
			itemStyle: {
				borderWidth: 2,
				borderColor: '#4490e2'
			},
		},
		graphic: {// 图形中间图片
			elements: [{
				type: "image",
				style: {
					image: iconUrl,//你的图片地址
					width: 54,
					height: 55,
				},
				left: "center",
				top: "45%",
			}],
		},
		series: [{
			name: '',
			type: 'pie',
			startAngle: 270,
			z: 3,
			center: ['50%', '60%'],
			radius: ['55%', '65%'],
			label: {
				show: false,
			},
			labelLine: {
				show: false,
			},
			itemStyle: {
				borderWidth: 8,
				borderRadius: 20,
			},
			data: dataAll
		},
		{
			name: "外圆虚线",
			type: 'pie',
			startAngle: 270,
			z: 1,
			tooltip: {
				show: false,
			},
			silent: true,
			center: ['50%', '60%'],
			radius: ['78%', '77%'],
			label: {
				show: false
			},
			labelLine: {
				show: false
			},
			itemStyle: {
				color: '#4490e2',
			},
			emphasis: {
				disabled: true,
			},
			data: generateDotted()
		},
		],
	};

	option && chart.setOption(option);
	setTimeout(() => {
		timer = setInterval(() => {
			let option: any = chart.getOption();
			option.series[1].startAngle = option.series[1].startAngle - 3;
			chart.setOption(option);
		}, 100);
	}, 2000);
}
</script>

<style lang="scss" scoped>
.chart-wrap {
	width: auto;
	height: auto;
}
</style>