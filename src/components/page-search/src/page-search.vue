<template>
  <div class="page-search">
    <hy-form v-bind="searchFormConfig" :formData="formData" v-model="formData">
      <template #header>
        <h3>高级检索</h3>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button icon="el-icon-set-up" @click="handleResetClick"
            >重置</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleQueryClick"
            >搜索</el-button
          >
        </div>
      </template>
    </hy-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import HyForm from '@/base-ui/index';
export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },

  components: {
    HyForm
  },
  emits: ['resetBtnClick', 'queryBtnClick'],
  setup(props, { emit }) {
    const formItems = props.searchFormConfig?.formItems ?? [];
    const formOriginData: any = {};
    // 初始赋值默认值
    for (const item of formItems) {
      formOriginData[item.field] = '';
    }
    const formData = ref(formOriginData);
    // 重置
    const handleResetClick = () => {
      formData.value = formOriginData;
      emit('resetBtnClick');
    };
    const handleQueryClick = () => {
      // 点击了搜索
      emit('queryBtnClick', formData.value);
    };
    return {
      formData,
      handleResetClick,
      handleQueryClick
    };
  }
});
</script>

<style scoped>
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
