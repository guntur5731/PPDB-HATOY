import { lazy } from 'react'

const Peserta = [
    {
        path: '/biodata',
        component: lazy(() => import('../../views/peserta/biodata/index'))
    }
]

export default Peserta