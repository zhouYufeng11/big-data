<template>
  <div class="root" ref="root">
    <router-view :key="currentRoute" />
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router';

const currentRoute: any = ref(useRouter().currentRoute);

const root = ref();
const screenParams = ref({
  innerWidth: innerWidth,
  innerHeight: innerHeight,
  screenWidth: window.screen.availWidth,
  screenHeight: window.screen.availHeight,
  devicePixelRatio: window.devicePixelRatio,
});

const getSize = () => {
  screenParams.value = {
    innerWidth: innerWidth,
    innerHeight: innerHeight,
    screenWidth: window.screen.availWidth,
    screenHeight: window.screen.availHeight,
    devicePixelRatio: window.devicePixelRatio,
  }
  resizeWidth();
}
const resizeWidth = () => {
  var ratio = screenParams.value.innerWidth / (root.value?.width || 2520);
  root.value.style.transform = "scale(" + ratio + ")"
}
onBeforeMount(() => {
  window.onresize = () => {
    getSize();
  }
  //set tmp token when setting isNeedLogin false
});
onMounted(() => {
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
  // background: url('./assets/images/bg.jpg') center / cover no-repeat;
}
</style>