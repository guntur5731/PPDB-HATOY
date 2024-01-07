import { lazy } from 'react'

const Peserta = [
    {
        path: '/biodata',
        component: lazy(() => import('../../views/peserta/biodata/index'))
    },
    {
        path: '/daftar-ulang',
        component: lazy(() => import('../../views/peserta/daftarulang'))
    }
]

export default Peserta