<template>
	<div id='chartMap' class='chart-wrap' :style='{ height: height, width: width }' />
</template>

<script setup lang='ts'>
import * as echarts from 'echarts';
import { EChartsOption, init, registerMap } from 'echarts';
import { onMounted, reactive, onBeforeUnmount, ref } from 'vue';
import * as chartData from './321202.json';

const props = defineProps({
	width: {
		type: String,
		default: '660px'
	},
	height: {
		type: String,
		default: '660px'
	}
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
})

const selectName = '海陵区';

console.log(chartData)
const dataAll: any = []
chartData.features.forEach((t: any) => {
	if (t.properties.name) {
		dataAll.push({
			name: t.properties.name,
			value: 20,
		})
	}
})

let convertData = chartData.features.map((s: any) => {

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
	registerMap<any>(selectName, chartData);
	const chart = init(chartEle);
	const option: EChartsOption = {
		colors: ['#5793f3', '#d14a61', '#675bba'],
		backgroundColor: 'transparent',
		// backgroundColor: '#131C38',
		tooltip: {
			backgroundColor: 'rgba(0,0,0,0)',
			trigger: 'axis',
		},
		legend: {
			show: false,
		},
		geo: [{
			map: selectName,
			aspectScale: 1,
			zoom: 0.5,
			layoutCenter: ['50%', '50%'],
			layoutSize: '180%',
			show: true,
			roam: false,
			label: {
				show: false
			},
			itemStyle: {
				borderColor: 'rgba(67,229,253,.8)',
				borderWidth: 3,
				shadowColor: '#6FFDFF',
				shadowOffsetY: 0,
				shadowBlur: 10,
				areaColor: 'rgba(37,87,169,.6)',
			},
			// areaColor: 'rgba(29,85,139,.6)',
		}, {
			map: selectName,
			aspectScale: 1,
			zoom: 0.5,
			layoutCenter: ['50%', '50%'],
			layoutSize: '180%',
			show: true,
			roam: false,
			label: {
				show: false
			},
			itemStyle: {
				borderColor: 'rgba(67,229,253,.8)',
				borderWidth: 3,
				shadowColor: '#2C99F6',
				shadowOffsetY: 0,
				shadowBlur: 30,
				areaColor: 'rgba(37,87,169,.6)',
			},
			// areaColor: 'rgba(29,85,139,.6)',
		},
		//重影
		{
			type: 'map',
			map: selectName,
			zlevel: -1,
			aspectScale: 1,
			zoom: 0.5,
			layoutCenter: ['50%', '50.7%'],
			layoutSize: '180%',
			roam: false,
			silent: true,
			itemStyle: {
				borderColor: 'rgba(67,229,253,0.4)',
				shadowColor: 'rgba(67,229,253,0.6)',
				shadowOffsetY: 5,
				shadowBlur: 15,
				// areaColor: 'rgba(5,21,35,0.1)'
			}
		},
		{
			type: 'map',
			map: selectName,
			zlevel: -2,
			aspectScale: 1,
			zoom: 0.5,
			layoutCenter: ['50%', '51.4%'],
			layoutSize: '180%',
			roam: false,
			silent: true,
			itemStyle: {
				borderColor: 'rgba(67,229,253,0.4)',
				shadowColor: 'rgba(67,229,253,0.6)',
				shadowOffsetY: 5,
				shadowBlur: 15,
				// areaColor: 'rgba(5,21,35,0.1)'
			}
		},
		{
			type: 'map',
			map: selectName,
			zlevel: -3,
			aspectScale: 1,
			zoom: 0.5,
			layoutCenter: ['50%', '52.1%'],
			layoutSize: '180%',
			roam: false,
			silent: true,
			itemStyle: {
				borderColor: 'rgba(67,229,253,0.3)',
				shadowColor: 'rgba(67,229,253,0.8)',
				shadowOffsetY: 15,
				shadowBlur: 8,
				// areaColor: 'rgba(5,21,35,0.1)'
			}
		}
		],
		series: [{
			tooltip: {
				trigger: 'item',
				position: 'inside',
				formatter: function (item: any) {
					if (!item.data) return '';
					var tipHtml = '';
					tipHtml = `<div style="font-size: 18px;padding:10px;line-height: 30px;background:#000259;opacity: 0.75;border-radius: 3px;color:#fff">
                            <h3>${item?.data?.name}</h3>
                            <p>入驻：${item?.data?.value} 家</p>
                        </div>`;
					return tipHtml;
				}
			},
			name: '海陵区',
			type: 'map',
			map: selectName, // 自定义扩展图表类型
			aspectScale: 1,
			zoom: 0.5, //缩放
			showLegendSymbol: false,
			label: {
				show: true,
				color: "#ffffff",
				position: 'inside',
				fontSize: 16,
				// emphasis: {
				// 	show: true,
				// 	color: "#ffffff",
				// 	position: 'inside',
				// 	fontSize: 16,
				// }
			},
			itemStyle: {
				areaColor: {
					type: 'linear',
					x: 0,
					y: 300,
					x2: 0,
					y2: 0,
					colorStops: [{
						offset: 0,
						color: 'RGBA(49,134,227,1)' // 0% 处的颜色
					}, {
						offset: 1,
						color: 'RGBA(46,180,198,1)' // 50% 处的颜色
					}],
					global: true // 缺省为 false
				},
				borderColor: '#3bdffd',
				borderWidth: 2,
				// emphasis: {
				// 	areaColor: {
				// 		type: 'linear-gradient',
				// 		x: 0,
				// 		y: 300,
				// 		x2: 0,
				// 		y2: 0,
				// 		colorStops: [{
				// 			offset: 0,
				// 			color: 'rgba(37,108,190,1)' // 0% 处的颜色
				// 		}, {
				// 			offset: 1,
				// 			color: 'rgba(15,169,195,1)' // 50% 处的颜色
				// 		}],
				// 		global: true // 缺省为 false
				// 	},
				// }
			},
			layoutCenter: ['50%', '50%'],
			layoutSize: '180%',
			markPoint: {
				symbol: 'none'
			},
			data: dataAll,
		}, {
			// 	name: "light",
			// 	type: "scatter",
			// 	coordinateSystem: "geo",
			// 	data: convertData,
			// 	symbolSize: function (val) {
			// 		return val[2] / 10;
			// 	},
			// 	label: {
			// 		formatter: "{b}",
			// 		position: "right",
			// 		show: true,
			// 	},
			// 	itemStyle: {
			// 		color: "#F4E925",
			// 	},
			// }, { // 圆球
			// 	tooltip: {
			// 		show: false,
			// 	},
			// 	type: 'effectScatter',
			// 	coordinateSystem: 'geo',
			// 	rippleEffect: {
			// 		brushType: 'stroke',
			// 	},
			// 	showEffectOn: 'render',
			// 	itemStyle: {
			// 		color: {
			// 			type: 'radial',
			// 			x: 0.5,
			// 			y: 0.5,
			// 			r: 0.5,
			// 			colorStops: [{
			// 				offset: 0,
			// 				color: 'rgba(255,204,0,0.1)'
			// 			}, {
			// 				offset: 0.6,
			// 				color: 'rgba(255,204,0,0.4)'
			// 			}, {
			// 				offset: 0.85,
			// 				color: 'transparent'
			// 			}, {
			// 				offset: 1,
			// 				color: '#F4E925'
			// 			}],
			// 			global: false // 缺省为 false
			// 		},
			// 	},
			// 	label: {
			// 		color: '#fff',
			// 	},
			// 	symbol: 'circle',
			// 	symbolSize: 18,
			// 	data: convertData.sort((a: any, b: any) => {
			// 		return b.value - a.value;
			// 	}).slice(0, 5),
			// 	zlevel: 1,
		}],
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