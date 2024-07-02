
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/IndexPage.vue') },
      { path: '/relatorios', component: () => import('pages/Relatorios/AllRelatoriosPage.vue') },
      { path: '/novo-relatorio', component: () => import('pages/Relatorios/NovoRelatorioPage.vue') },
      { path: '/relatorios/:id', component: () => import('pages/Relatorios/VerRelatorioPage.vue') }
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
