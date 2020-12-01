import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';
import CreateActivity from '../views/CreateActivity.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },

  {
    path: '/create-activity',
    name: 'CreateActivity',
    component: CreateActivity,
  },
];

const router = new VueRouter({ routes });

export default router;
