import { createRouter, createWebHistory } from 'vue-router'
import HighFidelityHome from '../components/HighFidelityHome.vue'
import HighFidelityAuth from '../components/HighFidelityAuth.vue'
import HighFidelityReportStep1 from '../components/HighFidelityReportStep1.vue'
import HighFidelityReportStep2 from '../components/HighFidelityReportStep2.vue'
import HighFidelityReportStep3 from '../components/HighFidelityReportStep3.vue'
import HighFidelityReportStep4 from '../components/HighFidelityReportStep4.vue'
import HighFidelityDashboard from '../components/HighFidelityDashboard.vue'
import HighFidelityProfile from '../components/HighFidelityProfile.vue'
import HighFidelityAbout from '../components/HighFidelityAbout.vue'
import HighFidelityAdminLayout from '../components/HighFidelityAdminLayout.vue';
import HighFidelityAdminLogin from '../components/HighFidelityAdminLogin.vue';
import HighFidelityAdminDashboard from '../components/HighFidelityAdminDashboard.vue';
import HighFidelityAdminReports from '../components/HighFidelityAdminReports.vue';
import HighFidelityAdminReportDetail from '../components/HighFidelityAdminReportDetail.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // User Routes
    { path: '/', name: 'home', component: HighFidelityHome },
    { path: '/report/step1', name: 'report-1', component: HighFidelityReportStep1, meta: { requiresUserAuth: true } },
    { path: '/report/step2', name: 'report-2', component: HighFidelityReportStep2, meta: { requiresUserAuth: true } },
    { path: '/report/step3', name: 'report-3', component: HighFidelityReportStep3, meta: { requiresUserAuth: true } },
    { path: '/report/step4', name: 'report-4', component: HighFidelityReportStep4, meta: { requiresUserAuth: true } },
    { path: '/report/:id', name: 'report-detail', component: () => import('../components/HighFidelityReportDetail.vue'), meta: { requiresUserAuth: true } },
    { path: '/auth', name: 'auth', component: HighFidelityAuth },
    { path: '/dashboard', name: 'dashboard', component: HighFidelityDashboard, meta: { requiresUserAuth: true } },
    { path: '/profile', name: 'profile', component: HighFidelityProfile, meta: { requiresUserAuth: true } },
    { path: '/about', name: 'about', component: HighFidelityAbout },

    // Admin Routes
    { path: '/admin/login', name: 'admin-login', component: HighFidelityAdminLogin },
    {
      path: '/admin',
      meta: { requiresAuth: true },
      component: HighFidelityAdminLayout,
      children: [
        { path: '', redirect: '/admin/dashboard' },
        { path: 'dashboard', name: 'admin-dashboard', component: HighFidelityAdminDashboard },
        { path: 'reports', name: 'admin-reports', component: HighFidelityAdminReports },
        { path: 'reports/:id', name: 'admin-report-detail', component: HighFidelityAdminReportDetail },
        { path: 'settings', name: 'admin-settings', component: () => import('../components/HighFidelityAdminSettings.vue') }
      ]
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  const isAdminAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
  const isUserAuthenticated = !!localStorage.getItem('user_token');

  // Admin Route Protection
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAdminAuthenticated) {
      next({ name: 'admin-login' });
    } else {
      next();
    }
  }
  // User Route Protection
  else if (to.matched.some(record => record.meta.requiresUserAuth)) {
    if (!isUserAuthenticated) {
      next({ name: 'auth' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
