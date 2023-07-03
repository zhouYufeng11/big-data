<template>
	<div ref="chartLine" class="chart-wrap" :style='{ height: height, width: width }' />
</template>

<script setup lang='ts'>
import * as echarts from 'echarts';
import { EChartsOption, init } from 'echarts';
import { onMounted, reactive, onBeforeUnmount, ref } from 'vue';
import { carTrackStatistics } from '@/api/index';
import { Message } from '@arco-design/web-vue';

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

let nameList: string[] = [];
let xLabel: string[] = [];

// 组装 series item
let seriesItem = (nameList: string[], rows: any) => {
	let seriesList: any = nameList.map((s: any, i: number) => {
		if (i === 0) {
			xLabel = rows[s].map((k: any) => k.trackDate.slice(5).replace('-', '/'));
		}
		return {
			name: s,
			type: 'line',
			symbol: 'circle',
			showAllSymbol: true,
			symbolSize: 0,
			smooth: true,
			lineStyle: { width: 2 },
			itemStyle: { borderWidth: 1 },
			data: rows[s].map((k: any) => k.trackCount),
		}
	});
	return seriesList;
}

// 列表
const fetchData = async () => {
	return await carTrackStatistics({}).then((res: any) => {
		if (res.code === 200) {
			nameList = Object.keys(res.rows);
			let seriesList: any = seriesItem(nameList, res.rows);
			initChart(seriesList);
		} else {
			Message.error(res.msg)
		}
	}).catch(err => {
		console.log(err)
	})
}

onMounted(() => {
	fetchData();
});

onBeforeUnmount(() => {
	if (!state.chart) {
		return
	}
	state.chart.dispose()
	state.chart = null
});


const initChart = (seriesList: []) => {

	const chartEle: HTMLElement = chartLine.value as HTMLElement;
	const chart = init(chartEle);
	const option: EChartsOption = {
		animation: true,
		animationEasing: 'linear',
		animationDuration: 2000,
		colors: ['rgba(25,163,223,1)', 'rgba(10,219,250,1)', 'rgba(26,220,109,1)', 'rgba(250,199,37,1)', 'rgba(255,70,108,1)'],
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
			data: nameList
		},
		grid: {
			top: '20%',
			left: 50,
			right: 30,
			bottom: 20,
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
				padding: 10,
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
		series: seriesList
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