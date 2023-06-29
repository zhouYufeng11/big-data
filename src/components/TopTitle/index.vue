<template>
  <div class="top-title animate__animated animate__fadeInDown">
    <p class="title" @click="jumpTo">{{ title }}</p>
    <p class="runtime">
      <span class="text">平台运营时间</span>
      <span class="num">{{ runDate }}</span>
      <span class="unit">天</span>
    </p>
    <p class="userInfo">
      <i class="iconfont icon-admin"></i>
      <span>欢迎您，{{ username }}</span>
      <i class="iconfont icon-arrow-down"></i>
    </p>
  </div>
</template>


<script setup lang="ts">
import { ref, computed } from "vue"
import { useRouter } from "vue-router"

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  runDate: {
    type: Number,
    default: "",
  },
  username: {
    type: String,
    default: "",
  },
})

const router = useRouter()

const jumpTo = () => {
  router.push("/show")
}
</script>

<style lang="scss" scoped>
.top-title {
  width: 100%;
  height: 105px;
  position: relative;
  background: url("../../assets/images/top.png") center / contain no-repeat;

  .title {
    line-height: 70px;
    font-size: 46px;
    font-family: "YouSheBiaoTiHei";
    user-select: none;
    cursor: pointer;
  }

  .runtime {
    position: absolute;
    left: 40px;
    top: 12px;
    height: 40px;
    line-height: 40px;
    user-select: none;

    span {
      vertical-align: middle;
    }

    .text,
    .unit {
      font-size: 16px;
    }

    .num {
      font-size: 35px;
      color: #1c91d4;
      margin: 0 10px;
      font-family: "YouSheBiaoTiHei";
    }
  }

  .userInfo {
    position: absolute;
    right: 40px;
    top: 12px;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
    user-select: none;

    span {
      font-size: 16px;
      vertical-align: middle;
    }

    i {
      vertical-align: middle;
      margin: 0 10px;
      font-size: 18px;
    }
  }
}
</style>