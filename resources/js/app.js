

require('./bootstrap');
window.Vue = require('vue');
import Vuex from 'vuex';
import StoreData from './store';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import {routes} from './routes';
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'
import MainApp from './components/MainApp.vue';
import Axios from 'axios';
const vuetifyOptions = { }
Vue.use(Vuetify)
Vue.use(VueRouter)
Vue.use(Vuex)

axios.defaults.baseURL = "http://127.0.0.1:8000/api"

const store = new Vuex.Store(StoreData);


const router = new VueRouter({
    mode: 'history',
    linkActiveClass: 'active',
    routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.isLoggedIn) {
      next({
        path: '/login',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (store.getters.isLoggedIn) {
      next({
        path: '/',
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})



export default new Vuetify({
    icons: {
      iconfont: 'md, mdi', // default - only for display purposes
    },
  })


const app = new Vue({
    el: '#app',
    router,
    store,
    vuetify: new Vuetify(vuetifyOptions),
    components: {
      MainApp
    }
    
});
