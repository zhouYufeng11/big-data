<template>
  <div class="sub-choose-title">
    <div class="sub-choose-wrap">
      <p class="sub-choose-item" :class="[activeIndex === i && 'active']" v-for="(v, i) in title"
        :key="'sub-choose-title_' + i" @click="setActive(i)">{{ v }}</p>
    </div>
    <div class="sub-choose-arrow">
      <p class="bg"></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// let { proxy } = getCurrentInstance();
const props = defineProps({
  title: {
    type: Array,
    default: []
  },
});

const activeIndex = ref<number>(0);

const setActive = (index: number): void => {
  activeIndex.value = index;
}

</script>

<style lang="scss" scoped>
.sub-choose-title {
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

  .sub-choose-wrap {
    height: 40px;
    padding-top: 4px;
    padding-left: 32px;
    width: 100%;
    font-size: 18px;
    user-select: none;
    position: relative;
    color: #fff;
    display: flex;

    &::before {
      height: 40px;
      content: '';
      position: absolute;
      top: -1px;
      left: 0;
      bottom: 1px;
      right: 0;
      z-index: 1;
      background: linear-gradient(#325fac, #325fac) left top,
        linear-gradient(#325fac, #325fac) right top,
        linear-gradient(#325fac, #325fac) left bottom,
        linear-gradient(#325fac, #325fac) right bottom;
      background-repeat: no-repeat;
      background-size: 5px 2px;
    }

    .sub-choose-item {
      height: 30px;
      line-height: 30px;
      border: 1px solid transparent;
      padding: 0 25px;
      margin-right: 10px;
      cursor: pointer;
      z-index: 2;

      &.active,
      &:hover {
        border-color: #58b6ff;
        background: #082549;
      }
    }
  }

  .sub-choose-arrow {
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