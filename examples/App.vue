<template>
  <div id="app">
    <mainHeader class="header"></mainHeader>
    <div class="container" v-if="!isIndex">
      <sideNav class="nav"></sideNav>
      <transition name="fade" mode="out-in">
        <router-view class="view page-container"></router-view>
      </transition>
    </div>
    <router-view class="page" v-else></router-view>
    <!-- <mainFooter v-if="!isIndex"></mainFooter> -->
  </div>
</template>

<script>
/**
 * @file App.vue
 * @author shenjieping@techstar.com.cn
 * @data 2022-06-20 14:31:32
 */
import MainHeader from "./components/header.vue"
import MainFooter from "./components/footer.vue"
import SideNav from "./components/side-nav.vue"
export default {
  name: "App",
  components: {
    MainHeader,
    MainFooter,
    SideNav
  },
  data() {
    return {
      isIndex: false
    }
  },
  watch: {
    $route: {
      handler() {
        this.isIndex = this.$route.name === "pages"
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  .container {
    flex: 1;
    margin: 20px auto 20px;
    width: 90%;
    background-color: #fff;
    box-shadow: 0 4px 30px 0 rgba(223, 225, 230, 0.5);
    border-radius: 10px;
    display: flex;
    overflow: hidden;
    .nav {
      width: 210px;
      height: 100%;
      overflow: auto;
    }
    .view {
      flex: 1;
      overflow: auto;
      padding: 12px 48px 28px;
      margin: 20px 0;
      box-sizing: border-box;
    }
  }
  .page {
    flex: 1;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
