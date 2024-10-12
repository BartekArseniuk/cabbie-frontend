import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './components/Views/HomePage/HomePage.vue';
import OfferPage from './components/Views/OfferPage/OfferPage.vue';
import AboutUsPage from './components/Views/AboutUs/AboutUsPage.vue';
import BlogPage from './components/Views/Blog/BlogPage.vue';
import ContactPage from './components/Views/ContactPage/ContactPage.vue';
import ProfilePage from './components/Views/Profile/ProfilePage.vue';
import SurveyPage from './components/Views/Profile/SurveyPage.vue';
import AdminPanel from './components/Views/AdminPanel/AdminPanel.vue';

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
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactPage,
    meta: {
      title: 'Cabbie - Kontakt'
    }
  },
  {
    path: '/profile/:section?',
    name: 'Profile',
    component: ProfilePage,
    meta: {
      title: 'Cabbie - Panel użytkownika'
    }
  },
  {
    path: '/survey',
    name: 'Survey',
    component: SurveyPage,
    meta: {
      title: 'Cabbie - Formularz początkowy'
    }
  },
  {
    path: '/admin-panel/:section?',
    name: 'AdminPanel',
    component: AdminPanel,
    meta: {
      title: 'Cabbie - Panel administratora'
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

export default router;