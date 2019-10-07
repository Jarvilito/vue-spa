

export const routes = [
    { path: '/' , 
      component: require('./components/Home.vue').default, 
      meta: {
        requiresAuth: true
    }},
    { path: '/requisition-slip', component: require('./components/RequisitionSlip.vue').default},
    { path: '/dashboard' , component: require('./components/Dashboard.vue').default   },
    { path: '/profile' , component: require('./components/Profile.vue').default  },
    { path: '/login' , component: require('./auth/Login.vue').default  },
]