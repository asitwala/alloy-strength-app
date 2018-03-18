import Vue from 'vue';
import Router from 'vue-router';

import Homepage from '@/demo-home/Homepage';
import Users from '@/components/Users';

import About from '@/demo-common/components/About';
import Contact from '@/demo-common/components/Contact';
import Terms from '@/demo-common/components/Terms';

import Workout from '@/demo-user/Workout'; 
import Videos from '@/demo-user/Videos'; 

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
      component: Videos
    }
  ]
});