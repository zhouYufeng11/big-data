<template>
	<div class="pannel" :class="[type === 1 ? 'pannel1' : type === 2 ? 'pannel2' : 'pannel3']"
		:style="{ height: height + 'px', width: width + 'px' }">
		<TipTitle :title="props.title" />
		<div class="pannel-wrap" :style="{ height: height - 70 + 'px', width: width + 'px' }">
			<slot></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import TipTitle from '@/components/TipTitle/index.vue';

const props = defineProps({
	title: {
		type: String,
		default: ''
	},
	width: {
		type: [Number],
		default: 630
	},
	height: {
		type: [Number],
		default: 288
	},
	type: {
		type: Number,
		default: 1
	}
})

const curType = ref(props.type)

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
	margin-bottom: 30px;
	width: 100%;
	height: 100%;
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;

	&.pannel1 {
		background-image: url('../../assets/images/pannel1.png');
	}

	&.pannel2 {
		background-image: url('../../assets/images/pannel2.png');
	}

	&.pannel3 {
		background-image: url('../../assets/images/pannel3.png');
	}


	.pannel-wrap {
		background: linear-gradient(180deg, #011027 20%, rgba(5, 26, 60, 0.84) 50%, transparent);
	}
}
</style>