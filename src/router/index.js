import Vue from 'vue';
import Router from 'vue-router';

import Homepage from '@/demo-home/Homepage';
import Glossary from '@/demo-home/Glossary';

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

import CheckEmail from '@/demo-user/CheckEmail'; 
import EmailConfirmation from '@/demo-user/EmailConfirmation';

import FAQ from '@/demo-home/FAQ'; 
import Unauthorized from '@/demo-home/Unauthorized';
import NoPageExists from '@/demo-home/NoPageExists';
import IndividualizedProgramming from '@/demo-home/IndividualizedProgramming'; 

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Homepage,
      meta: {requireAuth: false}
    },
    {
      path: '/faq',
      name: 'FAQ',
      component: FAQ,
      meta: {requireAuth: false}
    },
    { 
      path: '/about',
      name: 'About',
      component: About,
      meta: {requireAuth: false}
    },
    { 
      path: '/contact',
      name: 'Contact',
      component: Contact,
      meta: {requireAuth: false}
    },
    { 
      path: '/terms',
      name: 'Terms',
      component: Terms,
      meta: {requireAuth: false}
    },
    {
      path: '/workout',
      name: 'Workout',
      component: Workout,
      meta: {requireAuth: true}
    }, 
    {
      path: '/videos',
      name: 'Videos',
      component: Videos,
      props: true,
      meta: {requireAuth: true}
    },
    {
      path: '/glossary',
      name: 'Glossary',
      component: Glossary,
      meta: {requireAuth: true}
    },
    {
      path: '/user-stats',
      name: 'UserStats',
      component: UserStats,
      meta: {requireAuth: true}
    },
    {
      path: '/progress',
      name: 'Progress',
      component: Progress,
      meta: {requireAuth: true}
    },
    {
      path: '/initialize',
      name: 'Initialize',
      component: Initialize,
      props: true,
      meta: {requireAuth: true}
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout,
      meta: {requireAuth: false}
    },
    {
      path: '/reset-workouts',
      name: 'AdminSetLevels',
      component: AdminSetLevels,
      meta: {requireAuth: true}
    },
    {
      path: '/set-workouts',
      name: 'SetLevels',
      component: SetLevels,
      meta: {requireAuth: true}
    },
    {
      path: '/profile',
      name: 'Profile', 
      component: Profile,
      meta: {requireAuth: true}
    },
    {
      path: '/reschedule-workouts',
      name: 'RescheduleWorkouts',
      component: RescheduleWorkouts,
      meta: {requireAuth: true}
    },
    {
      path: '/renew-subscription', 
      name: 'RenewSubscription',
      component: RenewSubscription,
      meta: {requireAuth: true}
    },
    {
      path: '/confirm/:id/:confString',
      name: 'EmailConfirmation',
      component: EmailConfirmation,
      meta: {requireAuth: false}
    },
    {
      path: '/check-email',
      name: 'CheckEmail',
      component: CheckEmail,
      meta: {requireAuth: false}
    },
    {
      path: '/individualized-programming',
      name: 'IndividualizedProgramming',
      component: IndividualizedProgramming,
      meta: {requireAuth: false}
    },
    {
      path: '/unauthorized', 
      name: 'Unauthorized', 
      component: Unauthorized,
      meta: {requireAuth: false},
      props: true
    },
    {
      path: '*',
      component: NoPageExists,
      meta: {requireAuth: false}
    }
  ]
});


export default router;