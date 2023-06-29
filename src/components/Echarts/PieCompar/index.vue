<template>
	<div class="chart-wrap">
		<div id="chartPieCompar" :style='{ height: height, width: width }' />
		<div class="show-compar">
			<div class="show-compar-item" v-for="(v, i) in comparList" :key="'comparList_' + i">
				<p class="value">
					<span class="total">{{ v.total }}</span>
					<span class="percent">（ {{ v.percent }} ）</span>
				</p>
				<p class="text">{{ v.text }}</p>
			</div>
		</div>
	</div>
</template>

<script setup lang='ts'>
import * as echarts from 'echarts';
import { EChartsOption, init } from 'echarts';
import { onMounted, reactive, onBeforeUnmount, ref } from 'vue';

const props = defineProps({
	width: {
		type: String,
		default: '435px'
	},
	height: {
		type: String,
		default: '195px'
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

const comparList = ref([
	{ text: '文化交流基地', total: 80, percent: '80%' },
	{ text: '星源交流基地', total: 20, percent: '20%' },
]);


var dataArr = {
	data: 80,
}
let timer: any = null;

const initChart = () => {

	const chartEle: HTMLElement = document.getElementById("chartPieCompar") as HTMLElement;
	const chart = init(chartEle);
	const option: EChartsOption = {
		animation: true,
		animationEasing: 'elasticOut',
		animationDuration: 5000,
		title: [
			{
				text: `100%`,
				top: 'center',
				left: 'center',
				textStyle: {
					fontSize: 14,
					color: '#FFF',
				}
			}
		],
		series: [{
			name: "内层进度条",
			z: 3,
			type: "gauge", // 仪表盘
			center: ['center', 'center'],
			radius: '70%',

			detail: {
				show: false,
			},
			title: {
				show: false
			},
			data: [{
				value: dataArr.data,
				name: "Percent"
			}],
			startAngle: 225, // 仪表盘起始角度
			endAngle: -45, // 仪表盘结束角度
			min: 0,
			max: 100,
			splitNumber: 20,
			axisLine: {
				show: true,
				lineStyle: {
					width: 30,
					color: [
						[0.8, new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: '#134ee2' // 0% 处的颜色
						}, {
							offset: 1,
							color: '#2c70e2' // 100% 处的颜色
						}], false)],
						[1, new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
							offset: 0,
							color: '#59bdf9' // 0% 处的颜色
						}, {
							offset: 1,
							color: '#59bdf9' // 100% 处的颜色
						}], false)] as any,
					],
				},
			},
			axisTick: {
				show: false
			},
			axisLabel: {
				show: false
			},
			splitLine: {
				show: false,
			},
			pointer: {
				show: false  // 不展示指针
			}
		},
		{
			name: '内部刻度',
			type: 'gauge',
			center: ['center', 'center'],
			radius: '55%',
			detail: {
				show: false,
			},
			startAngle: 0, // 仪表盘起始角度
			endAngle: 360, // 仪表盘结束角度
			axisLabel: {
				show: false
			},
			splitLine: {
				show: false,
			},
			pointer: {
				show: false  // 不展示指针
			},
			axisLine: {
				show: false
			},
			axisTick: {
				show: true,
				splitNumber: 5,
				lineStyle: {
					color: '#037fd8', //用颜色渐变函数不起作用
					width: 2
				},
				length: 2
			}
		},
		{
			name: '外圈实线',
			type: 'pie',
			radius: ['75%', '76%'],
			data: [1],
			labelLine: {
				show: false
			},
			itemStyle: {
				color: '#4490e2'
			}
		},
		]
	};
	option && chart.setOption(option);
	setTimeout(() => {
		timer = setInterval(() => {
			let option: any = chart.getOption();
			option.series[1].startAngle = option.series[1].startAngle + 3;
			option.series[1].endAngle = option.series[1].endAngle + 3;
			chart.setOption(option);
		}, 100);
	}, 2000);
}
</script>

<style lang="scss" scoped>
.chart-wrap {
	width: auto;
	height: auto;
	position: relative;
}

.show-compar {
	position: absolute;
	top: 50px;
	left: 0;
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: space-between;

	.show-compar-item {
		width: 146px;
		height: 95px;
		text-align: center;

		&:nth-child(1) {
			background: url('../../../assets/images/com-left.png') center / contain no-repeat;
		}

		&:nth-child(2) {
			background: url('../../../assets/images/com-right.png') center / contain no-repeat;
		}

		.value {
			margin-top: 20px;

			.total {
				font-size: 22px;
			}

			.percent {
				font-size: 12px;
			}
		}

		.text {
			margin-top: 10px;
			font-size: 14px;
			color: #9dc8f3;
		}
	}
}
</style>