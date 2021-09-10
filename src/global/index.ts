// 引入类型
import { App } from 'vue';
// 注册element-plus
import registerElement from './register-elment';
import registerProperties from './register-properties';
export function globalRegister(app: App): void {
  app.use(registerElement);
  app.use(registerProperties);
}
