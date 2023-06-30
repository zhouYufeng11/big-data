<template>
  <div class="top-title animate__animated animate__fadeInDown">
    <p class="title" @click="jumpTo">{{ title }}</p>
    <p class="weather">
      <img src="../../assets/images/sun.png" alt="天气">
    </p>
    <p class="time">
      {{ timer }}
    </p>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
})

const timer = ref('');
const getNowTime = () => {
  setInterval(() => {
    //获取年月日
    var time = new Date();
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var day = time.getDate();
    //获取时分秒
    var h = time.getHours();
    var m = time.getMinutes();
    var s = time.getSeconds();
    //检查是否小于10
    month = checkTime(month);
    day = checkTime(day);
    h = checkTime(h);
    m = checkTime(m);
    s = checkTime(s);
    timer.value = `${year}-${month}-${day} ${h}:${m}:${s}`;
  }, 1000);
}

const checkTime = (i: any) => { // 时间数字小于10，则在之前加个 '0' 补位。
  var num;
  i < 10 ? num = '0' + i : num = i;
  return num;
}

onMounted(() => {
  getNowTime();
})

const router = useRouter()

const jumpTo = () => {
  // router.push("/show")
}
</script>

<style lang="scss" scoped>
.top-title {
  width: 100%;
  height: 115px;
  position: relative;
  background: url("../../assets/images/top-title.png") center / cover no-repeat;

  .title {
    line-height: 110px;
    font-family: "YouSheBiaoTiHei";
    user-select: none;
    cursor: pointer;
    font-size: 66px;
    letter-spacing: 10px;
    text-indent: 10px;
    text-shadow: 0 0 8px #038fea, 0 0 12px #d7f2ff;
    // background-image: linear-gradient(180deg, #fff 28%, #d7f2ff);
    // -webkit-background-clip: text;
    // -webkit-text-fill-color: transparent;
  }

  .weather {
    position: absolute;
    left: 30px;
    top: 36px;
    user-select: none;
  }

  .time {
    position: absolute;
    right: 300px;
    top: 25px;
    cursor: pointer;
    user-select: none;
    font-size: 26px;

  }
}
</style>