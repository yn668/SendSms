<template>
  <div class="cell">
    <van-cell-group inset>
      <van-cell title="充满电量" :value="scale" />
      <van-cell title="健康度" :value="health" />
      <van-cell title="充电器" :value="plugged" />
    </van-cell-group>
    <div class="g-container">
      <div class="g-number">{{ level }}</div>
      <div class="g-contrast">
        <div class="g-circle"></div>
        <ul class="g-bubbles">
          <li v-for="(item, index) in 15" :key="index"></li>
        </ul>
      </div>
    </div>
    <van-cell-group inset>
      <van-cell title="当前电压" :value="voltage" />
      <van-cell title="当前温度" :value="temperature" />
      <van-cell title="电池状态" :value="status" />
    </van-cell-group>
  </div>
</template>
<script>
import { ref, onBeforeMount } from 'vue';
import axios from '@/axios/axios'
import Util from "@/util/SmsForwardUtil";
import { GET_CELL } from "@/assets/api/api.js";
export default {
  name: "Cell",
  setup() {
    // 初始化电池信息
    const scale = ref('');
    const health = ref('');
    const plugged = ref('');
    const voltage = ref('');
    const temperature = ref('');
    const status = ref('');
    const level = ref('');
    onBeforeMount(() => {
      getPageList()
    })
    // 获取电池信息
    const getPageList = () => {
      let timestamp = new Date().getTime();
      let data = {
        "data": {},
        "timestamp": timestamp,
        "sign": Util.sisgn(timestamp, Util.sign())
      }
      axios.post(GET_CELL, data).then(response => {
        if (response.data.code === 200) {
          let cell = response.data.data
          // 给电池信息赋值
          scale.value = cell.scale
          health.value = cell.health
          plugged.value = cell.plugged
          voltage.value = cell.voltage
          temperature.value = cell.temperature
          status.value = cell.status
          level.value = cell.level
        }
      })
    }
    return {
      getPageList,
      scale,
      health,
      plugged,
      voltage,
      temperature,
      status,
      level
    };
  },
};
</script>
<!-- 以下为电池充电动画样式 -->
<style scoped lang="less">
.cell {
  width: 100%;
  display: flex;
  overflow: hidden;
  flex: 1;

  .van-cell {
    flex-direction: column;
    align-items: center;
    font-weight: 700;
  }
}

.van-cell-group {
  margin-top: 2.5rem;
  background-color: @dominant-tone;
}

.g-number {
  position: absolute;
  top: 23%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  font-size: 1rem;
  z-index: 10;
  font-weight: 800;
  color: #fff;
}

.g-container {
  position: relative;
  height: 12.5rem;
  flex: 1;
}

.g-contrast {
  filter: contrast(10) hue-rotate(0);
  height: 15rem;
  overflow: hidden;
  -webkit-animation: hueRotate 10s infinite linear;
  animation: hueRotate 10s infinite linear;
}

.g-circle {
  position: relative;
  // width: 9.38rem;
  height: 9.38rem;
  box-sizing: border-box;
  filter: blur(.25rem);
}

.g-circle::after {
  content: "";
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(0);
  width: 6.25rem;
  height: 6.25rem;
  background-color: #00ff6f;
  border-radius: 42% 38% 62% 49%/45%;
  -webkit-animation: rotate 10s infinite linear;
  animation: rotate 10s infinite linear;
}

.g-circle::before {
  content: "";
  position: absolute;
  width: 5.5rem;
  height: 5.5rem;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background-color: #1c16169c;
  z-index: 10;
}

.g-bubbles {
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 3.13rem;
  height: 1.25rem;
  transform: translate(-50%, 0);
  border-radius: 3.13rem 3.13rem 0 0;
  background-color: #00ff6f;
  filter: blur(.31rem);
}

li {
  position: absolute;
  border-radius: 50%;
  background: #00ff6f;
}

li:nth-child(0) {
  left: 2.63rem;
  top: 50%;
  transform: translate(-50%, -50%);
  width: .59rem;
  height: .59rem;
  -webkit-animation: moveToTop 9s ease-in-out -2.385s infinite;
  animation: moveToTop 9s ease-in-out -2.385s infinite;
}

li:nth-child(1) {
  left: 1.88rem;
  top: 50%;
  transform: translate(-50%, -50%);
  width: .59rem;
  height: .59rem;
  -webkit-animation: moveToTop 9s ease-in-out -3.909s infinite;
  animation: moveToTop 9s ease-in-out -3.909s infinite;
}

li:nth-child(2) {
  left: 2.5rem;
  top: 50%;
  transform: translate(-50%, -50%);
  width: .56rem;
  height: .56rem;
  -webkit-animation: moveToTop 7s ease-in-out -4.123s infinite;
  animation: moveToTop 7s ease-in-out -4.123s infinite;
}

