<template>
  <div class="sub-title">
    <div class="sub-wrap">
      {{ title }}
    </div>
    <div class="sub-arrow">
      <p class="bg"></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, onMounted, reactive, onBeforeUnmount } from 'vue';

// let { proxy } = getCurrentInstance();
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
})

</script>

<style lang="scss" scoped>
.sub-title {
  width: 100%;
  font-family: 'YouSheBiaoTiHei';
  height: 40px;
  line-height: 40px;
  position: relative;
  text-align: left;
  border: 1px solid #112e5c;
  border-left: 0;
  border-right: 0;
  margin-bottom: 15px;

  &::before {
    position: absolute;
    left: 2px;
    top: 10px;
    content: '';
    width: 17px;
    height: 17px;
    background: url('../../assets/images/tip-left.png') center / cover no-repeat;
  }

  .sub-wrap {
    padding-left: 32px;
    width: 100%;
    font-size: 18px;
    user-select: none;
    position: relative;
    color: #fff;

    &::before {
      content: '';
      position: absolute;
      top: -1px;
      left: 0;
      bottom: 1px;
      right: 0;
      background: linear-gradient(#325fac, #325fac) left top,
        linear-gradient(#325fac, #325fac) right top,
        linear-gradient(#325fac, #325fac) left bottom,
        linear-gradient(#325fac, #325fac) right bottom;
      background-repeat: no-repeat;
      background-size: 5px 2px;
    }
  }

  .sub-arrow {
    position: absolute;
    right: 2px;
    top: 13px;
    width: 30px;
    height: 12px;

    .bg {
      width: 30px;
      height: 12px;
      background: url('../../assets/images/tip-right.png') center left / cover no-repeat;
      animation: fadeCur 2s ease-out infinite;
    }
  }
}

@keyframes fadeCur {
  0% {
    opacity: 0;
  }

  30% {
    opacity: 1;
  }

  60% {
    opacity: .6;
  }

  70% {
    opacity: .2;
  }

  80% {
    opacity: .8;
  }

  100% {
    opacity: 1;
  }
}
</style>