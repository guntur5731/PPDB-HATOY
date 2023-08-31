import * as Icon from 'react-feather'

export default [
  {
    id: 'home',
    title: 'Home',
    icon: <Icon.Home size={20} />,
    navLink: '/beranda'
  },
  {
    id: 'daftar',
    title: 'Daftar',
    icon: <Icon.ExternalLink size={20} />,
    navLink: '/redirect'
  },
  {
    id: 'masuk',
    title: 'masuk',
    icon: <Icon.LogIn size={20} />,
    navLink: '/redirect'
  }
]
