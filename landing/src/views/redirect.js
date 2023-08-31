// ** Reactstrap Imports

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'
import themeConfig from '@configs/themeConfig'
// ** Styles
import '@styles/base/pages/page-misc.scss'
import { Progress } from 'reactstrap'
import { useEffect, useState } from 'react'
import { BASE_API_PESERTA } from '../configs/config'

const Maintenance = () => {
  // ** Hooks
  const { skin } = useSkin()
  const [persense, setPersense] = useState(0)

  const illustration = skin === 'dark' ? 'under-maintenance-dark.svg' : 'under-maintenance.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default

  useEffect(() => {
    setInterval(() => {
      setPersense(persense + 25)
      if (persense + 25 === 100) {
        clearInterval()
      }
    }, 1000)

    setTimeout(() => {
      location.href = BASE_API_PESERTA
      clearTimeout()
    }, 5000)
  }, [persense])

  return (
    <div className='misc-wrapper'>
      <a className='brand-logo' href='/'>
        <img src={themeConfig.app.appLogoImage} alt='logo' width={"150px"} />
      </a>
      <div className='misc-inner p-2 p-sm-3'>
        <div className='w-100 text-center'>
          <h2 className='mb-1'>Sedang memuat halaman web</h2>
          <Progress value={persense} />
          <p className='mb-3'></p>
          <img className='img-fluid' src={source} alt='Under maintenance page' />
        </div>
      </div>
    </div>
  )
}
export default Maintenance
