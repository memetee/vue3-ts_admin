import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import localCache from '@/utils/cache';
import type { TSRequestInterceptors, TsRequestConfig } from './type';
import { ElLoading } from 'element-plus';
import { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type';

const DEFAULT_LOADING = false;

class TSRequest {
  instance: AxiosInstance;
  interceptors?: TSRequestInterceptors;
  showLoading: boolean;
  loading?: ILoadingInstance;
  // 针对不对实例，创建不同axios
  constructor(config: TsRequestConfig) {
    this.instance = axios.create(config);
    this.interceptors = config.interceptors;
    this.showLoading = config.showLoading ?? DEFAULT_LOADING;
    this.instance.interceptors.request.use(
      // this.interceptors?.requestInterceptor,
      // this.interceptors?.requestInterceptorCatch
      (config) => {
        console.log('请求拦截222', config);
        const token = localCache.getLocalCache('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据....',
            background: 'rgba(0, 0, 0, 0.5)'
          });
        }
        return config;
      }
    );
    this.instance.interceptors.response.use(
      // this.interceptors?.responseInterceptor,
      // this.interceptors?.responseInterceptorCatch
      (config) => {
        console.log('响应拦截', config);
        return config.data;
      }
    );
  }
  // 这个T表示调用这个方法的时候传入的类型
  request<T>(config: TsRequestConfig<T>): Promise<T> {
    console.log('我执行了');
    return new Promise((resolve, reject) => {
      // 判断是否需要做请求拦截
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }

      if (config.showLoading === false) {
        this.showLoading = config.showLoading;
        this.loading?.close();
      }
      // 做响应拦截
      this.instance
        // 这个T是什么类型，返回的res就是什么类型
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          this.showLoading = DEFAULT_LOADING;
          this.loading?.close();
          resolve(res);
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING;
          reject(err);
        });
    });
  }
  get<T>(config: TsRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' });
  }
  post<T>(config: TsRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' });
  }
  delete<T>(config: TsRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' });
  }
  patch<T>(config: TsRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' });
  }
}
export default TSRequest;
