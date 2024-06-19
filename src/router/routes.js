import { createRouter, createWebHistory } from 'vue-router';
import { useStore } from '../stores/store';
import DashboardLayout from '../DashboardLayout.vue';
import PlainLayout from '../PlainLayout.vue';

const router = createRouter({
   history: createWebHistory(),
   routes: [
      {
         path: '/',
         component: PlainLayout,
         children: [
           {
             path: '',
             component: () => import('../pages/login.vue')
           }
         ]
      },
      {
         path: '/login',
         component: PlainLayout,
         children: [
           {
             path: '',
             component: () => import('../pages/login.vue')
           }
         ]
      },
      {
         path: '/notifications',
         component: DashboardLayout,
         children: [
            {
               path: '/notifications',
               name: 'notifications',
               component: () => import('../pages/privateMessages.vue'),
            },
         ]
      },
      {
         path: '/mobile-app-users',
         component: DashboardLayout,
         children: [
            {
               path: '',
               name: 'mobile-app-users',
               component: () => import('../pages/mobileAppUsers.vue'),
            },
         ]
      },
      {
         path: '/admin-portal-users',
         component: DashboardLayout,
         children: [
            {
               path: '',
               name: 'admin-portal-users',
               component: () => import('../pages/adminPortalUsers.vue'),
            },
         ]
      },
      {
         path: '/userView',
         component: DashboardLayout,
         children: [
            {
               path: '',
               name: 'news',
               component: () => import('../pages/manageGroups.vue'),
            },
         ]
      },
      {
         path: '/manage-groups',
         component: DashboardLayout,
         children: [
            {
               path: '',
               name: 'manage-groups',
               component: () => import('../pages/manageGroups.vue'),
            },
         ]
      },
   ]
});


router.beforeEach((to, from, next) => {
   const user = useStore()
   //const userIsLoggedIn = user.user ? true : false
   const userIsLoggedIn =  true;


   if (to.path === '/login' && userIsLoggedIn) {
     next('/notifications');
   } else if (to.path !== '/login' && !userIsLoggedIn) {
     next('/login');
   } else {
     next();
   }
 });

export default router;
