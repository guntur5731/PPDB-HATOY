// ** React Imports
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
// import { isUserLoggedIn } from '@utils'

// ** Third Party Components
import { Power } from 'react-feather'

// ** Reactstrap Imports
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Media } from 'reactstrap'

// ** Default Avatar Image
import { BASE_API_IMAGE, getUser } from "../../../../configs/config"
const UserDropdown = () => {
  // ** State
  const [userData, setData] = useState(1)
  const [userAvatar, setUserAvatar] = useState("")
  const logout = () => {
    localStorage.clear()
    window.location.replace("/login")
  }

  //** ComponentDidMount
  useEffect(() => {
    if (getUser() !== null) {
      setData(getUser())
      setUserAvatar((userData && userData.image !== null && userData.image !== "" && `${BASE_API_IMAGE}/${userData.image}`) || "")
    } else {
      logout()
    }
  }, [])

  const renderUserImg = () => {
    return (<Avatar
      initials
      color={"success"}
      className='rounded'
      content={userData?.name && "User"}
      contentStyles={{
        borderRadius: 0,
        fontSize: 'calc(16px)',
        width: '100%',
        height: '100%'
      }}
      style={{
        height: '40px',
        width: '40px'
      }}
    />)
  }

  return (
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
        <div className='user-nav d-sm-flex d-none'>
          <span className='user-name fw-bold'>{(userData && userData['name']) || 'User'}</span>
          <span className='user-status'>{(userData && userData.idReg) || ''}</span>
        </div>
        {(userAvatar === null || userAvatar === "") && userAvatar === 1 ? renderUserImg() : <Media src={userAvatar} width="40" height="40" style={{ borderRadius: "50%" }} />}
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem tag={Link} to="#" onClick={() => logout()}>
          <Power size={14} className='me-75' />
          <span className='align-middle'>Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
