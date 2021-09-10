import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './service/axios_demo.ts';
import 'normalize.css';
import './assets/css/index.less';
import { globalRegister } from './global';
import tsRequest from './service';
import { setupStore } from './store/index';
const app = createApp(App);

interface DataType {
  data: any;
  resultCode: string;
  success: boolean;
}

app.use(globalRegister);
app.use(store);
setupStore();
app.use(router);
app.mount('#app');
