<template>
	<div class="bar-list">
		<div class="bar-chart">
			<div id="chartBarList" class="chart-wrap" :style="{ height: height, width: width }" />
			<div class="ranking">
				<p class="ranking-item">TOP1</p>
				<p class="ranking-item">TOP2</p>
				<p class="ranking-item">TOP3</p>
			</div>
		</div>
		<!-- 表格 -->
		<div class="bar-table-box">
			<ConTable :head="head" :list="table" />
		</div>
	</div>
</template>

<script setup lang='ts'>
import * as echarts from 'echarts';
import { EChartsOption, init } from 'echarts';
import { onMounted, reactive, onBeforeUnmount, ref } from 'vue';
import ConTable from '@/components/ConTable/index.vue';

const props = defineProps({
	width: {
		type: String,
		default: '394px'
	},
	height: {
		type: String,
		default: '140px'
	}
});

const state: any = reactive({
	chart: null,
});

const head: any = [
	{ text: '排名', width: 50, },
	{ text: '姓名', width: 80, },
	{ text: '捐款项目', width: 150, },
	{ text: '捐款项目', width: 100, },
];
const table: any = [
	{ name: '景甜甜', project: '抗击新冠疫情肺炎', money: '1200w' },
	{ name: '陈程', project: '抗击新冠疫情肺炎', money: '1000w' },
	{ name: '王可可', project: '抗击新冠疫情肺炎', money: '900w' },
	{ name: '陈国富', project: '抗击新冠疫情肺炎', money: '800w' },
	{ name: '李建军', project: '抗击新冠疫情肺炎', money: '600w' },
	{ name: '王菲', project: '抗击新冠疫情肺炎', money: '500w' },
	{ name: '李尚', project: '抗击新冠疫情肺炎', money: '400w' },
	{ name: '费婉', project: '抗击新冠疫情肺炎', money: '300w' },
	{ name: '赵飞羽', project: '抗击新冠疫情肺炎', money: '200w' },
	{ name: '孙建锋', project: '抗击新冠疫情肺炎', money: '100w' },
];

// 数据
let dataAll: any = [
	{
		name: "景甜甜",
		value: 92853,
	},
	{
		name: "王无双",
		value: 85417,
	},
	{
		name: "廖兴凡",
		value: 75214,
	},
];
let getArrByKey = (data: any, k: any) => {
	let key = k || "value";
	let res: any = [];
	if (data) {
		data.forEach((t: any) => {
			res.push(t[key]);
		});
	}
	return res;
};

dataAll = dataAll.sort((a: any, b: any) => {
	return b.value - a.value;
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

const initChart = () => {
	const chartEle: HTMLElement = document.getElementById('chartBarList') as HTMLElement;
	const chart = init(chartEle);
	const option: EChartsOption = {
		animation: true,
		animationEasing: 'elasticOut',
		animationDuration: 5000,
		grid: {
			top: 10,
			bottom: 20,
			right: 0,
			left: 70,
			containLabel: true,
		},
		xAxis: {
			show: false,
		},
		yAxis: [
			{
				show: false,
				data: getArrByKey(dataAll, "name"),
				axisLine: {
					show: false,
				},
				splitLine: {
					show: false,
				},
				axisTick: {
					show: false,
				},
				axisLabel: {
					show: false,
				},
			},
			{
				triggerEvent: true,
				show: true,
				inverse: true,
				data: getArrByKey(dataAll, "value"),
				axisLine: {
					show: false,
				},
				splitLine: {
					show: false,
				},
				axisTick: {
					show: false,
				},
				axisLabel: {
					interval: 0,
					color: "#fff",
					align: "left",
					margin: -30,
					verticalAlign: "bottom",
					lineHeight: 25,
					fontSize: 12,
				},
			},
		],
		series: [
			{
				name: "条",
				type: "bar",
				showBackground: true,
				backgroundStyle: {
					color: '#15346a'
				},
				yAxisIndex: 1,
				data: dataAll,
				barWidth: 5,
				itemStyle: {
					color: '#227dd3',
				},
				label: {
					color: "#fff",
					show: true,
					position: [0, -15],
					fontSize: 12,
					formatter: (params: any) => {
						return params.name
					}
				},
			},
		],
	};
	option && chart.setOption(option);
}
</script>

<style lang="scss" scoped>
.bar-list {
	padding: 0 20px;
}

.bar-table-box {
	margin-top: -40px;
}

.bar-chart {
	position: relative;

	.ranking {
		position: absolute;
		left: 0;
		top: 0;
		width: 60px;
		text-align: center;

		.ranking-item {
			margin: 8.5px 0;
			height: 20px;
			line-height: 20px;
			border-top-left-radius: 17px;
			border-bottom-left-radius: 17px;
			font-size: 12px;

			&:nth-child(1) {
				background: linear-gradient(to right, rgba(207, 39, 163, 1), rgba(207, 39, 163, .1));
			}

			&:nth-child(2) {
				background: linear-gradient(to right, rgba(60, 67, 184, 1), rgba(60, 67, 184, .1));
			}

			&:nth-child(3) {
				background: linear-gradient(to right, rgba(43, 140, 215, 1), rgba(43, 140, 215, .1));
			}
		}
	}
}

.chart-wrap {
	width: auto;
	height: auto;
}
</style>
