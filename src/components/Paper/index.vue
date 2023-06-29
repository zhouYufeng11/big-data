<template>
	<div class="paper">
		<div class="paper-item" v-for="(v, i) in paperList" :key="'paperList_' + i">
			<div class="left"><img :src="v.img"></div>
			<div class="right">
				<div class="item-content" v-for="(s, n) in v.list" :key="'paperItem_' + n">
					<p class="title">{{ s.title }}</p>
					<p class="text" v-for="(k, j) in s.list" :key="'parperText_' + j" @click="jumpTo(k.url)">{{ k.text }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// const props = defineProps({
// 	width: {
// 		type: [Number, String],
// 		default: '100%'
// 	},
// })

const paperList = ref([
	{
		journal: 'CN-11-1202/G2', img: 'https://resource.jszhuiming.com/overseas/paper1.png', list: [
			{
				title: '特别报道', list: [
					{ text: '全国统战部长会议在京召开', url: 'http://www.jstzql.com/case/2015/129/151291556530GF2C81GK6F6AJBIEA76.html' },
					{ text: '2020年，统战工作如何把握“治事”之道？', url: 'http://www.jstzql.com/case/2015/129/151291556530GF2C81GK6F6AJBIEA76.html' },
					{ text: '国务院侨办主任许又声向广大侨胞致以春节问候', url: 'http://www.jstzql.com/case/2015/129/151291556530GF2C81GK6F6AJBIEA76.html' },
				]
			},
			{
				title: '华文教育', list: [
					{ text: '传播中华文化的使者津门教师名扬里斯本', url: 'http://www.jstzql.com/case/2015/129/151291556530GF2C81GK6F6AJBIEA76.html' },
					{ text: '当圣诞遇上春节', url: 'http://www.jstzql.com/case/2015/129/151291556530GF2C81GK6F6AJBIEA76.html' },
				]
			}
		]
	},
	{
		journal: 'CN-11-1202/G2', img: 'https://resource.jszhuiming.com/overseas/paper2.png', list: [
			{
				title: '特别报道', list: [
					{ text: '尤权会见中国侨联青年委员会第四次委员大会代表  ', url: 'http://www.jstzql.com/case/2015/129/151291556530GF2C81GK6F6AJBIEA76.html' },
				]
			},
			{
				title: '研究与探讨', list: [
					{ text: '浅析华商在构建 “周边命运共同体”中的角色价值', url: 'http://www.jstzql.com/case/2015/129/151291556530GF2C81GK6F6AJBIEA76.html' },
					{ text: '发挥华侨华人优势 推进粤港澳大湾区建设', url: 'http://www.jstzql.com/case/2015/129/151291556530GF2C81GK6F6AJBIEA76.html' },
					{ text: '特朗普政府为何表态 “美国欢迎中国', url: 'http://www.jstzql.com/case/2015/129/151291556530GF2C81GK6F6AJBIEA76.html' },
				]
			}
		]
	}
]);

const jumpTo = (url: string): void => {
	window.open(url, '_blank');
}


</script>

<style lang="scss" scoped>
.paper {
	padding: 10px 0 0 40px;
	position: relative;
	text-align: left;

	.paper-item {
		height: 120px;
		margin-bottom: 15px;
		overflow: hidden;
		display: flex;

		.left {
			width: 92px;
			height: 100%;

			img {
				width: 100%;
				height: 100%;
			}
		}

		.right {
			flex: 1;
			height: 100%;
			overflow: auto;
			margin-left: 20px;

			.item-content {
				padding-left: 20px;

				position: relative;
				margin-bottom: 6px;

				&::before {
					content: '';
					position: absolute;
					top: 8px;
					left: 3px;
					width: 2px;
					height: 100%;
					background: #1b4b93;
				}

				.title {
					font-size: 14px;
					margin-bottom: 6px;
					position: relative;

					&::before {
						content: '';
						position: absolute;
						top: 0;
						left: -20px;
						width: 8px;
						height: 8px;
						background: #1b4b93;
					}
				}

				.text {
					font-size: 12px;
					margin-bottom: 2px;
					cursor: pointer;
					&:hover {
						color: rgba(67, 229, 253, 1);
					}
				}
			}
		}
	}
}
</style>