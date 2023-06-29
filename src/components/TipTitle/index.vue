<template>
  <div class="tip-title">
    <div class="tip-wrap">
      {{ title }}
    </div>
    <div class="tip-arrow">
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
.tip-title {
  font-family: 'YouSheBiaoTiHei';
  height: 34px;
  line-height: 34px;
  position: relative;
  text-align: left;
  margin-left: 12px;
  border: 1px solid transparent;
  border-image: linear-gradient(75deg, rgba(26, 201, 255, .95) 20%, rgba(26, 201, 255, .5) 50%, rgba(0, 28, 65, 0.8) 70%, transparent) 0 0 1 0;

  &::before {
    position: absolute;
    left: -12px;
    top: 0;
    content: '';
    width: 8px;
    height: 34px;
    background: linear-gradient(to right, rgba(26, 201, 255, .5) 30%, transparent);
  }

  .tip-wrap {
    padding-left: 20px;
    width: 100%;
    background: linear-gradient(to right, rgba(26, 201, 255, .5) 5%, transparent);
    font-size: 24px;
    letter-spacing: 2px;
    text-indent: 2px;
    user-select: none;
    position: relative;
    color: #fff;
  }

  .tip-arrow {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 50px;
    height: 14px;

    .bg {
      width: 50px;
      height: 14px;
      background: url('../../assets/images/arrow.png') center left / cover no-repeat;
      animation: fadeCur 2s ease-out infinite;
    }
  }
}

@keyframes fadeCur {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 0;
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