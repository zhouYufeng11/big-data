<template>
  <div class="home">
    <HLMap />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, onBeforeUnmount } from 'vue';
import HLMap from '@/components/Echarts/Map/hl.vue';

</script> 
<style lang="scss">
.home {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 100px;
  background: #00013A;
}
</style>