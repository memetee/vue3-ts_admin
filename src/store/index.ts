import { createStore, Store, useStore as useVuexStore } from 'vuex';
import { IRootState, IStoreType } from './type';
import login from './login/login';
import system from './main/system/system';
import { getPageListData } from '@/service/main/system/system';
const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'wts',
      age: 18,
      height: 20,
      entireDepartment: [],
      entireRole: []
    };
  },
  mutations: {
    changeEntireDepartment(state, payload) {
      state.entireDepartment = payload;
    },
    changeEntireRole(state, payload) {
      state.entireRole = payload;
    }
  },
  getters: {},
  actions: {
    async getInitialDataAction({ commit }) {
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      });
      const { list: departmentList } = departmentResult.data;
      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      });
      const { list: roleList } = roleResult.data;
      commit('changeEntireDepartment', departmentList);
      commit('changeEntireRole', roleList);
    }
  },
  modules: {
    login,
    system
  }
});

export function setupStore() {
  store.dispatch('login/loadLocalLogin');
  store.dispatch('getInitialDataAction');
}
export function useStore(): Store<IStoreType> {
  return useVuexStore();
}

export default store;
