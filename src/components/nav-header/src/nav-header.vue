<template>
  <div class="nav-header">
    <i
      class="fold-menu el-icon-s-unfold"
      :class="isFold ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
      @click="handleFoldClick"
    ></i>
    <div class="content">
      <hy-breadcrumb :breadcrumbs="breadcrumbs" />
      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import userInfo from './user-info.vue';
import HyBreadcrumb, { IBreadrumb } from '@/base-ui/breadcrumb/index';
import { pathMapBreadcrumbs } from '@/utils/map-menus';
import { useStore } from '@/store';
import { useRoute } from 'vue-router';
export default defineComponent({
  emits: ['foldChange'],
  components: {
    userInfo,
    HyBreadcrumb
  },
  setup(props, { emit }) {
    const isFold = ref(false);
    const handleFoldClick = () => {
      isFold.value = !isFold.value;
      emit('foldChange', isFold.value);
    };
    const store = useStore();
    const breadcrumbs = computed(() => {
      const userMenus = store.state.login.userMenus;
      const route = useRoute();
      const currentPath = route.path;
      return pathMapBreadcrumbs(userMenus, currentPath);
    });
    console.log('这个值是什么', breadcrumbs);
    return {
      isFold,
      breadcrumbs,
      handleFoldClick
    };
  }
});
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }
  .content {
    width: 100%;
    padding: 0 20px;
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
