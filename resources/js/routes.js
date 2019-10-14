

export const routes = [
    { 
      path: '/' , 
      component: require('./components/Dashboard.vue').default, 
      meta: {
        requiresAuth: true,
    }
  },
    { 
      path: '/requisition-slip', component: require('./components/requisition-slip/Main.vue').default,      
      meta: {
        requiresAuth: true,
      }
    },
    { 
      path: '/dashboard' , component: require('./components/Dashboard.vue').default,      
      meta: {
      requiresAuth: true,
      }
    },
    { 
      path: '/profile' , component: require('./components/Profile.vue').default,      
      meta: {
      requiresAuth: true,
      }
    },
    { 
      path: '/login' , component: require('./components/auth/Login.vue').default ,
      meta: {
        requiresVisitor: true,
      }
    },
]