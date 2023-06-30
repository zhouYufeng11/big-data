<template>
  <div class="home">
    <!-- 大标题 -->
    <TopTitle :title="title" />
    <div class="main">
      <div class="main-left animate__animated animate__fadeInLeft">
        <!-- 值班民警 -->
        <Pannel title="值班民警" :height="288" :type="1">
          <Police />
        </Pannel>
        <!-- 警情列表 -->
        <Pannel title="警情列表" :height="325" :type="2">
          <BarLine />
        </Pannel>
        <!-- 过车数量 -->
        <Pannel title="过车数量" :height="263" :type="3">
          <Line />
        </Pannel>
      </div>
      <div class="main-center">
        <div class="center-title animate__animated animate__fadeInDown animate__delay-1s">实时地图查看</div>
        <div class="center-bot animate__animated animate__fadeInUp"></div>
        <!-- <div class="m-top">
          <div class="map">
            <Map :dataList="pieList" />
          </div>
          <div class="map-right">
            <div class="pie-pannel">
              <div class="pie-item" v-for="(v, i) in pieList" :key="'pieList_' + i">
                <Pie :curText="v.text" :curValue="v.value" :curKey="i" />
              </div>
            </div>
            <SubPannel title="警务指令">
              <Intro />
            </SubPannel>
          </div>
        </div>
        <div class="m-bot">
          <Pannel title="热点聚焦" :height="250" :type="1">
            <Slider />
          </Pannel>
        </div> -->
      </div>
      <div class="main-right animate__animated animate__fadeInRight">
        <!-- 高发警情 -->
        <Pannel title="高发警情" :height="288" :type="1">
          <ShowTable :height="218" :head="head1" :list="table1" />
        </Pannel>
        <!-- 高发案件 -->
        <Pannel title="高发案件" :height="325" :type="2">
          <ShowTable :height="255" :head="head2" :list="table2" />
        </Pannel>
        <!-- 警力分布 -->
        <Pannel title="警力分布" :height="263" :type="3">
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
import Police from '@/components/Police/index.vue';
import ShowTable from '@/components/ShowTable/index.vue';
import Line from '@/components/Echarts/Line/index.vue';
import ShowLine from '@/components/Echarts/ShowLine/index.vue';
import BarLine from '@/components/Echarts/BarLine/index.vue';

const title = '情指行融合实战平台';


const head1: any = ref([
  { text: '类型', width: 80, },
  { text: '内容', width: 150, },
  { text: '时间', width: 80, },
  { text: '接警人', width: 60, },
]);

const table1: any = ref([
  { name: '陈程', content: '三水小区入室盗窃案涉案金额20w', time: '2023/05/06', type: 1, },
  { name: '王可可', content: '三水小区入室盗窃案涉案金额20w', time: '2023/05/06', type: 2, },
  { name: '陈国富', content: '三水小区入室盗窃案涉案金额20w', time: '2023/05/06', type: 3, },
  { name: '李建军', content: '三水小区入室盗窃案涉案金额20w', time: '2023/05/06', type: 3, },
  { name: '王菲', content: '三水小区入室盗窃案涉案金额20w', time: '2023/05/06', type: 4, },
  { name: '李尚', content: '三水小区入室盗窃案涉案金额20w', time: '2023/05/06', type: 4, },
  { name: '费婉', content: '三水小区入室盗窃案涉案金额20w', time: '2023/05/06', type: 1, },
  { name: '赵飞羽', content: '三水小区入室盗窃案涉案金额20w', time: '2023/05/06', type: 1, },
  { name: '孙建锋', content: '三水小区入室盗窃案涉案金额20w', time: '2023/05/06', type: 1, },
]);

const head2: any = ref([
  { text: '类型', width: 80, },
  { text: '内容', width: 150, },
  { text: '时间', width: 80, },
  { text: '接警人', width: 60, },
]);
const table2: any = ref([
  { name: '陈程', content: '三水小区入室盗窃案涉案金额20w', time: '2023/05/06', type: 1, },
  { name: '王可可', content: '三水小区入室盗窃案涉案金额20w', time: '2023/05/06', type: 2, },
  { name: '陈国富', content: '三水小区入室盗窃案涉案金额20w', time: '2023/05/06', type: 3, },
  { name: '李建军', content: '三水小区入室盗窃案涉案金额20w', time: '2023/05/06', type: 3, },
  { name: '王菲', content: '三水小区入室盗窃案涉案金额20w', time: '2023/05/06', type: 4, },
  { name: '李尚', content: '三水小区入室盗窃案涉案金额20w', time: '2023/05/06', type: 4, },
  { name: '费婉', content: '三水小区入室盗窃案涉案金额20w', time: '2023/05/06', type: 1, },
  { name: '赵飞羽', content: '三水小区入室盗窃案涉案金额20w', time: '2023/05/06', type: 1, },
  { name: '孙建锋', content: '三水小区入室盗窃案涉案金额20w', time: '2023/05/06', type: 1, },
]);


</script> 
<style lang="scss">
.home {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  background: url('../../assets/images/map.png') center center / contain no-repeat;

  .main {
    display: flex;

    .main-left,
    .main-right {
      flex: 0 0 630px;
      width: 630px;
    }

    .main-left {
      margin-left: 30px;
    }

    .main-right {
      margin-right: 30px;
    }

    .main-center {
      flex: 1;
      position: relative;
      background: linear-gradient(180deg, #011027 8%, rgba(5, 26, 60, 0.84) 15%, transparent);

      .center-title {
        width: 100%;
        height: 110px;
        background: url('../../assets//images/tip-title.png') bottom center / contain no-repeat;
        line-height: 40px;
        letter-spacing: 6px;
        text-indent: 6px;
        color: #fff;
        font-size: 38px;
        line-height: 70px;
        font-family: "YouSheBiaoTiHei";
        user-select: none;
        text-shadow: 0 0 8px #038fea, 0 0 12px #d7f2ff;
        position: relative;

        &::before,
        &::after {
          content: '';
          position: absolute;
          top: 10px;
          width: 99px;
          height: 38px;
          animation: fadeCur 3s ease-in-out infinite;
        }

        &::before {
          left: 120px;
          background: url('../../assets/images/left.png') center / contain no-repeat;
        }

        &::after {
          right: 120px;
          background: url('../../assets/images/right.png') center / contain no-repeat;
        }
      }

      .center-bot {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 220px;
        background: url('../../assets//images/bot.png') center / contain no-repeat;
      }

      // .m-top {
      //   display: flex;
      // }

      // .m-bot {
      //   margin-top: 23px;
      // }

      // .map {
      //   flex: 0 0 430px;
      // }

      // .map-right {
      //   flex: 1;
      // }

      // .pie-pannel {
      //   height: 260px;
      //   margin: 0 0 50px 0;
      //   display: flex;
      //   flex-wrap: wrap;

      //   .pie-item {
      //     height: 130px;
      //   }
      // }
    }
  }
}
</style>