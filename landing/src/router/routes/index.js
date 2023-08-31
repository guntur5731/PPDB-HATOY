import { lazy } from 'react'

// ** Document title
const TemplateTitle = '%s - Vuexy React Admin Template'

// ** Default Route
const DefaultRoute = '/beranda'

// ** Merge Routes
const Routes = [
  {
    path: '/beranda',
    component: lazy(() => import('../../views/Home'))
  },
  {
    path: '/redirect',
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    },
    component: lazy(() => import('../../views/redirect'))
  },
  // {
  //   path: '/login',
  //   component: lazy(() => import('../../views/Login')),
  //   layout: 'BlankLayout',
  //   meta: {
  //     authRoute: true
  //   }
  // },
  {
    path: '/error',
    component: lazy(() => import('../../views/Error')),
    layout: 'BlankLayout'
  }
]

export { DefaultRoute, TemplateTitle, Routes }
