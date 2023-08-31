import { lazy } from 'react'

const Admin = [
    {
        path: '/verifikasi',
        component: lazy(() => import('../../views/admin/verifikasi/index'))
    },
    {
        path: '/biaya',
        component: lazy(() => import('../../views/admin/biaya/index'))
    },
    {
        path: '/gelombang',
        exact: true,
        component: lazy(() => import('../../views/admin/gelombang/index'))
    },
    {
        path: '/nilai',
        component: lazy(() => import('../../views/admin/nilai/index'))
    },
    {
        path: '/peserta',
        exact: true,
        component: lazy(() => import('../../views/admin/peserta/index'))
    },
    {
        path: '/peserta/detail',
        component: lazy(() => import('../../views/admin/peserta/detail'))
    },
    {
        path: '/peserta/jumlah',
        component: lazy(() => import('../../views/admin/gelombang/jmlPerGeolbang'))
    },
    {
        path: '/landing-slide',
        component: lazy(() => import('../../views/admin/slide'))
    },
    {
        path: '/ekstrakulikuler',
        component: lazy(() => import('../../views/admin/slide'))
    }
]

export default Admin