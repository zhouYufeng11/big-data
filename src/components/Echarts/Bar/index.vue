<template>
	<div class="bar-news">
		<div class="news-line">
			<div class="news-line-item" v-for="(v, i) in lineNews" :key="'lineNews' + i" @click="jumpTo(v.url)">
				<p class="content">{{ v.text }}</p>
			</div>
		</div>
		<div id="chartBar" class="chart-wrap" :style="{ height: height, width: width }" />
	</div>
</template>

<script setup lang='ts'>
import * as echarts from 'echarts';
import { EChartsOption, init } from 'echarts';
import { onMounted, reactive, onBeforeUnmount, ref } from 'vue';

const props = defineProps({
	width: {
		type: String,
		default: '480px'
	},
	height: {
		type: String,
		default: '155px'
	}
});

const state: any = reactive({
	chart: null,
});

const lineNews: any = ref([
	{ text: '泰兴市为侨服务法律顾问团律师通讯录', url: 'http://www.jstzql.com/case/2015/129/151291556530GF2C81GK6F6AJBIEA76.html' },
	{ text: '科贝律师事务所链接及简介', url: 'http://www.jstzql.com/case/2015/129/151291556530GF2C81GK6F6AJBIEA76.html' },
	{ text: '海陵区为侨服务法律顾问团律师通讯录', url: 'http://www.jstzql.com/case/2015/129/151291556530GF2C81GK6F6AJBIEA76.html' },
	{ text: '锋卫律师事务所链接及简介', url: 'http://www.jstzql.com/case/2015/129/151291556530GF2C81GK6F6AJBIEA76.html' },
	{ text: '高港区为侨服务法律顾问团律师通讯录', url: 'http://www.jstzql.com/case/2015/129/151291556530GF2C81GK6F6AJBIEA76.html' },
	{ text: '卫律师事务所网站链接 ', url: 'http://www.jstzql.com/case/2015/129/151291556530GF2C81GK6F6AJBIEA76.html' },
]);

const jumpTo = (url: string): void => {
	window.open(url, '_blank');
}

// 数据
let dataAll: any = [
	{ name: "1月", value: 70 },
	{ name: "2月", value: 120 },
	{ name: "3月", value: 80 },
	{ name: "4月", value: 100 },
	{ name: "5月", value: 90 },
	{ name: "6月", value: 110 },
];

let nameList: any = [];
let seriesData: any = [];
dataAll.forEach((item: any) => {
	nameList.push(item.name);
	seriesData.push(item.value);
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
	const chartEle: HTMLElement = document.getElementById('chartBar') as HTMLElement;
	const chart = init(chartEle);
	const option: EChartsOption = {
		animation: true,
		animationEasing: 'elasticOut',
		animationDuration: 5000,
		title: {
			text: "咨询次数",
			top: 0,
			left: 10,
			textStyle: {
				color: "#fff",
				fontSize: 14,
			},
		},
		grid: {
			top: "30%",
			bottom: "22%",
		},
		xAxis: {
			min: 0,
			data: nameList,
			axisLabel: {
				color: 'rgba(122,173,212,1)',
				fontSize: 14,
				margin: 20,
			},
			axisLine: {
				show: true, //不显示x轴
				lineStyle: {
					color: 'rgba(53,65,95,1)',
				}
			},
			axisTick: {
				show: false //不显示刻度
			},
			boundaryGap: true,
			splitLine: {
				show: false
			}
		},
		yAxis: {
			splitNumber: 3,
			splitLine: {
				show: true,
				lineStyle: {
					color: 'rgba(53,65,95,1)',
					type: 'dashed'
				}
			},
			axisTick: {
				show: false
			},
			axisLine: {
				show: false
			},
			axisLabel: {
				color: 'rgba(122,173,212,1)',
				fontSize: 12
			}
		},
		series: [
			{
				name: "柱顶部",
				type: "pictorialBar",
				symbolSize: [26, 10],
				symbolOffset: [0, -5],
				z: 12,
				itemStyle: {
					color: 'rgba(91, 252, 244, .6)',
				},
				label: {
					show: true,
					position: "top",
					fontSize: 14,
					color: 'rgba(91, 252, 244, 1)',
				},
				symbolPosition: "end",
				data: seriesData,
			},
			{
				name: "柱底部",
				type: "pictorialBar",
				symbolSize: [26, 10],
				symbolOffset: [0, 5],
				z: 12,
				itemStyle: {
					color: 'rgba(91, 252, 244, .8)',
				},
				data: seriesData,
			},
			// 扩散圆
			{
				name: '扩散圆',
				tooltip: {
					show: false,
				},
				type: 'effectScatter',
				// coordinateSystem: 'geo',
				rippleEffect: {
					color: 'rgba(91, 252, 244, 1)',
					scale: 3,
					brushType: 'stroke',
				},
				showEffectOn: 'render',
				itemStyle: {
					color: 'transparent',
					shadowColor: 'rgba(91, 252, 244, .6)',
				},
				label: {
					show: false,
				},
				symbol: 'circle',
				symbolSize: [26, 10],
				symbolOffset: [0, 0],
				data: new Array(seriesData.length).fill(0),
				z: 12,
				silent: true,
			},
			{
				type: "bar",
				itemStyle: {
					color: (params: any) => {
						return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
							{
								offset: 0,
								color: 'rgba(91, 252, 244, .1)',
							},
							{
								offset: 1,
								color: 'rgba(91, 252, 244, .8)',
							},
						]);
					},
					opacity: 0.8,
				},
				z: 16,
				silent: false,
				barWidth: 26,
				barGap: "-100%", // Make series be overlap
				data: seriesData,
			},

		],
	};
	option && chart.setOption(option);
}
</script>

<style lang="scss" scoped>
.bar-news {
	padding-left: 10px;

	.chart-wrap {
		width: auto;
		height: auto;
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
}
</style>