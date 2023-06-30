<template>
  <div class="policeList">
    <div class="police-item" v-for="(v, i) in policeList" :key="i">
      <div class="police-wrap" :class="[v.active && 'active']">
        <p class="type">{{ v.type }}</p>
        <p class="img-box">
          <img src="../../assets/images/po.jpg" alt="民警">
        </p>
        <p class="name">{{ v.name }}</p>
        <p class="num">{{ v.num }}</p>
      </div>
    </div>
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

const policeList: any = ref([]);

onMounted(() => {
  policeList.value = [
    { type: '代班领导', name: '王小辉', num: '129666', img: '', active: 1 },
    { type: '指挥长', name: '李明华', num: '129666', img: '', active: 0 },
    { type: '综合民警', name: '赵晓田', num: '129666', img: '', active: 0 },
    { type: '情报民警', name: '周武一', num: '129666', img: '', active: 0 },
  ]
});

// const router = useRouter()

// const jumpTo = () => {
//   router.push("/")
// }
</script>

<style lang="scss" scoped>
.policeList {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px 30px 0 30px;

  .police-item {
    width: 131px;
    height: 203px;
    text-align: center;
    background: linear-gradient(180deg, rgba(0, 20, 69, 0.91) 5%, rgba(2, 42, 103, 0.33) 98%);

    .police-wrap {
      height: 100%;
      width: 100%;
      background: url('../../assets/images/p2.png') center / cover no-repeat;

      &.active {
        background-image: url('../../assets/images/p1.png');

        .name,
        .num {
          color: #1AEEB9;
        }
      }
    }

    .img-box {
      width: 90px;
      height: 110px;
      margin: 10px auto 0 auto;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .type {
      text-align: center;
      height: 22px;
      line-height: 22px;
    }

    .name,
    .num {
      color: #19C0FF;
      letter-spacing: 3px;
      text-indent: 3px;
    }

    .name {
      font-size: 16px;
      margin: 1.5px auto 3px auto;
    }
  }
}
</style>