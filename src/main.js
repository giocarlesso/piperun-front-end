import Vue from 'vue';
import App from './App.vue';
import router from './router/routes';
import session from 'vue-session';

Vue.config.productionTip = false;

Vue.use(session);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
