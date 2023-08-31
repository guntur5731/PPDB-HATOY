import { User, Home, CheckSquare, Bookmark, DollarSign, Users, Circle, Settings } from 'react-feather'
import { getUser } from '../../configs/config'

let menu = []

if (getUser() && getUser().roleName === "adminadmin") {
  menu = [
    {
      id: 'home',
      title: 'Beranda',
      icon: <Home size={20} />,
      navLink: '/beranda'
    },
    {
      id: 'verifikasi',
      title: 'Verifikasi',
      icon: <CheckSquare size={20} />,
      navLink: '/verifikasi'
    },
    {
      id: 'peserta',
      title: 'Peserta',
      icon: <Users size={20} />,
      children: [
        {
          id: 'dataPeserta',
          title: 'Data Peserta',
          icon: <Circle size={12} />,
          navLink: '/peserta'
        },
        {
          id: 'datapergelombang',
          title: 'Gelombang Peserta',
          icon: <Circle size={12} />,
          navLink: '/peserta/jumlah'
        }
      ]
    },
    {
      id: 'gelombang',
      title: 'Gelombang',
      icon: <Bookmark size={20} />,
      navLink: '/gelombang'
    },
    {
      id: 'nilai',
      title: 'Nilai',
      icon: <DollarSign size={20} />,
      navLink: '/nilai'
    },
    {
      id: 'biaya',
      title: 'Informasi Biaya',
      icon: <DollarSign size={20} />,
      navLink: '/biaya'
    },
    {
      id: 'setting',
      title: 'Pengaturan',
      icon: <Settings size={20} />,
      children: [
        {
          id: 'slideLanding',
          title: 'Landing Slide',
          icon: <Circle size={12} />,
          navLink: '/landing-slide'
        },
        {
          id: 'eskul',
          title: 'Ekstrakulikuler',
          icon: <Circle size={12} />,
          navLink: '/ekstrakulikuler'
        }
      ]
    }
  ]
} else if (getUser() && (getUser().roleName === "" || getUser().roleName === null)) {
  menu = [
    {
      id: 'home',
      title: 'Beranda',
      icon: <Home size={20} />,
      navLink: '/beranda'
    },
    {
      id: 'biodata',
      title: 'Biodata',
      icon: <User size={20} />,
      navLink: '/biodata'
    }
  ]
} 

export default menu
