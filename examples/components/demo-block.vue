<template>
  <div class="docs-demo-wrapper">
    <div class="source">
      <slot name="source"></slot>
    </div>
    <transition name="height">
      <div class="demo-container" v-show="isExpand">
        <div class="docs-demo docs-demo--expand">
          <div class="description" v-if="$slots.default">
            <slot></slot>
          </div>
          <div class="highlight-wrapper">
            <slot name="highlight"></slot>
          </div>
        </div>
      </div>
    </transition>
    <span class="docs-trans docs-demo__triangle" @click="toggle">
      {{ isExpand ? "隐藏代码" : "显示代码" }}
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isExpand: false
    }
  },
  methods: {
    toggle() {
      this.isExpand = !this.isExpand
    }
  }
};
</script>

<style lang="scss">
.docs-demo-wrapper {
  border: 1px solid #eee;
  border-radius: 4px;
  overflow: hidden;
  margin: 20px 0;
  .source {
    padding: 20px;
  }
  .description {
    border: 1px solid #eee;
    border-radius: 4px;
    background: #fff;
    margin: 0 10px;
    padding: 20px;
    code {
      color: #5e6d82;
      background-color: #e6effb;
      margin: 0 4px;
      display: inline-block;
      padding: 1px 5px;
      font-size: 12px;
      border-radius: 3px;
      height: 18px;
      line-height: 18px;
    }
  }
  .docs-demo {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    font-size: 14px;
    background-color: #f7f7f7;
    padding-top: 20px;
    border-top: none;
    pre code {
      font-family: Consolas, Menlo, Courier, monospace;
      line-height: 22px;
      border: none;
    }
  }
  .docs-trans {
    width: 100%;
    text-align: center;
    display: inline-block;
    color: #c5d9e8;
    font-size: 12px;
    padding: 10px 0;
    background-color: #fff;
    border-top: 1px solid #eee;
    &:hover {
      color: #409eff;
      cursor: pointer;
      background-color: #fafbfc;
    }
  }
  .demo-container {
    border-top: 1px solid #eee;
  }
  pre {
    margin: 0;
    padding:  20px 10px;
    code {
      border-radius: 4px;
    }
  }
  .height-leave-active,.height-enter-active {
    transition: max-height 0.3s;
  }
  .height-enter,.height-leave-to {
    max-height: 0;
  }
  .height-enter-to,.height-leave {
    max-height: 200px;
  }
}
.element-doc > table {
  border-collapse: collapse;
  width: 100%;
  background-color: #fff;
  font-size: 14px;
  margin-bottom: 45px;
  line-height: 1.5em;

  strong {
    font-weight: normal;
  }

  td,
  th {
    border-bottom: 1px solid #dcdfe6;
    padding: 15px;
    max-width: 250px;
  }

  th {
    text-align: left;
    white-space: nowrap;
    color: #909399;
    font-weight: normal;
  }

  td {
    color: #606266;
  }

  th:first-child,
  td:first-child {
    padding-left: 10px;
  }
}
</style>
