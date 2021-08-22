<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// 局部引入
// import { ElButton } from 'element-plus';
// 这样引用太麻烦了，可以配置plugin
// import 'element-plus/lib/theme-chalk/el-button.css';
// import 'element-plus/lib/theme-chalk/base.css';
export default defineComponent({
  name: 'App',
  components: {
    // ElButton
  }
});
</script>

<style lang="less">
.app {
  height: 100%;
}
</style>
