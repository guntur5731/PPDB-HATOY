// ** React Imports
import { Fragment } from 'react'

// ** Dropdowns Imports
import UserDropdown from './UserDropdown'

import themeConfig from '@configs/themeConfig'
// ** Third Party Components
import { Sun, Moon } from 'react-feather'
import * as Icon from 'react-feather'
// ** Reactstrap Imports
import { Button, NavItem, NavLink } from 'reactstrap'

const NavbarUser = props => {
  // ** Props
  const { skin, setSkin } = props

  // ** Function to toggle Theme (Light/Dark)
  const ThemeToggler = () => {
    if (skin === 'dark') {
      return <Sun className='ficon' onClick={() => setSkin('light')} />
    } else {
      return <Moon className='ficon' onClick={() => setSkin('dark')} />
    }
  }

  return (
    <Fragment>
      <div className='bookmark-wrapper d-flex align-items-center'>
        <NavItem className='d-none d-lg-block'>
          <NavLink className='nav-link-style' style={{}}>
            <img src={themeConfig.app.appLogoImage} alt='logo' width={"150px"} />
            {/* <ThemeToggler /> */}
          </NavLink>
        </NavItem>
      </div>
      <ul className='nav navbar-nav align-items-center ms-auto'>
        <div style={{padding: "5px"}}>
          <Button.Ripple size={"sm"} color='info'>
            <Icon.Facebook size={14} />
          </Button.Ripple>
        </div>
        <div style={{padding: "5px"}}>
          <Button.Ripple size={"sm"} color='info'>
            <Icon.Instagram size={14} />
          </Button.Ripple>
        </div>
        {/* <UserDropdown /> */}
      </ul>
    </Fragment>
  )
}
export default NavbarUser
