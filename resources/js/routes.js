import MainRequisition from "./components/requisition-slip/Main.vue"
import EditRequisition from "./components/requisition-slip/Edit.vue"
import Profile from "./components/Profile.vue"
import BlankPage from "./components/BlankPage.vue"

export const routes = [
    { 
      path: '/' , 
      component: require('./components/BlankPage.vue').default, 
      meta: {
        requiresAuth: true,
      }
  },
    { 
      path: '/requisition-slip', component: MainRequisition,      
      children: [
        {
          path: '/',
          component: BlankPage
        },
        {
          path: ':id',
          component: EditRequisition
        },
      ],
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