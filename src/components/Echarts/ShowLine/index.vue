<template>
	<div ref="chartShowLine" class="chart-wrap" :style='{ height: height, width: width }' />
</template>

<script setup lang='ts'>
import * as echarts from 'echarts';
import { EChartsOption, init } from 'echarts';
import { onMounted, reactive, onBeforeUnmount, ref } from 'vue';
import { policeResource } from '@/api/index';
import { dic_ResourceType } from '@/api/dic';
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
const chartShowLine = ref();
const state: any = reactive({
	chart: null,
});

const typeList: any = ref([]);
const typeNameList: any = ref([]);
const areaList: any = ref([]);
const showNum = ref(7);// 默认展示个数
const curNameList: any = ref([]); // 当前展示的地区名列表
const radioList: any = ref([]); // 电台
const instrumentList: any = ref([]); // 执法仪
const carList: any = ref([]); // 警车

const initList = () => {
	areaList.value.forEach((s: any, i: number) => {
		if (i < showNum.value) {
			curNameList.value.push(s.text);
			radioList.value.push(s.radio);
			instrumentList.value.push(s.instrument);
			carList.value.push(s.car);
		}
	});
}

const checkItem = (type: string): string => {
	if (type === '1') {
		return 'radio';
	} else if (type === '2') {
		return 'instrument';
	} else if (type === '3') {
		return 'car';
	} else {
		return 'noData'
	}
}

const fetchDicData = async () => {
	return await dic_ResourceType({}).then((res: any) => {
		if (res.code = 200) {
			typeList.value = res.data.map((s: any) => {
				typeNameList.value.push(s.dictLabel)
				return { key: s.dictValue, value: s.dictLabel }
			});
		} else {
			Message.error(res.msg)
		}
	}).catch(err => {
		console.log(err)
	})
}

// // 组装 series item
// let seriesItem = (nameList: string[], rows: any) => {
// 	let colorList = [
// 		[
// 			{ offset: 0, color: "rgba(155,255,252,1)" },
// 			{ offset: .25, color: "rgba(101,255,249,1)" },
// 			{ offset: 1, color: "rgba(62,255,244,1)" },
// 		],
// 		[
// 			{ offset: 0, color: "rgba(63,164,255,1)" },
// 			{ offset: 1, color: "rgba(96,245,255,1)" },
// 		],
// 		[
// 			{ offset: 0, color: "rgba(255,54,87,1)", },
// 			{ offset: 1, color: "rgba(255,114,166,1)" },
// 		]
// 	]
// 	let seriesList: any = nameList.map((s: any, i: number) => {
// 		let curOne: any = {
// 			name: s,
// 			z: 2,
// 			type: "bar",
// 			xAxisIndex: 0,
// 			yAxisIndex: 0,
// 			barWidth: "12%",
// 			data: rows[s].map((k: any) => k.policeCount),
// 		}
// 		if (i < 3) {
// 			curOne.itemStyle.color = new echarts.graphic.LinearGradient(0, 0, 0, 1, colorList[i]);
// 		}
// 		return
// 	});
// 	return seriesList;
// }


const fetchData = async () => {
	return await policeResource({}).then((res: any) => {
		if (res.code === 200) {
			const list: any = [];
			const nameList = Object.entries(res.rows).map(s => s[0]);
			nameList.forEach((k: any, j: number) => {
				if (!list[j]) {
					list.push({ text: k, radio: 0, instrument: 0, car: 0 });
				}
				const item = res.rows[k];
				item.forEach((s: any) => {
					list[j][checkItem(s.policeResourceType)] = s.policeCount
				});
			});
			areaList.value = list;
			initList();
			showSetInterval();
		} else {
			Message.error(res.msg)
		}
	}).catch(err => {
		console.log(err)
	})
}


onMounted(async () => {
	await fetchDicData();
	fetchData();
});

onBeforeUnmount(() => {
	if (!state.chart) {
		return
	}
	state.chart.dispose()
	state.chart = null
});



const initChart = () => {
	const chartEle: HTMLElement = chartShowLine.value as HTMLElement;
	if (!state.chart) state.chart = init(chartEle);
	const option: EChartsOption = {
		animation: true,
		animationEasing: 'linear',
		animationDuration: 500,
		tooltip: {
			trigger: "axis",
			axisPointer: {
				// 坐标轴指示器，坐标轴触发有效
				type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
			},
		},
		legend: {
			show: true,
			data: typeNameList.value,
			align: "left",
			left: 'center',
			top: 10,
			itemWidth: 20,
			itemHeight: 5,
			itemGap: 25,
			textStyle: {
				color: '#7ec7ff',
				lineHeight: 15,
			},
		},
		grid: {
			top: '25%',
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
				name: typeNameList.value[0],
				// name: "电台",
				type: "bar",
				xAxisIndex: 0,
				yAxisIndex: 0,
				barWidth: "12%",
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{
							offset: 0,
							color: "rgba(155,255,252,1)",
						},
						{
							offset: .25,
							color: "rgba(101,255,249,1)",
						},
						{
							offset: 1,
							color: "rgba(62,255,244,1)",
						},
					]),
				},
				data: radioList.value,
				z: 2,
			},
			{
				name: typeNameList.value[1],
				// name: "执法仪",
				type: "bar",
				xAxisIndex: 0,
				yAxisIndex: 0,
				barWidth: "12%",
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{
							offset: 0,
							color: "rgba(63,164,255,1)",
						},
						{
							offset: 1,
							color: "rgba(96,245,255,1)",
						},
					]),
				},
				data: instrumentList.value,
				z: 2,
			},
			{
				name: typeNameList.value[2],
				// name: "警车",
				type: "bar",
				xAxisIndex: 0,
				yAxisIndex: 0,
				barWidth: "12%",
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{
							offset: 0,
							color: "rgba(255,54,87,1)",
						},
						{
							offset: 1,
							color: "rgba(255,114,166,1)",
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
const showSetInterval = () => setInterval(() => {
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
}, 1500);


</script>

<style lang="scss" scoped>
.chart-wrap {
	width: auto;
	height: auto;
}
</style>