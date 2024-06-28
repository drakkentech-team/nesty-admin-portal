import { createRouter, createWebHistory } from 'vue-router';
//import { useStore } from '../stores/store';
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
         path: '/private-messages',
         component: DashboardLayout,
         children: [
            {
               path: '/private-messages',
               name: 'Private Messages',
               component: () => import('../pages/privateMessages.vue'),
            },
         ]
      },
      {
         path: '/manage-groups',
         component: DashboardLayout,
         children: [
            {
               path: '/manage-groups',
               name: 'Manage Groups',
               component: () => import('../pages/manageGroups.vue'),
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
         path: '/moderation',
         component: DashboardLayout,
         children: [
            {
               path: '',
               name: 'moderation',
               component: () => import('../pages/moderation.vue'),
            }
         ]
      },
      {
         path: '/group-life-cycle-log',
         component: DashboardLayout,
         children: [
            {
               path: '',
               name: 'group-life-cycle-log',
               component: () => import('../pages/groupLifeCycleLog.vue'),
            }
         ]
      },
   ]
});


router.beforeEach((to, from, next) => {
   //const user = useStore()
   //const userIsLoggedIn = user.user ? true : false
   const userIsLoggedIn =  true;


   if (to.path === '/login' && userIsLoggedIn) {
     next('/private-messages');
   } else if (to.path !== '/login' && !userIsLoggedIn) {
     next('/login');
   } else {
     next();
   }
 });

export default router;
