<template>
	<div id="chartBotLine" class="chart-wrap" :style='{ height: height, width: width }' />
</template>

<script setup lang='ts'>
import * as echarts from 'echarts';
import { EChartsOption, init } from 'echarts';
import { onMounted, reactive, onBeforeUnmount, ref } from 'vue';

const props = defineProps({
	width: {
		type: String,
		default: '895px'
	},
	height: {
		type: String,
		default: '240px'
	},
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
});

let xLabel = ['美国', '英国', '俄罗斯', '意大利', '法国', '德国', '澳大利亚', '波兰'];
let goToSchool = ["104", "106", "102", "108", "105", "104", '103', '101'];
let goOutSchool = ["102", "105", "101", "106", "103", "106", '107', '104'];

const initChart = () => {

	const chartEle: HTMLElement = document.getElementById("chartBotLine") as HTMLElement;
	const chart = init(chartEle);
	const option: EChartsOption = {
		animation: true,
		animationEasing: 'linear',
		animationDuration: 2000,
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				lineStyle: {
					color: {
						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [{
							offset: 0,
							color: 'rgba(126,199,255,0)' // 0% 处的颜色
						}, {
							offset: 0.5,
							color: 'rgba(126,199,255,1)' // 100% 处的颜色
						}, {
							offset: 1,
							color: 'rgba(126,199,255,0)' // 100% 处的颜色
						}],
						global: false // 缺省为 false
					}
				},
			},
		},
		legend: {
			show: false,
		},
		grid: {
			top: '20%',
			left: 70,
			right: 20,
			bottom: '15%',
			// containLabel: true
		},
		xAxis: [{
			type: 'category',
			boundaryGap: true,
			axisLabel: { //坐标轴刻度标签的相关设置
				color: '#7ec7ff',
				padding: 5,
				fontSize: 14,
			},
			axisLine: {
				show: true,
				lineStyle: {
					opacity: 0.5,
					color: '#00f0ff',
				},
			},
			splitLine: {
				show: false,
			},
			axisTick: {
				show: false,
			},
			data: xLabel
		}],
		yAxis: [{
			name: "万人",
			min: 100,
			splitNumber: 3,
			nameTextStyle: {//y轴上方单位的颜色
				color: '#7ec7ff',
				align: 'right',
			},
			axisTick: {
				show: false,
			},
			axisLabel: {
				color: '#7ec7ff',
				fontSize: 12,
				formatter: "{value}",
			},
			splitLine: {
				show: true,
				lineStyle: {
					type: 'dashed',
					width: 1,
					opacity: 0.2,
					color: '#45f8ef',
				},
			},
			axisLine: {
				show: true,
				lineStyle: {
					color: '#00f0ff',
				},
			},
		}],
		series: [{
			name: '分布数据',
			type: 'line',
			symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
			showAllSymbol: true,
			symbolSize: 0,
			smooth: true,
			lineStyle: {
				width: 2,
				color: "rgba(25,163,223,1)", // 线条颜色
			},
			// borderColor: 'rgba(0,0,0,.4)',
			itemStyle: {
				color: "#1f8df2",
				borderColor: "#1f8df2",
				borderWidth: 1
			},
			label: {
				show: true,
				color: '#00f0ff'
			},
			areaStyle: { //区域填充样式
				//线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					offset: 0,
					color: "rgba(25,163,223,.3)"
				},
				{
					offset: 1,
					color: "rgba(25,163,223, 0)"
				}
				], false),
				shadowColor: 'rgba(25,163,223, 0.5)', //阴影颜色
				shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
			},
			data: goToSchool
		}]
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