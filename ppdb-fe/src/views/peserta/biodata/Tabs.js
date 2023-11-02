// ** Reactstrap Imports
import { Nav, NavItem, NavLink } from 'reactstrap'

// ** Icons Imports
import { User, File, Bookmark, Link, Users, Home, Trash } from 'react-feather'
import { getUser } from '../../../configs/config'

const Tabs = ({ activeTab, toggleTab }) => {
  return (
    <Nav pills className='mb-2'>
      <NavItem>
        <NavLink active={activeTab === '1'} onClick={() => toggleTab('1')}>
          <User size={18} className='me-50' />
          <span className='fw-bold'>Data Diri</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === '2'} onClick={() => toggleTab('2')}>
          <Users size={18} className='me-50' />
          <span className='fw-bold'>Data Keluarga</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === '3'} onClick={() => toggleTab('3')}>
          <Home size={18} className='me-50' />
          <span className='fw-bold'>Data Alamat</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === '4'} onClick={() => toggleTab('4')}>
          <File size={18} className='me-50' />
          <span className='fw-bold'>Berkas</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === '5'} onClick={() => toggleTab('5')}>
          <File size={18} className='me-50' />
          <span className='fw-bold'>Lainnya</span>
        </NavLink>
      </NavItem>
      {getUser() && getUser().roleName === "adminadmin" &&
        <NavItem>
          <NavLink active={activeTab === '6'} onClick={() => toggleTab('6')}>
            <Trash size={18} className='me-50' />
            <span className='fw-bold'>Delete Account</span>
          </NavLink>
        </NavItem>
      }
    </Nav>
  )
}

export default Tabs
