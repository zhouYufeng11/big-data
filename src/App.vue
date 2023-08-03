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

import { uiWidth, uiHeight, baseSize } from './config/app'
import {clientSize, setClientSize } from './hooks'

const currentRoute: any = ref(useRouter().currentRoute);

  const root = ref();
  const scaleRatio = ref(1);

  //  设置 root 的宽高
  const setRootWH = () => {
    root.value.style.display = 'none';
    root.value.style.width = baseSize.width + 'px';
    root.value.style.height = baseSize.height + 'px';
    root.value.style.display = '';
  }

  const ratioRoot = function() {
    const { innerHeight, innerWidth } = clientSize;
    const { width, height } = baseSize;

    if( (innerWidth / innerHeight) > ( width / height ) ) { //  宽度较大，以高度为基准
      scaleRatio.value = innerHeight / height;
    } else if( (innerHeight / innerWidth) > ( height / width )  ) {
      scaleRatio.value = innerWidth / width;
    } else {
      scaleRatio.value = innerWidth / width;
    }

    root.value.style.transform = `scale(${ scaleRatio.value })`;

    centerShow();
  }

  //  居中显示
  const centerShow = () => {
    //  计算 盒子真实的宽高
    const { width, height } = baseSize;
    const { innerWidth, innerHeight } = clientSize;

    const sealWidth = width * scaleRatio.value,
          sealHeight = height * scaleRatio.value,
          left = (innerWidth - sealWidth) / 2,
          top = (innerHeight - sealHeight) / 2;
    
    console.log(top);
    root.value.style.display = 'none';
    root.value.style.left =  left + 'px';
    root.value.style.top = top + 'px';
    root.value.style.display = '';
  }
//  屏幕尺寸数据

onBeforeMount(() => {
  window.addEventListener('resize', function(ev) {
    ev.preventDefault();
    setClientSize();
    ratioRoot();
  }, false)
})

onMounted(() => {
  setRootWH();
  setClientSize();
  ratioRoot();
  
  window.scroll(0, 0);  //  定位
})



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
  transform-origin: 0 0 0;
  background-size: 100%;
  background: url('./assets/images/bg.png') center / cover no-repeat;
  position: relative;
  box-sizing: border-box;
}
</style>