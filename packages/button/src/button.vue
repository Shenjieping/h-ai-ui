<template>
  <el-button v-bind="$attrs">
    <slot />
  </el-button>
</template>

<script>
/**
 * @file button.vue
 * @author shenjieping@techstar.com.cn
 * @data 2022-06-22 09:18:52
 */
// import Button from 'element-ui/lib/button'
export default {
  name: 'AiButton',
  components: {
    // ElButton: Button
  },
  created() {
    console.log('shenjp==>>wwww', this.$attrs)
  },
  data() {
    return {}
  },
  methods: {}
}
</script>
