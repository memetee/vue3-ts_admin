import { Module } from 'vuex';
import { ILoginState } from './type';
import { IRootState } from '../type';
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login/login';
import LocalCache from '@/utils/cache';
import { mapMenusToRoutes, mapMenusToPermissions } from '@/utils/map-menus';
import { IAccount } from '@/service/login/types';
import router from '@/router';
// 这两个范型必须传
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: '',
      userMenus: [],
      permissions: []
    };
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token;
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo;
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus;
      const routes = mapMenusToRoutes(userMenus);
      routes.forEach((route) => {
        router.addRoute('main', route);
      });
      // mapMenusToPermissions
      const permissions = mapMenusToPermissions(userMenus);
      state.permissions = permissions;
      console.log('获取按钮权限', permissions);
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: IAccount) {
      console.log('执行accountLoginAction', payload);
      // const loginResult: IDataType<ILoginResult>
      // 实现登录逻辑, 获取token
      const loginResult = await accountLoginRequest(payload);
      const { token, id } = loginResult.data;
      console.log('token', token);
      commit('changeToken', token);
      LocalCache.setLocalCache('token', token);
      // 请求用户信息
      const userInfoResult = await requestUserInfoById(id);
      const userInfo = userInfoResult.data;
      commit('changeUserInfo', userInfo);
      LocalCache.setLocalCache('userInfo', userInfo);
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id);
      const userMenus = userMenusResult.data;
      commit('changeUserMenus', userMenus);
      LocalCache.setLocalCache('userMenus', userMenus);
      router.push('/main');
    },
    phoneLoginAction({ commit }, payload: any) {
      console.log('执行phoneLoginAction', payload);
    },
    loadLocalLogin({ commit }) {
      const token = LocalCache.getLocalCache('token');
      if (token) {
        commit('changeToken', token);
      }
      const userInfo = LocalCache.getLocalCache('userInfo');
      if (userInfo) {
        commit('changeUserInfo', userInfo);
      }
      const userMenus = LocalCache.getLocalCache('userMenus');
      if (userMenus) {
        commit('changeUserMenus', userMenus);
      }
    }
  }
};
export default loginModule;
