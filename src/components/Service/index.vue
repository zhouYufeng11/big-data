<template>
	<div class="service-list">
		<div class="service-top">
			<div class="service-top-item">
				<p>受理问题解决情况</p>
			</div>
			<div class="service-top-item">
				<p>解决问题类型</p>
			</div>
		</div>
		<div class="service-chart">
			<ServicePie />
			<ServiceBar />
		</div>
		<!-- 列表 -->
		<div class="service-list-box">
			<div class="news-line">
				<div class="news-line-item" v-for="(v, i) in lineNews" :key="'lineNews' + i" @click="jumpTo(v.url)">
					<p class="content">{{ v.text }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang='ts'>
import { onMounted, reactive, onBeforeUnmount, ref } from 'vue';

const props = defineProps({
	width: {
		type: String,
		default: '50%'
	},
	height: {
		type: String,
		default: '140px'
	}
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

onMounted(() => {
});

onBeforeUnmount(() => {
});
</script>

<style lang="scss" scoped>
.service-list {
	padding: 0 20px;

	.service-top {
		display: flex;

		.service-top-item {
			margin-right: 45px;
			padding: 0 5px;
			color: #9ec8f3;
			height: 34px;
			border-radius: 17px;
			border: 1px solid #3f5482;

			&:nth-child(2) {
				margin-right: 0;
			}

			p {
				padding: 0 20px;
				margin-top: 3px;
				height: 26px;
				line-height: 26px;
				border-radius: 13px;
				font-size: 16px;
				background: linear-gradient(to right, #1c2a6d, #121939);
			}
		}
	}

	.service-chart {
		display: flex;
	}
}

.service-list-box {
	margin-top: 10px;
	height: 70px;
	background: rgba(34, 132, 194, .3);

	.news-line {
		display: flex;
		flex-wrap: wrap;
		padding-top: 5px;
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
