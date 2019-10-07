

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
import {initialize} from './helpers/general';
const vuetifyOptions = { }
Vue.use(Vuetify)
Vue.use(VueRouter)
Vue.use(Vuex)

const store = new Vuex.Store(StoreData);


const router = new VueRouter({
    mode: 'history',
    linkActiveClass: 'active',
    routes
})



export default new Vuetify({
    icons: {
      iconfont: 'md, mdi', // default - only for display purposes
    },
  })

  initialize(store,router);

const app = new Vue({
    el: '#app',
    router,
    store,
    vuetify: new Vuetify(vuetifyOptions),
    components: {
      MainApp
    }
    
});
