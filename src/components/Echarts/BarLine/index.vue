<template>
	<div class="bar-list">
		<div class="bar-chart">
			<div ref="chartBarList" class="chart-wrap" :style="{ height: height, width: width }" />
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
import { caseList, caseStatistics } from '@/api/index';
import { dic_Category } from '@/api/dic';
import { Message } from '@arco-design/web-vue';
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

const chartBarList = ref();

const state: any = reactive({
	chart: null,
});

// 数据
const dataAll: any = ref([]);
const head: any = [
	{ text: '类型', width: 60, },
	{ text: '内容', width: 180, },
	{ text: '时间', width: 80, },
	{ text: '接警人', width: 60, },
];
const table: any = ref([]);
const typeList: any = ref([]);
const checkType = (type: string): string => {
	return typeList.value.find((s: any) => s.key === type)?.value || '未知';
}
// 统计
const fetchStatData = async () => {
	return await caseStatistics({}).then((res: any) => {
		if (res.code === 200) {
			dataAll.value = res.rows.map((s: any) => {
				return { name: s.key.slice(5).replace('-', '/'), value: s.value }
			});
		} else {
			Message.error(res.msg)
		}
	}).catch(err => {
		console.log(err)
	})
}
// 字典
const fetchDicData = async () => {
	return await dic_Category({}).then((res: any) => {
		if (res.code = 200) {
			typeList.value = res.data.map((s: any) => {
				return { key: s.dictValue, value: s.dictLabel }
			});
		} else {
			Message.error(res.msg)
		}
	}).catch(err => {
		console.log(err)
	})
}
// 列表
const fetchData = async () => {
	return await caseList({}).then((res: any) => {
		if (res.code === 200) {
			table.value = res.rows.map((s: any) => {
				return {
					name: s.caseReceiverName,
					content: s.caseContent,
					time: s.caseArlarmTime,
					typeName: checkType(s.caseCategoryCode),
				}
			});
			initChart();
		} else {
			Message.error(res.msg)
		}
	}).catch(err => {
		console.log(err)
	})
}


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

onMounted(async () => {
	fetchStatData();
	await fetchDicData();
	await fetchData();
	// initChart();
});

onBeforeUnmount(() => {
	if (!state.chart) {
		return
	}
	state.chart.dispose()
	state.chart = null
});

const initChart = () => {
	const chartEle: HTMLElement = chartBarList.value as HTMLElement;
	const chart = init(chartEle);
	const option: EChartsOption = {
		animation: true,
		animationEasing: 'cubicInOut',
		animationDuration: 1000,
		grid: {
			top: 15,
			bottom: -20,
			right: -10,
			left: 10,
			containLabel: true,
		},
		xAxis: {
			show: false,
		},
		yAxis: [
			{
				show: false,
				data: getArrByKey(dataAll.value, "name"),
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
				data: getArrByKey(dataAll.value, "value"),
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
					align: "right",
					margin: 0,
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
				data: dataAll.value,
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
				data: getArrByKey(dataAll.value, "value"),
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
