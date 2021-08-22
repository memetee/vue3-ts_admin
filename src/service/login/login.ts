import tsRequest from '..';
import { IAccount, IDataType, ILoginResult } from './types';

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  UserMenus = '/role/'
}

export function accountLoginRequest(account: IAccount) {
  return tsRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  });
}

export function requestUserInfoById(id: number) {
  return tsRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id
  });
}

export function requestUserMenusByRoleId(id: number) {
  console.log('id是什么呀', id);
  return tsRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu'
  });
}
