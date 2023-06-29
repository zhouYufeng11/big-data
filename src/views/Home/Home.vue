<template>
  <div class="home">
    <!-- 大标题 -->
    <TopTitle :title="title" :runDate="runDate" :username="username" />
    <div class="main">
      <div class="main-left animate__animated animate__fadeInLeft">
        <!-- 值班民警 -->
        <Pannel title="值班民警" :height="245">
          <!-- <News /> -->
        </Pannel>
        <!-- 警情列表 -->
        <Pannel title="警情列表" :height="280">
          <Politics />
        </Pannel>
        <!-- 过车数量 -->
        <Pannel title="过车数量" :height="250">
          <BarPie />
        </Pannel>
      </div>
      <div class="main-center animate__animated animate__fadeInUp">
        <div class="m-top">
          <div class="map">
            <Map :dataList="pieList" />
          </div>
          <div class="map-right">
            <div class="pie-pannel">
              <div class="pie-item" v-for="(v, i) in pieList" :key="'pieList_' + i">
                <Pie :curText="v.text" :curValue="v.value" :curKey="i" />
              </div>
            </div>
            <!-- 警务指令 -->
            <SubPannel title="警务指令">
              <Intro />
            </SubPannel>
          </div>
        </div>
        <div class="m-bot">
          <!-- 热点聚焦 -->
          <Pannel title="热点聚焦" :height="250">
            <Slider />
          </Pannel>
        </div>
      </div>
      <div class="main-right animate__animated animate__fadeInRight">
        <!-- 警务指令 -->
        <Pannel title="警务指令" :height="250">
          <Bar />
        </Pannel>
        <!-- 近期高发 -->
        <Pannel title="近期高发" :height="275">
          <News />
        </Pannel>
        <!-- 警力分布 -->
        <Pannel title="警力分布" :height="252">
          <ShowLine />
        </Pannel>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, onBeforeUnmount } from 'vue';
import TopTitle from '@/components/TopTitle/index.vue';
import Pannel from '@/components/Pannel/index.vue';
import SubPannel from '@/components/SubPannel/index.vue';
import News from '@/components/News/index.vue';
import Politics from '@/components/Politics/index.vue';
import BarPie from '@/components/Echarts/BarPie/index.vue';
import Map from '@/components/Echarts/Map/index.vue';
import Pie from '@/components/Echarts/Pie/index.vue';
import Intro from '@/components/Intro/index.vue';
import Slider from '@/components/Slider/index.vue';
import Bar from '@/components/Echarts/Bar/index.vue';
import Paper from '@/components/Paper/index.vue';
import ShowLine from '@/components/Echarts/ShowLine/index.vue';


const title = '情指行融合实战平台';
const runDate = ref(109);
const username = ref('admin');

const pieList = ref([
  { text: '兴化市', value: 1078 },
  { text: '泰兴市', value: 1856 },
  { text: '靖江市', value: 2654 },
  { text: '海陵区', value: 1866 },
  { text: '高港区', value: 1828 },
  { text: '姜堰区', value: 1853 },
])

</script> 
<style lang="scss">
.home {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;

  .main {
    display: flex;

    .main-left,
    .main-right {
      flex: 0 0 650px;
      width: 650px;
    }

    .main-left {
      padding-left: 40px;
    }

    .main-right {
      margin-right: 40px;
    }

    .main-center {
      flex: 1;
      padding: 34px 30px 0 30px;

      .m-top {
        display: flex;
      }

      .m-bot {
        margin-top: 23px;
      }

      .map {
        flex: 0 0 430px;
      }

      .map-right {
        flex: 1;
      }

      .pie-pannel {
        height: 260px;
        margin: 0 0 50px 0;
        display: flex;
        flex-wrap: wrap;

        .pie-item {
          height: 130px;
        }
      }
    }


  }
}
</style>