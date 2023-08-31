// ** Reactstrap Imports
import { Button, Form, Input, Row, Col } from 'reactstrap'

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'
import themeConfig from '@configs/themeConfig'
// ** Styles
import '@styles/base/pages/page-misc.scss'
import { Link } from 'react-router-dom'

const ComingSoon = () => {
  // ** Hooks
  const { skin } = useSkin()

  const illustration = skin === 'dark' ? 'coming-soon-dark.svg' : 'coming-soon.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default

  return (
    <div className='misc-wrapper'>
      <a className='brand-logo' href='/'>
        <img src={themeConfig.app.appLogoImage} alt='logo' width={"150px"} />
      </a>
      <div className='misc-inner p-2 p-sm-3'>
        <div className='w-100 text-center'>
          <h2 className='mb-1'>Coming Soon 🚀</h2>
          <Button tag={Link} to='/' color='primary' className='btn-sm-block mb-2'>
            Kembali Ke Beranda
          </Button>
          <img className='img-fluid' src={source} alt='Coming soon page' />
        </div>
      </div>
    </div>
  )
}
export default ComingSoon