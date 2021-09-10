<template>
  <div class="page-content">
    <hy-table
      :listData="dataList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <!-- hander插槽 -->
      <template #headerHandle>
        <el-button type="primary" size="medium">新建用户</el-button>
        <el-button icon="el-icon-refresh" size="medium">刷新</el-button>
      </template>
      <!-- 列表插槽固定的 -->
      <!-- <template #status="scope">
        <el-button
          size="mini"
          :type="scope.row.enable ? 'success' : 'danger'"
          plain
          >{{ scope.row.enable ? '启用' : '禁用' }}</el-button
        >
      </template> -->
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handle>
        <div class="handle-btn">
          <!-- <span>{{ $filters.formatTime(scope.row.updateAt) }}</span> -->
          <el-button size="mini" type="text" icon="el-icon-edit"
            >编辑</el-button
          >
          <el-button size="mini" type="text" icon="el-icon-delete"
            >删除</el-button
          >
        </div>
      </template>
      <template #header>
        <slot></slot>
      </template>

      <!-- 列表中的插槽动态的 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </hy-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue';
import HyTable from '@/base-ui/table';
import { useStore } from '@/store';
export default defineComponent({
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  components: {
    HyTable
  },
  setup(props) {
    const store = useStore();
    const pageInfo = ref({ currentPage: 0, pageSize: 10 });
    const getPageData = (queryInfo: any = {}) => {
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: pageInfo.value.currentPage * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      });
    };
    getPageData();
    const dataList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    );
    const dataCount = computed(() =>
      store.getters[`system/pageListCount`](props.pageName)
    );

    watch(pageInfo, () => {
      getPageData();
    });
    // 获取其他的动态插槽名称
    console.log('props', props.contentTableConfig);
    const otherPropSlots = props.contentTableConfig?.propsList.filter(
      (item: any) => {
        if (item.slotName === 'createAt') return false;
        if (item.slotName === 'handle') return false;
        if (item.slotName === 'updateAt') return false;
        return true;
      }
    );
    return {
      dataList,
      getPageData,
      dataCount,
      pageInfo,
      otherPropSlots
    };
  }
});
</script>

<style scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
