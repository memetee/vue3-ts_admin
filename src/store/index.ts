import { createStore, Store, useStore as useVuexStore } from 'vuex';
import { IRootState, IStoreType } from './type';
import login from './login/login';

const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'wts',
      age: 18,
      height: 20
    };
  },
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    login
  }
});

export function setupStore() {
  store.dispatch('login/loadLocalLogin');
}
export function useStore(): Store<IStoreType> {
  return useVuexStore();
}

export default store;
