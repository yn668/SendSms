<!-- 加载动画组件 -->

<template>
  <!-- 加载动画容器 -->
  <div class="global-loading-wrap">
    <!-- 通过transition定义加载动画进入离开效果 -->
    <transition name="loading-animate-enter-leave">
      <!-- 加载动画背景 -->
      <div class="global-loading-background popup-window-background" v-if="showLoading">
        <!-- 加载动画内容 -->
        <div class="global-loading-animate-content">
          <!-- 加载动画 -->
          <div class="loading-animate">
            <i class="loading-rotate-animate-1"></i>
            <i class="loading-rotate-animate-2"></i>
            <i class="loading-rotate-animate-3"></i>
            <img src="../static/image/smsmsg.png" alt="" />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { computed } from 'vue';
import store from '../store/index'
export default {

  setup() {
    // 计算属性显示Vuex内容
    // 加载动画可见状态
    const showLoading = computed(() => {
      return (store.state.showLoading)
    });
    return {
      computed,
      showLoading
    };
  },
};

</script>

<style lang="less" scoped>
// 加载动画容器
.global-loading-wrap {
  width: 100%;
  height: 100%;

  // 加载动画背景
  .global-loading-background {
    width: 100%;
    height: 100%;
    z-index: 1000000;

    // 加载动画内容
    .global-loading-animate-content {
      width: 4.1rem;
      height: 4.1rem;
      margin: -2rem 0rem 0rem -2rem;
      position: fixed;
      top: 50%;
      left: 50%;

      // 加载动画
      .loading-animate {
        width: 4.1rem;
        height: 4.1rem;
        position: relative;

        img {
          width: 1.5rem;
          height: 1.5rem;
          //   background-color: rgba(255, 255, 255, 0.45);
          //   border: 1.4rem solid rgb(118, 168, 210);
          border-radius: 50%;
          //   margin: -0.85rem 0rem 0rem -0.85rem;
          transform: translate(-50%, -50%);
          position: absolute;
          top: 50%;
          left: 50%;
        }

        i {
          display: block;
          border-radius: 50%;
          position: absolute;
          top: 7%;
          left: 11%;
        }

        .loading-rotate-animate-1 {
          width: 3.05rem;
          height: 3.05rem;
          border: 0.13rem solid #0067c2;
          border-color: transparent #0067c2;
          animation: loading 1s ease-in-out 0.3s infinite reverse;
        }

        .loading-rotate-animate-2 {
          width: 2.56rem;
          height: 2.56rem;
          border: 0.078rem solid rgb(70, 70, 1);
          border-color: transparent rgb(183, 183, 12);
          margin: .38rem .31rem;
          animation: loading 1s ease-in-out 0.2s infinite;
        }

        .loading-rotate-animate-3 {
          width: 3.05rem;
          height: 3.05rem;
          border: 0.13rem solid#0067c2;
          border-color: transparent #0067c2;
          animation: loading 1s ease-in-out 0.1s infinite reverse;
        }
      }
    }
  }
}

// 加载动画
@keyframes loading {
  0% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(180deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

// 定义进入时的过渡状态
.loading-animate-enter-leave-enter-active {
  transition: all 0.1s ease;
}

// 定义离开时的过渡状态
.loading-animate-enter-leave-leave-active {
  transition: all 0.5s ease;
}

// 定义进入的过度状态
.loading-animate-enter-leave-enter {
  opacity: 0;
}

// 定义离开的动画效果
.loading-animate-enter-leave-leave-to {
  opacity: 0;
}
</style>
