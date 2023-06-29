<template>
  <div class="videoList">
    <div class="videoItem" v-for="(v, i) in videoList" :key="'videoList_' + i">
      <video :src="v.url" :poster="v.poster"></video>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// const props = defineProps({
// dataList: {
// 	type: Object,
// 	default: { news: {}, whole: {}, city: {} }
// },
// })

const videoList: any = ref([
  { url: '', poster: 'https://resource.jszhuiming.com/overseas/v1.png' },
  { url: '', poster: 'https://resource.jszhuiming.com/overseas/v2.png' },
  { url: '', poster: 'https://resource.jszhuiming.com/overseas/v3.png' },
  { url: '', poster: 'https://resource.jszhuiming.com/overseas/v4.png' },
]);


</script>

<style lang="scss" scoped>
.videoList {
  padding: 10px 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  .videoItem {
    width: 203px;
    height: 102px;
    margin: 0 5px 10px 5px;
    cursor: pointer;

    .video {
      height: 100%;
      width: 100%;
    }
  }
}
</style>