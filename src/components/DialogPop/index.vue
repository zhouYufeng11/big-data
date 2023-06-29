<template>
	<div class="dialog-pop animate__animated animate__fadeInLeft" :style="{ height: currentHeight, width: currentWidth }">
		<div class="close" @click="closeDialog">
			<p class="iconfont icon-close"></p>
		</div>
		<slot></slot>
	</div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'

const props = defineProps({
	width: {
		type: [Number, String],
		default: '70%'
	},
	height: {
		type: [Number, String],
		default: '80%'
	}
})

let currentHeight = computed(() => {
	if (typeof props.height === 'string')
		if (/^\d$/g.test(props.height)) return props.height + 'px'
		else return props.height
	else return props.height + 'px'
});

let currentWidth = computed(() => {
	if (typeof props.width === 'string')
		if (/^\d$/g.test(props.width)) return props.width + 'px'
		else return props.width
	else return props.width + 'px'
})

// 关闭 dialog
const emit = defineEmits<{ (e: 'closePop'): void }>()
const closeDialog = () => { emit('closePop') }

</script>

<style lang="scss" scoped>
.dialog-pop {
	position: absolute;
	// left: 50%;
	// top: 50%;
	z-index: 9;
	margin-top: 5%;
	margin-left: 15%;
	// transform: translate(-50%, -50%);
	background: rgba(161, 193, 226, 0.9);
	border: 4px solid transparent;
	box-shadow: inset 0 0 20px rgba(95, 172, 255, .3);
	border-image: linear-gradient(60deg, rgba(95, 172, 255, .9) 30%, rgba(201, 238, 214, 0.5) 60%) 1 1;
	// animation-fill-mode: backwards;
	padding: 20px;
	overflow-x: hidden;
	overflow-y: auto;

	.close {
		position: relative;
		z-index: 2;
		width: 70px;
		height: 60px;
		float: right;
		margin-top: -20px;
		margin-right: -20px;
		text-align: center;
		line-height: 60px;
		cursor: pointer;

		&:hover {

			.iconfont {
				color: #000;
				transition: all .3s linear;
				transform: rotate(180deg);
			}
		}

		.iconfont {
			transition: all .3s linear;
			font-size: 30px;
		}
	}
}
</style>