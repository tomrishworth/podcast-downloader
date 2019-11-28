import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import BootstrapVue from 'bootstrap-vue';
import VueClipboard from 'vue-clipboard2';

Vue.use(BootstrapVue);
Vue.use(VueClipboard);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
