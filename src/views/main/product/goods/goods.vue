<template>
  <div class="goods">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    ></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="goods"
      ref="pageContentRef"
    >
      <template #status="scope">
        <el-button
          size="mini"
          :type="scope.row.status ? 'success' : 'danger'"
          plain
          >{{ scope.row.status ? '启用' : '禁用' }}</el-button
        >
      </template>
      <template #image="scope">
        <el-image
          style="width: 70px; height: 70px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
        ></el-image>
      </template>
      <template #oldPrice="scope">
        {{ '¥' + scope.row.oldPrice }}
      </template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import PageContent from '@/components/page-content';
import PageSearch from '@/components/page-search';
import { contentTableConfig } from './config/content.config';
import { searchFormConfig } from './config/search.config';
export default defineComponent({
  name: 'goods',
  components: {
    PageContent,
    PageSearch
  },
  setup() {
    const pageContentRef = ref<InstanceType<typeof PageContent>>();
    const handleResetClick = () => {
      pageContentRef.value?.getPageData();
      console.log('点击了重置');
    };
    const handleQueryClick = (queryInfo: any) => {
      console.log('点击了搜索', pageContentRef);
      pageContentRef.value?.getPageData(queryInfo);
    };
    return {
      contentTableConfig,
      PageSearch,
      searchFormConfig,
      handleResetClick,
      handleQueryClick,
      pageContentRef
    };
  }
});
</script>

<style scoped></style>
