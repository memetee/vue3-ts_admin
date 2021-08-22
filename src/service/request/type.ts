import { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface TSRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (config: any) => any;
  responseInterceptor?: (config: T) => T;
  responseInterceptorCatch?: (config: any) => any;
}
export interface TsRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: TSRequestInterceptors<T>;
  showLoading?: boolean;
}
