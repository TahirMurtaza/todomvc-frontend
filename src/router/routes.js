const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'dashboard', component: () => import('pages/IndexPage.vue'), meta: { requiresAuth: true } },
      { path: '', name: 'all', component: () => import('pages/IndexPage.vue'), meta: { requiresAuth: true } },
      { path: 'active', name: 'active', component: () => import('pages/IndexPage.vue'), meta: { requiresAuth: true } },
      { path: 'completed', name: 'completed', component: () => import('pages/IndexPage.vue'), meta: { requiresAuth: true } },

    ]
  },

  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'login', component: () => import('pages/LoginPage.vue'), meta: { requiresAuth: false } },
      { path: 'signup', component: () => import('pages/SignupPage.vue'), meta: { requiresAuth: false } },
      { path: 'forgot-password', component: () => import('pages/ForgotPasswordPage.vue'), meta: { requiresAuth: false } },
      { path: '/set-password/:token/:uidb64', component: () => import('pages/SetPasswordPage.vue'), meta: { requiresAuth: false } },
      { path: '/profile-settings', component: () => import('pages/ProfileSettingsPage.vue'), meta: { requiresAuth: true } },

     
    ]
  },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
