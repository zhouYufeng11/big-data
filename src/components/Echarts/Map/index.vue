<template>
	<div id='chartMap' class='chart-wrap' :style='{ height: height, width: width }' />
</template>

<script setup lang='ts'>
import { EChartsOption, init, registerMap } from 'echarts';
import { onMounted, reactive, onBeforeUnmount, ref } from 'vue';
import mapData from './3212.json';
import mapDataOutLine from './3212_outline.json';

const chartData: any = JSON.parse(JSON.stringify(mapData));
const chartDataOutLine: any = JSON.parse(JSON.stringify(mapDataOutLine));


const props = defineProps({
	width: {
		type: String,
		default: '440px'
	},
	height: {
		type: String,
		default: '580px'
	},
	dataList: {
		type: Array<any>,
		default: []
	}
});

const state: any = reactive({
	chart: null,
});


const selectName = '泰州市';
const chinaMapOutline = '泰州市轮廓';
const activeIcon = 'image://https://resource.jszhuiming.com/overseas/map-icon.png';
const activeIconList: any = [];
const dataAll: any = [];


onMounted(() => {
	initChart();
});

onBeforeUnmount(() => {
	if (!state.chart) {
		return
	}
	state.chart.dispose()
	state.chart = null
})



chartData.features.forEach((t: any, i: number) => {
	if (t.properties.name) {
		dataAll.push({
			name: t.properties.name,
			value: 20,
		});
		activeIconList.push({
			name: t.properties.name,
			value: t.properties.cp,
			// 查找一样的名称 获取值
			num: props.dataList.find(s => s.text === t.properties.name).value,
		});
	}
})

const convertData = chartData.features.map((s: any) => {
	let areaName = s.properties.name;
	let helfLen = Math.trunc(s.geometry.coordinates[0].length / 2);
	let curList = [s.geometry.coordinates[0][0], s.geometry.coordinates[0][helfLen]];
	let resultList = [(curList[0][0] + curList[1][0]) / 2, (curList[0][1] + curList[1][1]) / 2];
	return { NamedNodeMap: areaName, value: [...resultList, 150] }
});



// const timing = () => {
// 	// 取消高亮指定的数据图形
// 	myChart.dispatchAction({
// 		type: 'downplay',
// 		seriesIndex: 0,
// 		dataIndex: index,
// 	});
// 	// 高亮指定的数据图形
// 	myChart.dispatchAction({
// 		type: 'highlight',
// 		seriesIndex: 0,
// 		dataIndex: index + 1,
// 	});
// 	index++;
// 	//判断长度是否和城市的长度一样，如果一样重新播放
// 	if (index > num) {
// 		index = -1;
// 	}
// }

const initChart = () => {

	const chartEle: HTMLElement = document.getElementById('chartMap') as HTMLElement;
	registerMap(selectName, chartData);
	registerMap(chinaMapOutline, chartDataOutLine);
	const chart = init(chartEle);
	const option: EChartsOption = {
		legend: {
			show: false,
		},
		geo: [{ // 轮廓
			map: chinaMapOutline,
			zlevel: -1,
			aspectScale: 1,
			zoom: 1,
			layoutCenter: ['49%', '52%'],
			layoutSize: '125%',
			show: true,
			silent: false,
			roam: false,
			label: {
				show: false
			},
			tooltip: { show: false },
			itemStyle: {
				borderColor: 'rgba(31,102,136,.8)',
				borderWidth: 2,
				shadowColor: 'rgba(31,102,136,0.6)',
				shadowOffsetY: 5,
				shadowOffsetX: -8,
				shadowBlur: 2,
				areaColor: 'rgba(31,102,136,.1)',
			},
			select: {
				disabled: true,
			},
			emphasis: {
				disabled: true,
			}
		},
		],
		series: [{
			name: selectName,
			type: 'map',
			map: selectName, // 自定义扩展图表类型
			aspectScale: 1,
			zlevel: 2,
			zoom: 1, //缩放
			roam: false,
			colorBy: 'data',
			showLegendSymbol: false,
			layoutCenter: ['53%', '50%'],
			layoutSize: '120%',
			label: {
				show: false,
				color: "#fff",
				position: 'inside',
				fontSize: 16,
			},
			itemStyle: {
				areaColor: {
					type: 'radial',
					x: 0.5,
					y: 0.5,
					r: 0.8,
					colorStops: [{
						offset: 0,
						color: 'rgba(5,21,35,0.1)' // 0% 处的颜色
					}, {
						offset: 1,
						color: 'rgba(67,229,253, .5)' // 50% 处的颜色
					}],
					// global: true // 缺省为 false
				},
				borderWidth: 2,
				borderColor: 'rgba(67,229,253,1)',
				// shadowOffsetY: 20,
				// shadowOffsetX: -20,
				// shadowBlur: 5,
				// shadowColor: 'rgba(67,229,253,0.3)',
			},
			emphasis: {
				disabled: false,
				itemStyle: {
					areaColor: 'rgba(67,229,253,.5)',
				},
				label: {
					show: false,
					color: '#fff'
				}
			},
			select: {
				disabled: false,
				itemStyle: {
					areaColor: 'rgba(67,229,253,.6)',
					borderColor: '#7af7fa',
					borderWidth: 4,
				},
				label: {
					show: false,
					color: '#fff'
				}
			},
			data: dataAll,
		},
		// 图标的位置
		{
			name: selectName,
			type: 'scatter',
			coordinateSystem: 'geo',
			data: activeIconList,
			symbol: activeIcon,
			zlevel: 3,
			symbolSize: (val) => {
				return 125;
			},
			symbolOffset: [30, -60],
			label: {
				show: true,
				formatter: (params: any) => {
					return params.name + ' ' + params.data.num;
				},
				position: [60, 9, 0, 0],
				color: '#ffffff',
				fontFamily: 'YouSheBiaoTiHei',
				fontSize: 16,
			},
			emphasis: {
				disabled: true,
			},
			itemStyle: {

			},
		},
		// 扩散圆
		{
			name: selectName,
			tooltip: {
				show: false,
			},
			type: 'effectScatter',
			coordinateSystem: 'geo',
			rippleEffect: {
				color: 'rgba(18,173,219, 1)',
				scale: 10,
				brushType: 'stroke',
			},
			showEffectOn: 'render',
			itemStyle: {
				shadowColor: 'rgba(18,173,219, .9)',
				shadowBlur: 10,
				shadowOffsetX: 0,
				shadowOffsetY: 0,
			},
			label: {
				show: false,
			},
			symbol: 'circle',
			symbolSize: [10, 5],
			symbolOffset: [20, -20],
			data: activeIconList,
			zlevel: 1,
		},
		],
	};

	option && chart.setOption(option);
}
</script>

<style lang="scss" scoped>
.chart-wrap {
	width: auto;
	height: auto;
	margin: 0 auto;
}
</style>