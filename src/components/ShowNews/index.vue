<template>
	<div class="newsList">
		<div class="news-img-box">
			<div class="news-img-item" v-for="(v, i) in dataList.news" :key="'dataList_' + i" @click="jumpTo(v.url)">
				<img :src="v.img">
				<p class="text">{{ v.text }}</p>
			</div>
		</div>
		<div class="news-content">
			<div class="news-wrap">
				<div class="news-item" v-for="(s, n) in dataList.list" :key="'curList_' + n" @click="jumpTo(s.url)">
					<p class="text">{{ s.text }}</p>
					<p class="time">{{ s.time }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// const props = defineProps({
// dataList: {
// 	type: Object,
// 	default: { news: {}, whole: {}, city: {} }
// },
// })


// 华侨资讯
const dataList: any = ref({
	news: [
		{
			text: '泰州市侨联赴姜堰区调研侨联工作',
			img: 'https://resource.jszhuiming.com/overseas/n1.png',
			url: 'http://www.jstzql.com/case/2015/129/151291556530GF2C81GK6F6AJBIEA76.html'
		},
		{
			text: '泰州市侨联赴姜堰区调研侨联工作',
			img: 'https://resource.jszhuiming.com/overseas/n1.png',
			url: 'http://www.jstzql.com/case/2015/129/151291556530GF2C81GK6F6AJBIEA76.html'
		},
	],
	list: [
		{
			text: '曾宪相：自律、善于学习、点滴追求合理化的企业家',
			url: 'http://www.jstzql.com/case/2015/129/151291556530GF2C81GK6F6AJBIEA76.html',
			time: '07-24'
		},
		{
			text: '李焕军 心怀感恩,在责任与奉献中追求自我价值',
			url: 'http://www.jstzql.com/case/2015/129/151291556530GF2C81GK6F6AJBIEA76.html',
			time: '07-20'
		},
		{
			text: '蒋志君：世界级创新和企管资深专家',
			url: 'http://www.jstzql.com/case/2015/129/151291556530GF2C81GK6F6AJBIEA76.html',
			time: '06-17'
		},
		{
			text: '王存玉：美国国家医学院院士、中国工程院海外院士',
			url: 'http://www.jstzql.com/case/2015/129/151291556530GF2C81GK6F6AJBIEA76.html',
			time: '07-24'
		},
		{
			text: '闻晓光：创新制剂新药中国创造 终端医药产品出口美国',
			url: 'http://www.jstzql.com/case/2015/129/151291556530GF2C81GK6F6AJBIEA76.html',
			time: '07-20'
		},
		{
			text: '曾宪相：自律、善于学习、点滴追求合理化的企业家',
			url: 'http://www.jstzql.com/case/2015/129/151291556530GF2C81GK6F6AJBIEA76.html',
			time: '07-24'
		},
		{
			text: '李焕军 心怀感恩,在责任与奉献中追求自我价值',
			url: 'http://www.jstzql.com/case/2015/129/151291556530GF2C81GK6F6AJBIEA76.html',
			time: '07-20'
		},
		{
			text: '蒋志君：世界级创新和企管资深专家',
			url: 'http://www.jstzql.com/case/2015/129/151291556530GF2C81GK6F6AJBIEA76.html',
			time: '06-17'
		},
		{
			text: '王存玉：美国国家医学院院士、中国工程院海外院士',
			url: 'http://www.jstzql.com/case/2015/129/151291556530GF2C81GK6F6AJBIEA76.html',
			time: '07-24'
		},
		{
			text: '闻晓光：创新制剂新药中国创造 终端医药产品出口美国',
			url: 'http://www.jstzql.com/case/2015/129/151291556530GF2C81GK6F6AJBIEA76.html',
			time: '07-20'
		},
	]
});

const jumpTo = (url: string): void => {
	window.open(url, '_blank');
}

</script>

<style lang="scss" scoped>
.newsList {
	position: relative;
	height: 265px;
	padding: 0 20px;

	.news-img-box {
		display: flex;
		justify-content: space-between;

		.news-img-item {
			position: relative;
			width: 176px;
			height: 100px;
			border: 1px solid #2284c2;

			img {
				height: 100%;
				width: 100%;
			}

			.text {
				position: absolute;
				bottom: -5px;
				left: 0;
				width: 125%;
				height: 25px;
				line-height: 25px;
				font-size: 12px;
				transform: scale(0.8);
				transform-origin: 0 0 0;
				background: rgba(0, 31, 42, 0.6);
			}

			&.active,
			&:hover {
				opacity: 0.9;
			}
		}
	}

	.news-content {
		margin-top: 15px;
		padding: 10px 5px 10px 15px;
		height: 145px;
		overflow: auto;
		background: rgba(34, 132, 194, .28);

		.news-wrap {
			animation: scrollBot 10s linear infinite;

			&:hover {
				animation-play-state: paused;
			}
		}

		.news-item {
			height: 26px;
			line-height: 26px;
			display: flex;
			font-size: 12px;
			align-items: center;
			padding-left: 15px;
			position: relative;
			cursor: pointer;

			&:hover {
				color: rgba(18, 173, 219, 1);
			}

			&::before {
				position: absolute;
				left: 0;
				top: 7px;
				content: '';
				width: 0;
				height: 0;
				border: 6px solid transparent;
				border-left-color: rgba(18, 173, 219, 1);
			}


			.text {
				flex: 1;
				margin-right: 10px;
				overflow: hidden;
				white-space: nowrap;
				overflow: hidden;
				font-weight: normal;
				text-align: left;
			}

			.time {
				flex: 0 0 50px;
				text-align: center;
				font-weight: normal;
			}
		}
	}
}
</style>