li:nth-child(3) {
  left: .84rem;
  top: 50%;
  transform: translate(-50%, -50%);
  width: .94rem;
  height: .94rem;
  -webkit-animation: moveToTop 7s ease-in-out -4.339s infinite;
  animation: moveToTop 7s ease-in-out -4.339s infinite;
}

li:nth-child(4) {
  left: 1.63rem;
  top: 50%;
  transform: translate(-50%, -50%);
  width: .5rem;
  height: .5rem;
  -webkit-animation: moveToTop 6s ease-in-out -2.414s infinite;
  animation: moveToTop 6s ease-in-out -2.414s infinite;
}

li:nth-child(5) {
  left: .81rem;
  top: 50%;
  transform: translate(-50%, -50%);
  width: .69rem;
  height: .69rem;
  -webkit-animation: moveToTop 6s ease-in-out -3.445s infinite;
  animation: moveToTop 6s ease-in-out -3.445s infinite;
}

li:nth-child(6) {
  left: 1.75rem;
  top: 50%;
  transform: translate(-50%, -50%);
  width: .5rem;
  height: .5rem;
  -webkit-animation: moveToTop 9s ease-in-out -4.624s infinite;
  animation: moveToTop 9s ease-in-out -4.624s infinite;
}

li:nth-child(7) {
  left: 2.69rem;
  top: 50%;
  transform: translate(-50%, -50%);
  width: .56rem;
  height: .56rem;
  -webkit-animation: moveToTop 8s ease-in-out -2.688s infinite;
  animation: moveToTop 8s ease-in-out -2.688s infinite;
}

li:nth-child(8) {
  left: .94rem;
  top: 50%;
  transform: translate(-50%, -50%);
  width: .94rem;
  height: .94rem;
  -webkit-animation: moveToTop 7s ease-in-out -3.874s infinite;
  animation: moveToTop 7s ease-in-out -3.874s infinite;
}

li:nth-child(9) {
  left: 3.94rem;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 1.56rem;
  height: 1.56rem;
  -webkit-animation: moveToTop 7s ease-in-out -3.994s infinite;
  animation: moveToTop 7s ease-in-out -3.994s infinite;
}

li:nth-child(10) {
  left: 1.19rem;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 1.56rem;
  height: 1.56rem;
  -webkit-animation: moveToTop 4s ease-in-out -4.313s infinite;
  animation: moveToTop 4s ease-in-out -4.313s infinite;
}

li:nth-child(11) {
  left: 2.31rem;
  top: 50%;
  transform: translate(-50%, -50%);
  width: .69rem;
  height: .69rem;
  -webkit-animation: moveToTop 4s ease-in-out -3.39s infinite;
  animation: moveToTop 4s ease-in-out -3.39s infinite;
}

li:nth-child(12) {
  left: 2.31rem;
  top: 50%;
  transform: translate(-50%, -50%);
  width: .88rem;
  height: .88rem;
  -webkit-animation: moveToTop 6s ease-in-out -2.841s infinite;
  animation: moveToTop 6s ease-in-out -2.841s infinite;
}

li:nth-child(13) {
  left: 1.38rem;
  top: 50%;
  transform: translate(-50%, -50%);
  width: .94rem;
  height: .94rem;
  -webkit-animation: moveToTop 9s ease-in-out -2.892s infinite;
  animation: moveToTop 9s ease-in-out -2.892s infinite;
}

li:nth-child(14) {
  left: 2.31rem;
  top: 50%;
  transform: translate(-50%, -50%);
  width: .81rem;
  height: .81rem;
  -webkit-animation: moveToTop 9s ease-in-out -4.554s infinite;
  animation: moveToTop 9s ease-in-out -4.554s infinite;
}

li:nth-child(15) {
  left: 1.31rem;
  top: 50%;
  transform: translate(-50%, -50%);
  width: .63rem;
  height: .63rem;
  -webkit-animation: moveToTop 6s ease-in-out -3.92s infinite;
  animation: moveToTop 6s ease-in-out -3.92s infinite;
}

@-webkit-keyframes rotate {
  50% {
    border-radius: 45%/42% 38% 58% 49%;
  }

  100% {
    transform: translate(-50%, -50%) rotate(720deg);
  }
}

@keyframes rotate {
  50% {
    border-radius: 45%/42% 38% 58% 49%;
  }

  100% {
    transform: translate(-50%, -50%) rotate(720deg);
  }
}

@-webkit-keyframes moveToTop {
  90% {
    opacity: 1;
  }

  100% {
    opacity: 0.1;
    transform: translate(-50%, -11.25rem);
  }
}

@keyframes moveToTop {
  90% {
    opacity: 1;
  }

  100% {
    opacity: 0.1;
    transform: translate(-50%, -11.25rem);
  }
}

@-webkit-keyframes hueRotate {
  100% {
    filter: contrast(15) hue-rotate(360deg);
  }
}

@keyframes hueRotate {
  100% {
    filter: contrast(15) hue-rotate(360deg);
  }
}
</style>
