<template>
	<div id="chartServiceBar" class="chart-wrap" :style="{ height: height, width: width }" />
</template>

<script setup lang='ts'>
import * as echarts from 'echarts';
import { EChartsOption, init } from 'echarts';
import { onMounted, reactive, onBeforeUnmount, ref } from 'vue';

const props = defineProps({
	width: {
		type: String,
		default: '220px'
	},
	height: {
		type: String,
		default: '200px'
	}
});

const state: any = reactive({
	chart: null,
});

var cost = [50, 80, 70, 60] // 绘制
var dataCost = [50, 80, 70, 60] // 数值
var totalCost = [100, 100, 100, 100] // 比例综合
var visits = [100, 100, 100, 100] // 本期占总的百分比*100
var grade = ['法律咨询', '企业经营', '慈善救助', '建言献策']

var dataAll: any = {
	grade: grade,
	cost: cost,
	totalCost: totalCost,
	visits: visits,
	dataCost: dataCost
};


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

const initChart = () => {
	const chartEle: HTMLElement = document.getElementById('chartServiceBar') as HTMLElement;
	const chart = init(chartEle);
	const option: EChartsOption = {
		animation: true,
		animationEasing: 'elasticOut',
		animationDuration: 5000,
		grid: {
			top: 40,
			left: 0,
			right: 0,
			bottom: 0,
			containLabel: true,
		},
		xAxis: [{
			type: 'category',
			axisLabel: {
				show: true,
				interval: 0,
				width: 10,
				color: '#81c3fc',
				fontSize: 12,
				lineHeight: 16,
				formatter: (params: any) => {
					var newParamsName = "";
					var paramsNameNumber = params.length;
					var provideNumber = 2; // 一行显示几个字 然后就超过字数就会自动换行
					var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
					if (paramsNameNumber > provideNumber) {
						for (var p = 0; p < rowNumber; p++) {
							var tempStr = "";
							var start = p * provideNumber;
							var end = start + provideNumber;
							if (p == rowNumber - 1) {
								tempStr = params.substring(start, paramsNameNumber);
							} else {
								tempStr = params.substring(start, end) + "\n";
							}
							newParamsName += tempStr;
						}
					} else {
						newParamsName = params;
					}
					return newParamsName;
				},
			},
			axisTick: {
				show: false,
			},
			axisLine: {
				show: false,
			},
			data: dataAll.grade
		}, {
			type: 'category',
			axisLabel: {
				show: false,
			},
			axisTick: {
				show: false,
			},
			axisLine: {
				show: false,
			},
			data: dataAll.grade
		}],
		yAxis: {
			show: false,
		},
		series: [{
			type: 'bar',
			xAxisIndex: 1,
			label: {
				show: true,
				color: '#81c3fc',
				position: 'top',
				fontSize: 14,
				formatter: (param: any) => {
					return dataAll.dataCost[param.dataIndex] / dataAll.totalCost[param.dataIndex] * 100 + '%';
				}
			},
			barWidth: '50%',
			itemStyle: {
				borderColor: '#3f5482',
				borderWidth: 1,
				borderRadius: 15,
				color: 'transparent'
			},
			z: 1,
			data: dataAll.totalCost,
		}, {
			type: 'bar',
			xAxisIndex: 0,
			barWidth: '30%',
			itemStyle: {
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
					{
						offset: 0,
						color: '#4084d1',
					},
					{
						offset: 1,
						color: '#131c36',
					},
				]),
				borderRadius: 50,
				borderWidth: 0,
				borderColor: '#fff',
			},
			label: {
				show: false,
				color: '#81c3fc',
				position: 'top',
				fontSize: 14,
				formatter: '{c}'
			},
			labelLine: {
				show: false,
			},
			z: 2,
			data: dataAll.cost,
		}]
	};
	option && chart.setOption(option);
}
</script>

<style lang="scss" scoped>
.bar-news {
	padding-left: 10px;
}

.chart-wrap {
	width: auto;
	height: auto;
}

.new-line-item {
	cursor: pointer;
}

.news-line {
	display: flex;
	flex-wrap: wrap;
	padding-top: 10px;
	margin-bottom: 10px;
	text-align: left;

	.news-line-item {
		height: 20px;
		line-height: 20px;
		width: 44%;
		overflow: hidden;
		white-space: nowrap;
		font-size: 12px;
		padding-left: 25px;
		position: relative;
		cursor: pointer;

		&:nth-child(2n) {
			margin-left: 20px;
		}

		&::before {
			content: '';
			position: absolute;
			left: 12px;
			top: 8px;
			height: 4px;
			width: 4px;
			border-radius: 50%;
			background: #fff;
		}

		&:hover {
			color: rgba(67, 229, 253, 1);

			&::before {
				background: rgba(67, 229, 253, 1);
			}
		}
	}
}
</style>