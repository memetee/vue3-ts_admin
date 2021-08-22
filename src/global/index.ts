// 引入类型
import { App } from 'vue';
// 注册element-plus
import registerElement from './register-elment';
export function globalRegister(app: App): void {
  app.use(registerElement);
}
