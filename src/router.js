import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/components/HomePage/HomePage.vue';
import OfferPage from '@/components/OfferPage/OfferPage.vue';
import AboutUsPage from '@/components/AboutUs/AboutUsPage.vue';
import BlogPage from '@/components/Blog/BlogPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: {
      title: 'Cabbie'
    }
  },
  {
    path: '/offer',
    name: 'Offer',
    component: OfferPage,
    meta: {
      title: 'Cabbie - Oferta'
    }
  },
  {
    path: '/about-us',
    name: 'AboutUs',
    component: AboutUsPage,
    meta: {
      title: 'Cabbie - O nas'
    }
  },
  {
    path: '/blog',
    name: 'Blog',
    component: BlogPage,
    meta: {
      title: 'Cabbie - Blog'
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

export default router;