<template>
	<div class="newsList">
		<div class="news-tab">
			<div class="tab-item" :class="[curIndex === i && 'active']" v-for="(v, k, i) in dataList" :key="'dataList_' + i"
				@click="setTab(k, i)">
				{{ v.text }}</div>
		</div>
		<div class="news-content">
			<div class="news-wrap">
				<div class="news-item" v-for="(s, n) in curList" :key="'curList_' + n">
					<p class="type">【{{ s.type }}】</p>
					<p class="text" :title="s.text">{{ s.text }}</p>
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


// 近期高发
const dataList: any = ref({
	news: {
		text: '高发警情',
		list: [
			{ text: '三水街道326号发生多人斗殴事件', type: '未成年', time: '06-24' },
			{ text: '罗塘街道239号发生一起人员失踪事件', type: '失踪人员', time: '06-20' },
			{ text: '天目街道多个小区居民刷单被电信诈骗', type: '电信诈骗', time: '06-17' },
			{ text: '三水街道326号发生多人斗殴事件', type: '未成年', time: '06-24' },
			{ text: '罗塘街道239号发生一起人员失踪事件', type: '失踪人员', time: '06-20' },
			{ text: '天目街道多个小区居民刷单被电信诈骗', type: '电信诈骗', time: '06-17' },
			{ text: '三水街道326号发生多人斗殴事件', type: '未成年', time: '06-24' },
			{ text: '罗塘街道239号发生一起人员失踪事件', type: '失踪人员', time: '06-20' },
			{ text: '天目街道多个小区居民刷单被电信诈骗', type: '电信诈骗', time: '06-17' },
		]
	},
	news2: {
		text: '高发案件',
		list: [
			{ text: '三水街道326号发生多人斗殴事件', type: '未成年', time: '06-24' },
			{ text: '罗塘街道239号发生一起人员失踪事件', type: '失踪人员', time: '06-20' },
			{ text: '天目街道多个小区居民刷单被电信诈骗', type: '电信诈骗', time: '06-17' },
			{ text: '三水街道326号发生多人斗殴事件', type: '未成年', time: '06-24' },
			{ text: '罗塘街道239号发生一起人员失踪事件', type: '失踪人员', time: '06-20' },
			{ text: '天目街道多个小区居民刷单被电信诈骗', type: '电信诈骗', time: '06-17' },
			{ text: '三水街道326号发生多人斗殴事件', type: '未成年', time: '06-24' },
			{ text: '罗塘街道239号发生一起人员失踪事件', type: '失踪人员', time: '06-20' },
			{ text: '天目街道多个小区居民刷单被电信诈骗', type: '电信诈骗', time: '06-17' },
		]
	}
});

const curIndex = ref<number>(0);
const curList = ref<{ text?: string, type?: string, time?: string }[]>([]);
const setTab = (key: string | number, index: number | undefined): void => {
	curIndex.value = index ?? 0;
	curList.value = dataList.value[key].list;
}
onMounted(() => {
	curList.value = dataList.value.news?.list ?? [];
})

</script>

<style lang="scss" scoped>
.newsList {
	position: relative;
	height: 245px;
	width: 100%;
	padding: 20px;
	overflow: hidden;

	.news-tab {
		display: flex;

		.tab-item {
			margin-right: 15px;
			min-width: 100px;
			height: 36px;
			line-height: 36px;
			font-size: 18px;
			border-radius: 4px;
			background: linear-gradient(to bottom, rgba(64, 175, 178, .9) 30%, rgba(2, 121, 253, .9));
			opacity: 0.6;
			cursor: pointer;
			font-family: 'YouSheBiaoTiHei';

			&.active,
			&:hover {
				opacity: 1;
			}
		}
	}

	.news-content {
		margin-top: 20px;
		height: 180px;
		width: 100%;
		overflow-y: auto;

		.news-wrap {
			animation: scrollBot 10s linear infinite;

			&:hover {
				animation-play-state: paused;
			}
		}

		.news-item {
			height: 40px;
			line-height: 40px;
			display: flex;
			font-size: 14px;
			align-items: center;

			&:nth-child(2n) {
				background: rgba(45, 98, 212, .2);
			}

			.text {
				padding-left: 10px;
				flex: 0 0 350px;
				margin-right: 10px;
				overflow: hidden;
				text-align: left;
				white-space: nowrap;
				text-overflow: ellipsis;
			}

			.type {
				flex: 0 0 100px;
			}

			.time {
				flex: 1;
				text-align: center;
				font-weight: normal;
			}
		}
	}
}
</style>