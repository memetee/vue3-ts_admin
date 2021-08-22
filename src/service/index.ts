import TSRequest from './request';
import { BASE_URL, TIME_OUT } from './request/config';
import localCache from '@/utils/cache';
const tsRequest = new TSRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      console.log('请求拦截', config);
      const token = localCache.getLocalCache('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    responseInterceptor: (config) => {
      console.log('响应拦截', config);
      return config.data;
    }
  },
  showLoading: true
});

export default tsRequest;
