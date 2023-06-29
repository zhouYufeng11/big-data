<template>
	<div class="distribution">
		<div class="left">
			<img src="../../assets/images/p1.png">
		</div>
		<div class="right">
			<p class="dis-item" v-for="(v, i) in disList">
				<span class="text">{{ v.text }}</span>
				<span class="value"><i>{{ v.value }}</i> 人</span>
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const disList = ref([
	{ text: '国家级海外顾问', value: '1,526' },
	{ text: '国家级海外委员', value: '888' },
	{ text: '省级海外顾问', value: '662' },
	{ text: '市级海外顾问', value: '566' },
	{ text: '区级海外顾问', value: '366' },
])
</script>

<style lang="scss" scoped>
.distribution {
	display: flex;
	padding-top: 10px;
	padding-right: 40px;

	.left {
		padding-top: 10px;
		flex: 0 0 175px;
		font-size: 0;
		pointer-events: none;
		user-select: none;
	}

	.right {
		flex: 1;
		text-align: left;
		padding-left: 20px;
		padding-top: 4px;

		.dis-item {
			display: flex;
			justify-content: space-between;
			height: 39px;
			line-height: 39px;

			span {
				font-family: 'HanSansCN';
				font-size: 14px;
			}

			i {
				font-size: 16px;
				margin-right: 10px;
				font-family: 'YouSheBiaoTiHei';
				color: #7df9f4;
			}
		}
	}
}
</style>