<template>
  <div class="app">
    <ElConfigProvider :locale="zhCn">
      <router-view></router-view>
    </ElConfigProvider>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// 局部引入
// import { ElButton } from 'element-plus';
// 这样引用太麻烦了，可以配置plugin
// import 'element-plus/lib/theme-chalk/el-button.css';
// import 'element-plus/lib/theme-chalk/base.css';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import { ElConfigProvider } from 'element-plus';
export default defineComponent({
  name: 'App',
  components: {
    ElConfigProvider
  },
  setup() {
    return {
      zhCn
    };
  }
});
</script>

<style lang="less">
.app {
  height: 100%;
}
</style>
