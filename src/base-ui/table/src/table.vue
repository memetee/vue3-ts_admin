<template>
  <div class="hy-table">
    <div class="header">
      <slot name="header">
        <div class="title">
          {{ title }}
        </div>
        <div class="handler">
          <slot name="headerHandle"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="listData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
      row-key="id"
      :tree-props="{ children: children }"
      v-bind="childrenProps"
    >
      <el-table-column
        v-if="showSelectColumn"
        align="center"
        type="selection"
        width="40"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        label="序号"
        align="center"
        width="80"
        type="index"
        show-overflow-tooltip
      ></el-table-column>
      <template v-for="propItem in propsList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-sizes="[10, 20, 30]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    listCount: {
      type: Number,
      default: 0
    },
    listData: {
      type: Array,
      required: true
    },
    propsList: {
      type: Array,
      required: true
    },
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    showSelectColumn: {
      type: Boolean,
      default: false
    },
    page: {
      type: Object,
      default: () => ({
        currentPage: 0,
        pageSize: 10
      })
    },
    childrenProps: {
      type: Object,
      default: () => ({})
    },
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  emits: ['selectionChange', 'update:page'],
  setup(props, { emit }) {
    console.log('propsList', props.propsList);
    const handleSelectionChange = (item: any) => {
      console.log(item);
      emit('selectionChange', item);
    };
    const handleSizeChange = (pageSize: number) => {
      console.log('页码', pageSize);
      emit('update:page', { ...props.page, pageSize });
    };
    const handleCurrentChange = (currentPage: number) => {
      console.log('当前页码', currentPage);
      emit('update:page', { ...props.page, currentPage });
    };
    return {
      handleSelectionChange,
      handleSizeChange,
      handleCurrentChange
    };
  }
});
</script>

<style scoped lang="less">
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}

.footer {
  margin-top: 15px;

  .el-pagination {
    text-align: right;
  }
}
</style>
