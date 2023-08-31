import { lazy } from 'react'

const Home = [
    {
        path: '/beranda',
        component: lazy(() => import('../../views/Home'))
    },
    {
        path: '/second-page',
        component: lazy(() => import('../../views/SecondPage'))
    },
    {
        path: '/login',
        component: lazy(() => import('../../views/auth/Login')),
        layout: 'BlankLayout',
        meta: {
            authRoute: true
        }
    },
    {
        path: '/register',
        component: lazy(() => import('../../views/auth/Register')),
        layout: 'BlankLayout',
        meta: {
            authRoute: true
        }
    },
    {
        path: '/error',
        component: lazy(() => import('../../views/Error')),
        layout: 'BlankLayout'
    },
    {
        path: '/forgot-password',
        component: lazy(() => import('../../views/auth/forgotpassword/index')),
        layout: 'BlankLayout',
        meta: {
            authRoute: true
        }
    },
    {
        path: '/change-password',
        component: lazy(() => import('../../views/auth/forgotpassword/changepassword')),
        layout: 'BlankLayout',
        meta: {
            authRoute: true
        }
    }
]

export default Home