<template>
  <div class="side-nav">
    <div
      v-for="(title, key) in Object.keys(data)"
      :key="key"
      class="group-container"
    >
      <p class="side-nav-title">{{ title }}</p>
      <template v-for="(nav, n) in data[title]">
        <div class="side-nav-items" v-if="nav.path" :key="n">
          <router-link :to="{ path: nav.path }">
            {{ nav.desc }}
          </router-link>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import navConf from "../nav.config.json"
export default {
  data() {
    return {
      data: navConf
    }
  }
}
</script>

<style lang="scss">
.side-nav {
  background-color: #fff;
  padding: 40px 0 20px;
  .group-container {
    margin-bottom: 32px;
  }
  .side-nav-title {
    padding: 0 24px 8px;
    color: #8dabc4;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  .side-nav-items {
    font-size: 14px;
    font-weight: normal;
    line-height: 1.8;
    a {
      display: block;
      padding: 8px 24px;
      color: #3f536e;
      font-weight: normal;
      line-height: 1.5;
      cursor: pointer;
      &:hover {
        color: #3faaf5;
        opacity: 0.9;
      }
      &.router-link-active {
        color: #409eff;
      }
    }
  }
}
</style>
