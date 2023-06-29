<template>
  <div class="slider">
    <div class="slider-left">
      <a-carousel :auto-play="true" animation-name="card" show-arrow="never" indicator-type="never" direction="vertical" :move-speed="600"
      :style="{
          width: '100%',
          height: '250px',
        }">
        <a-carousel-item v-for="(v, i) in sliderList" :key="'sliderList_' + i">
          <div class="slider-item" @click="jumpTo(v.url)">
            <div class="item-left">
              <img :src="v.img">
            </div>
            <div class="item-right">
              <p class="item-title">{{ v.title }}</p>
              <p class="item-content">{{ v.content }}</p>
              <p class="item-bot">
                <span class="time">{{ v.time }}</span>
                <span class="from">{{ v.from }}</span>
                <span class="read"><i class="iconfont icon-eye"></i> {{ v.read }}</span>
              </p>
            </div>
          </div>
        </a-carousel-item>
      </a-carousel>
    </div>
    <div class="slider-right">
      <Line />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Line from '@/components/Echarts/Line/index.vue';

// const props = defineProps({
// dataList: {
// 	type: Object,
// 	default: { news: {}, whole: {}, city: {} }
// },
// })

const sliderList: any = [
  { title: '学中文感受多元世界，华裔青年探访中国', content: '4月20日正值谷雨时节，联合国迎来了一年一度的中文日。为庆祝这一意义重大的日子，中国常驻联合国代表团、联合国总部中文笔译处和联合国工作人员文娱理事会中国书会牵头举办了一系列丰富多彩的活动，以此宣传中文在联合国多边外交工作中的作用，彰显中国语言与文化的魅力。', time: '2022-04-20', from: '微信', read: '1028', img: 'https://resource.jszhuiming.com/overseas/f1.png', url: 'https://www.un.org/zh/observances/chinese-language-day', },
  { title: '学中文感受多元世界，华裔青年探访中国', content: '4月20日正值谷雨时节，联合国迎来了一年一度的中文日。为庆祝这一意义重大的日子，中国常驻联合国代表团、联合国总部中文笔译处和联合国工作人员文娱理事会中国书会牵头举办了一系列丰富多彩的活动，以此宣传中文在联合国多边外交工作中的作用，彰显中国语言与文化的魅力。', time: '2022-04-20', from: '头条', read: '2058', img: 'https://resource.jszhuiming.com/overseas/f2.png', url: 'https://www.un.org/zh/observances/chinese-language-day', },
  { title: '学中文感受多元世界，华裔青年探访中国', content: '4月20日正值谷雨时节，联合国迎来了一年一度的中文日。为庆祝这一意义重大的日子，中国常驻联合国代表团、联合国总部中文笔译处和联合国工作人员文娱理事会中国书会牵头举办了一系列丰富多彩的活动，以此宣传中文在联合国多边外交工作中的作用，彰显中国语言与文化的魅力。', time: '2022-04-20', from: '中国侨联', read: '2068', img: 'https://resource.jszhuiming.com/overseas/f3.png', url: 'https://www.un.org/zh/observances/chinese-language-day', },
];
const jumpTo = (url: string): void => {
  window.open(url, '_blank')
}

</script>

<style lang="scss" scoped>
.slider {
  display: flex;

  .slider-left {
    flex: 0 0 390px;

    .slider-item {
      display: flex;
      height: 100%;
      width: 100%;
      padding: 5px 10px;
      cursor: pointer;

      .item-left {
        width: 32%;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .item-right {
        flex: 1;
        margin-left: 10px;
        text-align: left;

        .item-title {
          font-size: 12px;
          overflow: hidden;
          white-space: nowrap;
        }

        .item-content {
          margin: 1px 0;
          font-size: 12px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .item-bot {
          span {
            font-size: 12px;
          }

          .time {
            margin-right: 20px;
          }

          .read {
            float: right;
            margin-right: 10px;
          }
        }
      }
    }

    .arco-carousel {
      .arco-carousel-card>* {
        height: 65px;
        width: 320px;
        transform: translateX(-40%) translateY(-45%) translateZ(0);
        background: rgba(26, 201, 255, 0.3);

        &:hover {
          background: rgba(26, 201, 255, 0.5);
        }
      }

      .arco-carousel-card {
        .arco-carousel-item-prev {
          opacity: 1;
          transform: translateX(-50%) translateY(15%) translateZ(0);
        }

        .arco-carousel-item-current {
          height: 75px;
          width: 370px;
          transform: translateX(-50%) translateY(112%) translateZ(0);
          background: rgba(26, 201, 255, 0.5);

          .slider-item {

            .item-right {
              .item-title {
                font-size: 14px;
              }

              .item-content {
                margin: 3px 0;
              }
            }
          }
        }

        .arco-carousel-item-next {
          opacity: 1;
          transform: translateX(-50%) translateY(258%) translateZ(0);
        }
      }
    }
  }

  .slider-right {
    flex: 1;
    margin-top: 10px;
  }
}
</style>
<style lang="scss">
@keyframes arco-carousel-card-bottom-to-middle {
  from {
    transform: translateX(-50%) translateY(15%) translateZ(0);
  }

  to {
    transform: translateX(-50%) translateY(258%) translateZ(0);
  }
}

@keyframes arco-carousel-card-middle-to-bottom {
  from {
    transform: translateX(-50%) translateY(258%) translateZ(0);
  }

  to {
    transform: translateX(-50%) translateY(15%) translateZ(0);
  }
}

@keyframes arco-carousel-card-top-to-middle {
  from {
    transform: translateX(-50%) translateY(112%) translateZ(0);
  }

  to {
    transform: translateX(-50%) translateY(15%) translateZ(0);
  }
}

@keyframes arco-carousel-card-middle-to-top {
  from {
    transform: translateX(-50%) translateY(15%) translateZ(0);
  }

  to {
    transform: translateX(-50%) translateY(112%) translateZ(0);
  }
}

@keyframes arco-carousel-card-bottom-to-middle-reverse {
  from {
    transform: translateX(-50%) translateY(112%) translateZ(0);
  }

  to {
    transform: translateX(-50%) translateY(15%) translateZ(0);
  }
}

@keyframes arco-carousel-card-middle-to-bottom-reverse {
  from {
    transform: translateX(-50%) translateY(15%) translateZ(0);
  }

  to {
    transform: translateX(-50%) translateY(112%) translateZ(0);
  }
}

@keyframes arco-carousel-card-top-to-middle-reverse {
  from {
    transform: translateX(-50%) translateY(112%) translateZ(0);
  }

  to {
    transform: translateX(-50%) translateY(258%) translateZ(0);
  }
}

@keyframes arco-carousel-card-middle-to-top-reverse {
  from {
    transform: translateX(-50%) translateY(258%) translateZ(0);
  }

  to {
    transform: translateX(-50%) translateY(112%) translateZ(0);
  }
}
</style>