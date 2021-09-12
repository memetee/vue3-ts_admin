import hyRequest from '../../index';
import { IDataType } from '@/service/types';
export function getPageListData(url: string, queryInfo: any) {
  return hyRequest.post<IDataType>({
    url: url,
    data: queryInfo
  });
}
export function deletePageData(url: string) {
  return hyRequest.delete<IDataType>({
    url
  });
}
export function createPageData(url: string, newData: any) {
  console.log('这里执行了吗222');
  return hyRequest.post<IDataType>({
    url: url,
    data: newData
  });
}
export function editPageData(url: string, editData: any) {
  return hyRequest.patch<IDataType>({
    url: url,
    data: editData
  });
}
