// ** Reactstrap Imports
import { Nav, NavItem, NavLink } from 'reactstrap'

// ** Icons Imports
import { Users } from 'react-feather'

const Tabs = ({ activeTab, toggleTab }) => {
  return (
    <Nav pills className='mb-2'>
      <NavItem>
        <NavLink active={activeTab === '1'} color='success' onClick={() => toggleTab('1')}>
          <Users size={18} className='me-50' />
          <span className='fw-bold'>Menunggu Verifikasi</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === '2'} onClick={() => toggleTab('2')}>
          <Users size={18} className='me-50' />
          <span className='fw-bold'>Sudah Terverifikasi</span>
        </NavLink>
      </NavItem>
    </Nav>
  )
}

export default Tabs
