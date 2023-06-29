<template>
	<div ref="chartShowLine" class="chart-wrap" :style='{ height: height, width: width }' />
</template>

<script setup lang='ts'>
import * as echarts from 'echarts';
import { EChartsOption, init } from 'echarts';
import { onMounted, reactive, onBeforeUnmount, ref } from 'vue';

const props = defineProps({
	width: {
		type: String,
		default: '650px'
	},
	height: {
		type: String,
		default: '240px'
	},
})
const chartShowLine = ref();
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

const areaList: any = ref([
	{ text: "三水", radio: 20, instrument: 30, car: 10 },
	{ text: "罗塘", radio: 30, instrument: 20, car: 20 },
	{ text: "天目山", radio: 20, instrument: 30, car: 10 },
	{ text: "梁徐", radio: 30, instrument: 20, car: 20 },
	{ text: "蒋垛", radio: 20, instrument: 30, car: 10 },
	{ text: "娄庄", radio: 30, instrument: 20, car: 20 },
	{ text: "白米", radio: 20, instrument: 30, car: 10 },
	{ text: "俞垛", radio: 30, instrument: 20, car: 20 },
	{ text: "大伦", radio: 20, instrument: 30, car: 10 },
	{ text: "顾高", radio: 30, instrument: 20, car: 20 },
	{ text: "张甸", radio: 20, instrument: 30, car: 10 },
	{ text: "溱潼", radio: 30, instrument: 20, car: 20 },
	{ text: "淤溪", radio: 20, instrument: 30, car: 10 },
]);
const showNum = ref(4);// 默认展示四个
const curNameList: any = ref([]); // 当前展示的地区名列表
const radioList: any = ref([]); // 电台
const instrumentList: any = ref([]); // 执法仪
const carList: any = ref([]); // 警车

areaList.value.forEach((s: any, i: number) => {
	if (i < showNum.value) {
		curNameList.value.push(s.text);
		radioList.value.push(s.radio);
		instrumentList.value.push(s.instrument);
		carList.value.push(s.car);
	}
});


const initChart = () => {
	const chartEle: HTMLElement = chartShowLine.value as HTMLElement;
	if (!state.chart) state.chart = init(chartEle);
	const option: EChartsOption = {
		animation: true,
		animationEasing: 'linear',
		animationDuration: 1000,
		tooltip: {
			trigger: "axis",
			axisPointer: {
				// 坐标轴指示器，坐标轴触发有效
				type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
			},
		},
		legend: {
			show: true,
			data: ["电台", "执法仪", "警车"],
			align: "left",
			right: 20,
			top: 10,
			itemWidth: 20,
			itemHeight: 14,
			itemGap: 20,
			textStyle: {
				color: '#7ec7ff',
				lineHeight: 15,
			},
		},
		grid: {
			top: '20%',
			left: "5%",
			right: "2%",
			bottom: "3%",
			containLabel: true,
		},
		xAxis: [
			{
				type: "category",
				data: curNameList.value,
				axisLine: { // 坐标轴轴线相关设置。数学上的x轴
					show: false,
				},
				axisLabel: { // 坐标轴刻度标签的相关设置
					color: '#7ec7ff',
					fontSize: 12,
				},
				splitLine: {
					show: false,
				},
				axisTick: {
					show: false,
				},
			},
			{
				type: "category",
				axisLine: { // 坐标轴轴线相关设置。数学上的x轴
					show: false,
				},
				axisLabel: { // 坐标轴刻度标签的相关设置
					show: false
				},
				splitLine: {
					show: false,
				},
				axisTick: {
					show: false,
				},
			},
		],
		yAxis: [
			{
				type: "value",
				// name: "人",
				gridIndex: 0,
				splitNumber: 3,
				nameTextStyle: {//y轴上方单位的颜色
					color: '#7ec7ff',
					align: 'left',
					padding: 0,
				},
				axisLabel: {
					color: '#7ec7ff',
					fontSize: 12,
					formatter: "{value}",
					margin: -10,
				},
				splitLine: {
					show: true,
					lineStyle: {
						color: '#192a44',
						type: 'dashed'
					},
				},
				axisLine: {
					show: false,
				},
			},

		],
		series: [
			{
				name: "电台",
				type: "bar",
				xAxisIndex: 0,
				yAxisIndex: 0,
				barWidth: "15%",
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{
							offset: 0,
							color: "rgba(110,181,237,1)",
						},
						{
							offset: 1,
							color: "rgba(110,181,237,.3)",
						},
					]),
				},
				data: radioList.value,
				z: 2,
			},
			{
				name: "执法仪",
				type: "bar",
				xAxisIndex: 0,
				yAxisIndex: 0,
				barWidth: "15%",
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{
							offset: 0,
							color: "rgba(242,66,176,1)",
						},
						{
							offset: 1,
							color: "rgba(242,66,176,.3)",
						},
					]),
				},
				data: instrumentList.value,
				z: 2,
			},
			{
				name: "警车",
				type: "bar",
				xAxisIndex: 0,
				yAxisIndex: 0,
				barWidth: "15%",
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{
							offset: 0,
							color: "rgba(29,137,221,1)",
						},
						{
							offset: 1,
							color: "rgba(29,137,221,.3)",
						},
					]),
				},
				data: carList.value,
				z: 2,
			},
			// {
			// 	type: "bar",
			// 	barWidth: "80%",
			// 	xAxisIndex: 1,
			// 	yAxisIndex: 0,
			// 	barGap: "-100%",
			// 	data: [300, 300, 300, 300, 300],
			// 	itemStyle: {
			// 		color: "rgba(1,88,182,0.2)",
			// 		borderRadius: 10,
			// 	},
			// 	tooltip: {
			// 		show: false,
			// 	},
			// 	silent: true,
			// 	z: 1,
			// },
		],
	};
	option && state.chart.setOption(option);
}

// 循环添加
setInterval(() => {
	const curNum = showNum.value + 1 > areaList.value.length ? 0 : showNum.value++;
	// 重置
	if (curNum === 0) showNum.value = 1;
	// 当前需要添加的一项 
	const curOne = areaList.value[curNum];
	curNameList.value.shift() // 当前展示的地区名列表
	curNameList.value.push(curOne.text)
	radioList.value.shift() // 电台
	radioList.value.push(curOne.radio)
	instrumentList.value.shift() // 执法仪
	instrumentList.value.push(curOne.instrument)
	carList.value.shift() // 警车
	carList.value.push(curOne.car)
	initChart();
}, 2000);


</script>

<style lang="scss" scoped>
.chart-wrap {
	width: auto;
	height: auto;
}
</style>