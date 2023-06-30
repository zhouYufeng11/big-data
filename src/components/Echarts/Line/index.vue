<template>
	<div ref="chartLine" class="chart-wrap" :style='{ height: height, width: width }' />
</template>

<script setup lang='ts'>
import * as echarts from 'echarts';
import { EChartsOption, init } from 'echarts';
import { onMounted, reactive, onBeforeUnmount, ref } from 'vue';

const props = defineProps({
	width: {
		type: String,
		default: '630px'
	},
	height: {
		type: String,
		default: '193px'
	},
})

const chartLine = ref();

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

let xLabel = ['6.28', '6.29', '6.30', '7.1', '7.2', '7.5'];
let car1 = ["2040", "2060", "2022", "2085", "2050", "2040", '2033', '2011', '2023', '2043', '2054', '2066'];
let car2 = ["2020", "2050", "2012", "2065", "2040", "2060", '2076', '2045', '2087', '2045', '2023', '2021'];
let car3 = ["1520", "2085", "2011", "2060", "2030", "2045", '2076', '2045', '2030', '2087', '2066', '2021'];
let car4 = ["920", "2040", "2012", "2043", "2070", "2060", '2076', '2045', '2087', '2034', '2023', '2050'];
let car5 = ["2020", "2050", "2000", "2065", "2034", "2060", '2076', '2030', '2087', '2066', '2023', '2021'];


const initChart = () => {

	const chartEle: HTMLElement = chartLine.value as HTMLElement;
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
			show: true,
			left: 'center',
			top: 5,
			itemWidth: 20,
			itemHeight: 14,
			itemGap: 20,
			textStyle: {
				color: '#fff',
				lineHeight: 15,
			},
			data: [
				{ name: '轿车' },
				{ name: '面包车' },
				{ name: '货车' },
				{ name: '小货车' },
				{ name: '大型客车' },
			]
		},
		grid: {
			top: '20%',
			left: 50,
			right: 30,
			bottom: 30,
			containLabel: true
		},
		xAxis: [{
			type: 'category',
			boundaryGap: false,
			axisLine: { //坐标轴轴线相关设置。数学上的x轴
				show: false,
			},
			axisLabel: { //坐标轴刻度标签的相关设置
				color: '#7ec7ff',
				padding: 12,
				fontSize: 14,
				formatter: (data: any) => {
					return data
				}
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
			min: 2000,
			splitLine: {
				show: true,
				lineStyle: {
					color: '#192a44'
				},
			},
			axisLine: {
				show: false,
			},
			axisLabel: {
				show: true,
				color: '#7ec7ff',
				padding: 16
			},
			axisTick: {
				show: false,
			},
		}],
		series: [{
			name: '轿车',
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
				color: "rgba(25,163,223,1)",
				borderColor: "rgba(25,163,223,1)",
				borderWidth: 1
			},
			// areaStyle: { //区域填充样式
			// 	//线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
			// 	color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
			// 		offset: 0,
			// 		color: "rgba(25,163,223,.3)"
			// 	},
			// 	{
			// 		offset: 1,
			// 		color: "rgba(25,163,223, 0)"
			// 	}
			// 	], false),
			// 	shadowColor: 'rgba(25,163,223, 0.5)', //阴影颜色
			// 	shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
			// },
			data: car1
		}, {
			name: '面包车',
			type: 'line',
			symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
			showAllSymbol: true,
			symbolSize: 0,
			smooth: true,
			lineStyle: {
				width: 2,
				color: "rgba(10,219,250,1)", // 线条颜色
				// borderColor: 'rgba(0,0,0,.4)',
			},
			itemStyle: {
				color: "rgba(10,219,250,1)",
				borderColor: "rgba(10,219,250,1)",
				borderWidth: 1
			},
			// areaStyle: { //区域填充样式
			// 	//线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
			// 	color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
			// 		offset: 0,
			// 		color: "rgba(10,219,250,.3)"
			// 	},
			// 	{
			// 		offset: 1,
			// 		color: "rgba(10,219,250, 0)"
			// 	}
			// 	], false),
			// 	shadowColor: 'rgba(10,219,250, 0.5)', //阴影颜色
			// 	shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
			// },
			data: car2
		}, {
			name: '货车',
			type: 'line',
			symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
			showAllSymbol: true,
			symbolSize: 0,
			smooth: true,
			lineStyle: {
				width: 2,
				color: "rgba(26,220,109,1)", // 线条颜色
				// borderColor: 'rgba(0,0,0,.4)',
			},
			itemStyle: {
				color: "rgba(26,220,109,1)",
				borderColor: "rgba(26,220,109,1)",
				borderWidth: 1
			},
			// areaStyle: { //区域填充样式
			// 	//线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
			// 	color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
			// 		offset: 0,
			// 		color: "rgba(26,220,109,.3)"
			// 	},
			// 	{
			// 		offset: 1,
			// 		color: "rgba(26,220,109,0)"
			// 	}
			// 	], false),
			// 	shadowColor: 'rgba(10,219,250, 0.5)', //阴影颜色
			// 	shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
			// },
			data: car3
		}, {
			name: '小货车',
			type: 'line',
			symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
			showAllSymbol: true,
			symbolSize: 0,
			smooth: true,
			lineStyle: {
				width: 2,
				color: "rgba(250,199,37,1)", // 线条颜色
				// borderColor: 'rgba(0,0,0,.4)',
			},
			itemStyle: {
				color: "rgba(250,199,37,1)",
				borderColor: "rgba(250,199,37,1)",
				borderWidth: 1
			},
			// areaStyle: { //区域填充样式
			// 	//线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
			// 	color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
			// 		offset: 0,
			// 		color: "rgba(250,199,37,.3)"
			// 	},
			// 	{
			// 		offset: 1,
			// 		color: "rgba(250,199,37,0)"
			// 	}
			// 	], false),
			// 	shadowColor: 'rgba(10,219,250, 0.5)', //阴影颜色
			// 	shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
			// },
			data: car4
		}, {
			name: '大型客车',
			type: 'line',
			symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
			showAllSymbol: true,
			symbolSize: 0,
			smooth: true,
			lineStyle: {
				width: 2,
				color: "rgba(255,70,108,1)", // 线条颜色
				// borderColor: 'rgba(0,0,0,.4)',
			},
			itemStyle: {
				color: "rgba(255,70,108,1)",
				borderColor: "rgba(255,70,108,1)",
				borderWidth: 1
			},
			// areaStyle: { //区域填充样式
			// 	//线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
			// 	color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
			// 		offset: 0,
			// 		color: "rgba(255,70,108,.3)"
			// 	},
			// 	{
			// 		offset: 1,
			// 		color: "rgba(255,70,108,0)"
			// 	}
			// 	], false),
			// 	shadowColor: 'rgba(10,219,250, 0.5)', //阴影颜色
			// 	shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
			// },
			data: car5
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