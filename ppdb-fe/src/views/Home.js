import { useEffect } from 'react'
import { getUser } from '../configs/config'
import HomePeseta from './peserta/Home'
import HomeAdmin from './admin/Home'
const Home = () => {
  const users = getUser()
  useEffect(() => {

  }, [])

  return (
    <div>
      {users && users.roleName !== "adminadmin" ? <>
      <HomePeseta/>
      </> : <>
      <HomeAdmin/></>}
    </div>
  )
}

export default Home
