<template>
	<div class="pannel">
		<TipTitle :title="props.title" />
		<div class="pannel-wrap" :class="[border && 'hasBorder']" :style="{ height: height, width: width }">
			<slot></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import TipTitle from '@/components/TipTitle/index.vue';

const props = defineProps({
	title: {
		type: String,
		default: ''
	},
	width: {
		type: [Number, String],
		default: '100%'
	},
	height: {
		type: [Number, String],
		default: '245px'
	},
	border: {
		type: Boolean,
		default: true
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


</script>

<style lang="scss" scoped>
.pannel {
	position: relative;
	margin-bottom: 20px;
	width: 100%;

	.pannel-wrap {
		margin-top: 2px;
		background: rgba(0, 0, 0, 0.1);

		&.hasBorder {
			border: 2px solid transparent;
			border-image: linear-gradient(75deg, rgba(0, 28, 65, 0.8) 10%, #05233c 30%, rgba(26, 201, 255, .3) 70%, rgba(72, 108, 226, 0.2) 90%, transparent) 0 1 1 1;
		}
	}
}
</style>