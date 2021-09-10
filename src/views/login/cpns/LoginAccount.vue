<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { rules } from '../config/account-config';
import { ElForm } from 'element-plus';
import localCache from '@/utils/cache';
export default defineComponent({
  setup() {
    const store = useStore();
    const account = reactive({
      name: localCache.getLocalCache('name') ?? '',
      password: localCache.getLocalCache('password') ?? ''
    });
    const formRef = ref<InstanceType<typeof ElForm>>();
    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          if (isKeepPassword) {
            localCache.setLocalCache('name', account.name);
            localCache.setLocalCache('password', account.password);
            // 本地缓存
          } else {
            localCache.deleteLocalCache('name');
            localCache.deleteLocalCache('password');
          }
          store.dispatch('login/accountLoginAction', { ...account });
        }
      });
    };

    return {
      account,
      rules,
      loginAction,
      formRef
    };
  }
});
</script>

<style scoped></style>
