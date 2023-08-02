<template>
  <div id="app">
    <div class="root" ref="root">
      <router-view :key="currentRoute" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router';

const currentRoute: any = ref(useRouter().currentRoute);

const root = ref();

const baseSize = ref({
  width: screen.width,
  height: screen.height,
  devicePixelRatio: devicePixelRatio
});

const clientParams = ref({
  innerHeight: innerHeight,
  innerWidth: innerWidth
});

const scalePx = ref(1);

const realWH = computed(() => {
  return {
    realWidth: baseSize.value.width * scalePx.value,
    realHeight: baseSize.value.height * scalePx.value
  }
});

const centerShow = () => {
  //  计算剩余空间的大小
  const widthSpace = clientParams.value.innerWidth - realWH.value.realWidth,
        heightSpace = clientParams.value.innerHeight - realWH.value.realHeight;
  
  console.log(widthSpace)

  root.value.style.left = widthSpace / 2 + 'px';
  root.value.style.top = heightSpace / 2 + 'px';
}

const getBaseSize = () => {
  baseSize.value = {
    width: parseFloat(getComputedStyle(root.value, null)['width']),
    height: parseFloat(getComputedStyle(root.value, null)['height']),
    devicePixelRatio: window.devicePixelRatio
  }
}

const getSize = () => {
  clientParams.value = {
    innerWidth: innerWidth,
    innerHeight: innerHeight
  }
  resizeWidth();
}
const resizeWidth = () => {
  // ui 设计稿   =>   宽 2520  高 1080
  const { width, height } = baseSize.value;
  const { innerHeight, innerWidth } = clientParams.value;
  
  if( (innerWidth / innerHeight) > ( width / height ) ) {
    scalePx.value = innerHeight / height;
    root.value.style.transform = `scale(${scalePx.value})`;
    //  获取当前元素的缩放比例
  } else if( (innerHeight / innerWidth) > ( height / width ) ) {
    scalePx.value = innerWidth / width;
    root.value.style.transform = `scale(${ scalePx.value })`;
  } else {
    scalePx.value = innerHeight / height;
    root.value.style.transform = `scale(${scalePx.value})`;
  }

  centerShow();
}

onBeforeMount(() => {
  window.onresize = () => {
    getSize();
  }
  //set tmp token when setting isNeedLogin false
});
onMounted(() => {
  getBaseSize();
  getSize();
});

</script> 
<style lang="scss">
@import 'animate.css';
@import '@/assets/css/reset.scss';
@import '@/assets/fonts/fonts.scss';
@import '@/assets/iconfonts/iconfont.css';

.d-control-progress,
.d-player-state,
.d-player-top {
  display: none !important;
}

.root {
  width: 2520px;
  height: 1080px;
  background-size: 100%;
  transform-origin: 0 0 0;
  position: relative;
}
</style>