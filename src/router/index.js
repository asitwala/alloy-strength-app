import Vue from 'vue';
import Router from 'vue-router';

import Homepage from '@/demo-home/Homepage';
import Glossary from '@/demo-home/Glossary';
import Users from '@/components/Users';

import About from '@/demo-common/components/About';
import Contact from '@/demo-common/components/Contact';
import Terms from '@/demo-common/components/Terms';

import Workout from '@/demo-user/Workout'; 
import Videos from '@/demo-user/Videos'; 
import Logout from '@/demo-user/Logout';
import AdminSetLevels from '@/demo-user/user-info/AdminSetLevels';
import SetLevels from '@/demo-user/user-info/SetLevels';
import RescheduleWorkouts from '@/demo-user/user-info/RescheduleWorkouts'; 
import RenewSubscription from '@/demo-user/user-info/RenewSubscription'; 
import Initialize from '@/demo-user/user-info/Initialize'; 
import UserStats from '@/demo-user/user-info/UserStats';
import Progress from '@/demo-user/user-info/Progress'; 
import Profile from '@/demo-user/user-info/Profile'; 

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Homepage
    },
    {
      path: '/users',
      name: 'Users',
      component: Users
    },
    { 
      path: '/about',
      name: 'About',
      component: About
    },
    { 
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    { 
      path: '/terms',
      name: 'Terms',
      component: Terms
    },
    {
      path: '/workout',
      name: 'Workout',
      component: Workout
    }, 
    {
      path: '/videos',
      name: 'Videos',
      component: Videos,
      props: true
    },
    {
      path: '/glossary',
      name: 'Glossary',
      component: Glossary
    },
    {
      path: '/user-stats',
      name: 'UserStats',
      component: UserStats
    },
    {
      path: '/progress',
      name: 'Progress',
      component: Progress
    },
    {
      path: '/initialize',
      name: 'Initialize',
      component: Initialize
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    },
    {
      path: '/reset-workouts',
      name: 'AdminSetLevels',
      component: AdminSetLevels
    },
    {
      path: '/set-workouts',
      name: 'SetLevels',
      component: SetLevels
    },
    {
      path: '/profile',
      name: 'Profile', 
      component: Profile
    },
    {
      path: '/reschedule-workouts',
      name: 'RescheduleWorkouts',
      component: RescheduleWorkouts
    },
    {
      path: '/renew-subscription', 
      name: 'RenewSubscription',
      component: RenewSubscription
    },
    {
      path: '*',
      component: {
        template: '<div>404!</div>'
      }
    }
  ]
});
