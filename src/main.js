import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//清除默认样式
import '../static/css/base.css'
//axios
import apiAxios from './utils/api.url'
Vue.prototype.apiAxios = apiAxios;
//mintUI
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
//vant
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);
//ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

import Mui from 'vue-awesome-mui';
Vue.use(Mui);
Vue.config.productionTip = false;
import '../static/css/reset.css'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
