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
import { highIncidenceInstanceList, highIncidenceCaseList } from '@/api/index';
import { dic_HighCategory } from '@/api/dic';
import { Message } from '@arco-design/web-vue';
const title = '情指行融合实战平台';

const head1: any = ref([
  { text: '类型', width: 80, },
  { text: '内容', width: 150, },
  { text: '时间', width: 80, },
  { text: '接警人', width: 60, },
]);

const table1: any = ref([]);

const head2: any = ref([
  { text: '类型', width: 80, },
  { text: '内容', width: 150, },
  { text: '时间', width: 80, },
  { text: '接警人', width: 60, },
]);
const table2: any = ref([]);

const typeList: any = ref([]);
const checkType = (type: string): string => {
  return typeList.value.find((s: any) => s.key === type)?.value || '未知';
}

// 字典
const fetchDicData = async () => {
  return await dic_HighCategory({}).then((res: any) => {
    if (res.code = 200) {
      typeList.value = res.data.map((s: any) => {
        return { key: s.dictValue, value: s.dictLabel }
      });
    } else {
      Message.error(res.msg)
    }
  }).catch(err => {
    console.log(err)
  })
}
const fetchData = async () => {
  return await highIncidenceInstanceList({}).then((res: any) => {
    if (res.code === 200) {
      table1.value = res.rows.map((s: any) => {
        return { name: s.caseReceiverName, content: s.caseContent, time: s.caseArlarmTime, typeName: checkType(s.highIncidenceCode) }
      })
    } else {
      Message.error(res.msg)
    }
  }).catch(err => {
    console.log(err)
  })
}

const fetchData2 = async () => {
  return await highIncidenceCaseList({}).then((res: any) => {
    if (res.code === 200) {
      table2.value = res.rows.map((s: any) => {
        return { name: s.caseReceiverName, content: s.caseContent, time: s.caseArlarmTime, typeName: checkType(s.caseCategoryCode) }
      })
    } else {
      Message.error(res.msg)
    }
  }).catch(err => {
    console.log(err)
  })
}

onMounted(async () => {
  await fetchDicData();
  fetchData();
  fetchData2();
})



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