<template>
  <div class="show">
    <!-- 大标题 -->
    <TopSubTitle :title="title" :runDate="runDate" :username="username" />
    <div class="main">
      <div class="main-left animate__animated animate__fadeInLeft">
        <!-- 华侨洲际分布 -->
        <SubPannel title="华侨洲际分布" :height="180">
          <ShowLine />
        </SubPannel>
        <!-- 侨联资讯 -->
        <SubPannel title="侨联资讯" :height="258">
          <ShowNews />
        </SubPannel>
        <!-- 华侨捐款 -->
        <SubPannel :title="['华侨捐款', '华侨捐赠']" :height="285">
          <BarList />
        </SubPannel>
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
            <!-- 侨联简介 -->
            <SubPannel title="侨联简介">
              <Intro />
            </SubPannel>
          </div>
        </div>
        <div class="m-bot">
          <!-- 华侨捐款 -->
          <SubPannel :title="['华侨国家分布', '华侨年龄分布']" :height="240">
            <BotLine />
          </SubPannel>
        </div>
      </div>
      <div class="main-right animate__animated animate__fadeInRight">
        <!-- 侨联人才类型分布 -->
        <SubPannel title="侨联人才类型分布" :height="235">
          <Distribution />
        </SubPannel>
        <!-- 为侨服务 -->
        <SubPannel title="为侨服务" :height="320">
          <Service />
        </SubPannel>
         <!-- 华侨基地分布 -->
        <SubPannel title="华侨基地分布" :height="195">
           <PieCompar />
        </SubPannel>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, onBeforeUnmount } from 'vue';
import TopSubTitle from '@/components/TopSubTitle/index.vue';
import SubPannel from '@/components/SubPannel/index.vue';
import Map from '@/components/Echarts/Map/index.vue';
import Pie from '@/components/Echarts/Pie/index.vue';
import Intro from '@/components/Intro/index.vue';
import ShowLine from '@/components/Echarts/ShowLine/index.vue';
import ShowNews from '@/components/ShowNews/index.vue';
import BarList from '@/components/Echarts/BarList/index.vue';
import BotLine from '@/components/Echarts/BotLine/index.vue';
import Distribution from '@/components/Distribution/index.vue';
import Service from '@/components/Service/index.vue';
import PieCompar from '@/components/Echarts/PieCompar/index.vue';

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
.show {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;

  .main {
    display: flex;
    margin-top: -50px;

    .main-left {
      flex: 0 0 435px;
      padding-left: 40px;
    }

    .main-center {
      flex: 1;
      padding: 34px 30px 0 30px;

      .m-top {
        display: flex;
        justify-content: space-between;
        padding: 0 20px;
      }

      .m-bot {
        margin-top: 23px;
      }

      .map {
        flex: 0 0 430px;
      }

      .map-right {
        flex: 0 0 360px;
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

    .main-right {
      flex: 0 0 435px;
      margin-right: 40px;
    }
  }
}
</style>