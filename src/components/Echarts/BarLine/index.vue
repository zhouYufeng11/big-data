<template>
	<div class="bar-list">
		<div class="bar-chart">
			<div id="chartBarList" class="chart-wrap" :style="{ height: height, width: width }" />
		</div>
		<!-- 表格 -->
		<div class="bar-table-box">
			<WarningTable :head="head" :list="table" />
		</div>
	</div>
</template>

<script setup lang='ts'>
import * as echarts from 'echarts';
import { EChartsOption, init } from 'echarts';
import { onMounted, reactive, onBeforeUnmount, ref } from 'vue';
import WarningTable from '@/components/WarningTable/index.vue';

const props = defineProps({
	width: {
		type: String,
		default: '180px'
	},
	height: {
		type: String,
		default: '255px'
	}
});

const state: any = reactive({
	chart: null,
});

const head: any = [
	{ text: '类型', width: 100, },
	{ text: '内容', width: 150, },
	{ text: '时间', width: 80, },
	{ text: '接警人', width: 60, },
];
const table: any = [
	{ name: '陈程', content: '三水小区入室盗窃案涉案金额20w', time: '2023/05/06', type: 1, },
	{ name: '王可可', content: '三水小区入室盗窃案涉案金额20w', time: '2023/05/06', type: 2, },
	{ name: '陈国富', content: '三水小区入室盗窃案涉案金额20w', time: '2023/05/06', type: 3, },
	{ name: '李建军', content: '三水小区入室盗窃案涉案金额20w', time: '2023/05/06', type: 3, },
	{ name: '王菲', content: '三水小区入室盗窃案涉案金额20w', time: '2023/05/06', type: 4, },
	{ name: '李尚', content: '三水小区入室盗窃案涉案金额20w', time: '2023/05/06', type: 4, },
	{ name: '费婉', content: '三水小区入室盗窃案涉案金额20w', time: '2023/05/06', type: 1, },
	{ name: '赵飞羽', content: '三水小区入室盗窃案涉案金额20w', time: '2023/05/06', type: 1, },
	{ name: '孙建锋', content: '三水小区入室盗窃案涉案金额20w', time: '2023/05/06', type: 1, },
];

// 数据
let dataAll: any = [
	{ name: "07.05", value: 63 },
	{ name: "07.04", value: 46 },
	{ name: "07.03", value: 42 },
	{ name: "07.02", value: 32 },
	{ name: "07.01", value: 58 },
	{ name: "06.30", value: 70 },
	{ name: "06.29", value: 82 },
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

// dataAll = dataAll.sort((a: any, b: any) => {
// 	return b.value - a.value;
// });

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
		animationEasing: 'cubicInOut',
		animationDuration: 1000,
		grid: {
			top: 15,
			bottom: -20,
			right: 10,
			left: 10,
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
					margin: -15,
					verticalAlign: "bottom",
					lineHeight: 25,
					fontSize: 12,
				},
			},
		],
		series: [
			{
				name: "数量",
				type: "bar",
				showBackground: true,
				backgroundStyle: {
					color: '#013159',
					borderRadius: 4,
				},
				yAxisIndex: 1,
				data: dataAll,
				barWidth: 8,
				// barGap: 20,
				itemStyle: {
					borderRadius: 4,
					color: (params: any) => {
						return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
							{
								offset: 0,
								color: 'rgba(108,155,255,0)',
							},
							{
								offset: 1,
								color: 'rgba(13,245,255,1)',
							},
						]);
					},
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
			{
				name: "外圆",
				type: "effectScatter",
				emphasis: {
					scale: false
				},
				itemStyle: {
					color: "rgba(85,255,247,1)",
					shadowColor: 'rgba(91, 252, 244, .6)',
					shadowBlur: 6,
					borderWidth: 1,
					opacity: 1,
				},
				rippleEffect: {
					color: 'rgba(91, 252, 244, 1)',
					scale: 3,
					brushType: 'stroke',
				},
				showEffectOn: 'render',
				symbolSize: 10,
				symbol: 'circle',
				symbolOffset: [0, -0.2],
				yAxisIndex: 1,
				data: getArrByKey(dataAll, "value"),
				animationDelay: 500,
				animationDuration: 500
			},
		],
	};
	option && chart.setOption(option);
}
</script>

<style lang="scss" scoped>
.bar-list {
	padding: 0 20px;
	display: flex;
}

.bar-chart {
	position: relative;
}

.chart-wrap {
	width: auto;
	height: auto;
}
</style>
