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
        @newBtnClick="handleNewData"
        @editBtnClick="handleEditData"
      ></page-content>
      <page-modal
        :defaultInfo="defaultInfo"
        ref="pageModalRef"
        :modalConfig="modalConfigRef"
        pageName="users"
      ></page-modal>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useStore } from '@/store';
import { searchFormConfig } from './config/search.config';
import { contentTableConfig } from './config/content.config';
import { modalConfig } from './config/modal.config';

import PageContent from '@/components/page-content';
import PageSearch from '@/components/page-search';
import PageModal from '@/components/page-modal';
import { usePageSearch } from '@/hooks/use-page-search';
import { usePageModal } from '@/hooks/use-page-modal';
export default defineComponent({
  name: 'users',
  components: { PageSearch, PageContent, PageModal },
  setup() {
    const store = useStore();
    const [pageContentRef, handleResetClick, handleQueryClick] =
      usePageSearch();
    const newCallBack = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      );
      passwordItem!.isHidden = false;
    };
    const editCallBack = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      );
      passwordItem!.isHidden = true;
    };
    // 拿到部门和角色数据对options赋值
    const modalConfigRef = computed(() => {
      const departmentItem = modalConfig.formItems.find((item) => {
        console.log(item, '打印部门');
        if (item.field === 'departmentId') return item;
      });
      departmentItem!.options = store.state.entireDepartment.map((item) => {
        return { title: item.name, value: item.id };
      });
      const roleItem = modalConfig.formItems.find((item) => {
        if (item.field === 'roleId') return item;
      });
      roleItem!.options = store.state.entireRole.map((item) => {
        return { title: item.name, value: item.id };
      });
      console.log('我是什么呢', modalConfig);
      return modalConfig;
    });

    const [handleNewData, handleEditData, pageModalRef, defaultInfo] =
      usePageModal(newCallBack, editCallBack);
    return {
      searchFormConfig,
      contentTableConfig,
      handleResetClick,
      handleQueryClick,
      pageContentRef,
      modalConfig,
      modalConfigRef,
      handleNewData,
      handleEditData,
      pageModalRef,
      defaultInfo
    };
  }
});
</script>

<style scoped></style>
