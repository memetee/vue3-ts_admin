<template>
  <div class="user">
    <div class="user">
      <page-search
        :searchFormConfig="searchFormConfig"
        @resetBtnClick="handleResetClick"
        @queryBtnClick="handleQueryClick"
      ></page-search>
      <page-content
        ref="pageContentRef"
        :contentTableConfig="contentTableConfig"
        pageName="users"
      ></page-content>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from '@/store';

import { searchFormConfig } from './config/search.config';
import { contentTableConfig } from './config/content.config';

import PageContent from '@/components/page-content';
import PageSearch from '@/components/page-search';

export default defineComponent({
  name: 'users',
  components: { PageSearch, PageContent },
  setup() {
    const pageContentRef = ref<InstanceType<typeof PageContent>>();
    const handleResetClick = () => {
      pageContentRef.value?.getPageData();
      console.log('点击了重置');
    };
    const handleQueryClick = (queryInfo: any) => {
      console.log('点击了搜索', queryInfo, pageContentRef);
      pageContentRef.value?.getPageData(queryInfo);
    };
    return {
      searchFormConfig,
      contentTableConfig,
      handleResetClick,
      handleQueryClick,
      pageContentRef
    };
  }
});
</script>

<style scoped></style>
