import { lazy } from 'react'

const Setting = [
    {
      path: '/pengaturan/jurusan',
      component: lazy(() => import('../../views/pengaturan/jurusan'))
    },
    {
      path: '/pengaturan/tipe-kelas',
      component: lazy(() => import('../../views/pengaturan/tipeKelas'))
    },
    {
      path: '/pengaturan/tahun-ajaran',
      component: lazy(() => import('../../views/pengaturan/tahunAjaran'))
    },
    {
      path: '/pengaturan/jenis-pembayaran',
      component: lazy(() => import('../../views/pengaturan/jenisPembayaran'))
    },
    {
      path: '/pengaturan/master-bayaran',
      exact: true,
      component: lazy(() => import('../../views/pengaturan/masterBayaran'))
    },
    {
      path: '/pengaturan/master-bayaran/add',
      component: lazy(() => import('../../views/pengaturan/masterBayaran/add'))
    }
  ]

export default Setting