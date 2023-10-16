import React, { useEffect, useState } from 'react'
import { Badge, Button, Card, CardBody, Col, Input, Label, Media, Modal, ModalBody, ModalFooter, ModalHeader, Row, TabContent, TabPane } from 'reactstrap'
// import CardAction from '@components/card-actions'
// import * as Icon from 'react-feather'
import Tabs from './Tabs'
import DataDiri from './dataDiri'
import DataAlamat from './dataAlamat'
import DataKeluarga from './dataKeluarga'
import DataBerkas from './dataBerkas'
import Avatar from '@components/avatar'
import { BASE_API, BASE_API_IMAGE, getUser } from '../../../configs/config'
import { useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { get, post } from '../../../configs/apiService'
import { detailUser, donwloadbiodata, updateBiodata } from '../../../configs/apiurl'
import { toast } from 'react-toastify'
import InputPasswordToggle from '@components/input-password-toggle'
const MySwal = withReactContent(Swal)
export default function index() {
  const [activeTab, setActiveTab] = useState('1')
  const location = useLocation()
  const [users, setUser] = useState(null)
  const [userData, setUserData] = useState("")
  const [modalProfile, setModalProfile] = useState(false)
  const [modalResetPassword, setModalResetPassword] = useState(false)
  const [userId, setUserId] = useState("")
  const [userUuid, setUserUuid] = useState("")
  const [loading, setLoading] = useState(false)
  const [pass, setPass] = useState({
    oldPassword: "",
    newPassword: "",
    confPassword: ""
  })
  const [validPass, setValidPass] = useState({
    oldPassword: "",
    newPassword: "",
    confPassword: ""
  })
  const [validasiProfile, setValisiProfile] = useState({
    nama: "",
    email: "",
    nisn: ""
  })
  const [dataProfile, setProfile] = useState({
    nama: "",
    email: "",
    nisn: ""
  })
  const [isAdmin, setAdmin] = useState(false)
  const toggleTab = tab => {
    setActiveTab(tab)
  }
  const renderUserImg = () => {
    return (<Avatar
      initials
      color={"success"}
      className='rounded mt-3 mb-2'
      content={"Guntur"}
      contentStyles={{
        borderRadius: 0,
        fontSize: 'calc(48px)',
        width: '100%',
        height: '100%'
      }}
      style={{
        height: '110px',
        width: '110px'
      }}
    />)
  }
  const getDataPeserta = (params) => {
    setLoading(true)
    console.log(loading)
    let url = ""
    if (params !== "") {
      url = `${detailUser}?id=${params.id}`
    } else {
      url = detailUser
    }
    get(url)
      .then((res) => {
        if (res && res.data && res.data.data) {
          const datas = res.data.data
          setUser({
            name: datas.name,
            image: datas.photo,
            idReg: datas.id_registrasi,
            email: datas.email,
            nisn: datas.nisn,
            userUuid: datas.userUuid
          })
          setUserId(datas.id)
        }
        setLoading(false)
      }).catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  useEffect(() => {
    if (location?.state) {
      const user = location.state.userData
      setUserId(user.userId)
      setUserUuid(user.userUuid)
      setAdmin(true)
      setUser({
        name: user.name,
        image: user.photo,
        idReg: user.id_registrasi,
        email: user.email,
        nisn: user.nisn
      })
      setUserData(user)
      const paramss = {
        id: user.userId
      }
      getDataPeserta(paramss)
    } else {
      setUser(getUser())
      getDataPeserta("")
    }
  }, [])

  const handleSubmit = (param) => {
    let sendData = {}
    if (param === "profile") {
      const { nama, email, nisn } = dataProfile
      if (isAdmin) {
        sendData = {
          param,
          nama,
          email,
          nisn,
          userId,
          userUuid
        }
      } else {
        sendData = {
          param,
          nama,
          email,
          nisn
        }
      }
    } else if (param === "resetpass") {
      sendData = {
        param,
        userId,
        userUuid
      }
    } else if (param === "editpass") {
      sendData = {
        newPassword: pass.newPassword,
        oldPassword: pass.oldPassword,
        param
      }
    }

    post(updateBiodata, sendData)
      .then((res) => {
        if (res && res.data && res.data.response && res.data.response.status) {
          toast.success("Update data berhasil")
          setProfile({
            nama: "",
            email: "",
            nisn: ""
          })
          if (param === "profile") {
            setModalProfile(!modalProfile)
          } else if (param === "editpass") {
            setModalResetPassword(!modalResetPassword)
          }
          if (isAdmin) {
            const paramss = {
              id: userId
            }
            getDataPeserta(paramss)
          } else {
            getDataPeserta("")
          }
        } else {
          if (res.data.response.message === "Kata sandi saat ini tidak sesuai") {
            setValidPass({
              ...validPass,
              oldPassword: res.data.response.message
            })
          }
          toast.error(res.data.response.message)
        }
      }).catch((err) => console.log(err))
  }

  const resetPass = () => {
    MySwal.fire({
      title: 'Konfirmasi',
      text: `Apakah anda yakin mereset password akun ${users.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya',
      cancelButtonText: 'Tidak',
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    }).then(function (result) {
      if (result.value) {
        handleSubmit("resetpass")
      }
    })
  }

  const handleValidasi = (param) => {
    if (param === "profile") {
      if (dataProfile.nama === "" || dataProfile.email === "" || dataProfile.nisn === "") {
        setValisiProfile({
          nama: dataProfile.nama === "" ? "Kolom wajib diisi" : "",
          email: dataProfile.email === "" ? "Kolom wajib diisi" : "",
          nisn: dataProfile.nisn === "" ? "Kolom wajib diisi" : ""
        })
      } else {
        if (/\S+@\S+\.\S+/.test(dataProfile.email) !== true) {
          setValisiProfile({
            ...validasiProfile,
            email: "Format email tidak sesuai"
          })
        } else {
          handleSubmit(param)
        }
      }
    } else if (param === "editpass") {
      if (pass.newPassword === "" || pass.oldPassword === "" || pass.confPassword === "") {
        setValidPass({
          oldPassword: pass.oldPassword === "" ? "Kolom Wajib diisi" : "",
          newPassword: pass.newPassword === "" ? "Kolom Wajib diisi" : "",
          confPassword: pass.confPassword === "" ? "Kolom Wajib diisi" : ""
        })
      } else {
        if (pass.oldPassword === pass.newPassword) {
          setValidPass({
            ...validPass,
            newPassword: "Kata sandi baru tidak boleh sama dengan password saat ini"
          })
        } else if (pass.newPassword !== pass.confPassword) {
          setValidPass({
            ...validPass,
            confPassword: "Konfirmasi Kata sandi tidak sesuai"
          })
        } else if (pass.newPassword.length < 8) {
          setValidPass({
            ...validPass,
            newPassword: "Kata sandi baru harus lebih dari 8 karakter"
          })
        } else {
          handleSubmit(param)
        }
      }
    }
  }
  const donwloadBerkas = () => {
    const usersData = users?.userUuid !== null ? users?.userUuid : null
    window.open(`${BASE_API + donwloadbiodata}?data=${usersData}`)
  }
  return (
    <div>
      {users !== null &&
        <Row>
          <Col md={3} sm={12}>
            <Card>
              <CardBody>
                <div className='user-avatar-section'>
                  <div className='d-flex align-items-center flex-column'>
                    {users?.image === null || users?.image === "" ? renderUserImg() : <>
                      <Media
                        src={`${BASE_API_IMAGE}/${users.image}`}
                        height="150"
                        width="150"
                        style={{objectFit: "cover"}}
                      /></>}
                    <div className='d-flex flex-column align-items-center text-center mt-1'>
                      <div className='user-info'>
                        <h4>{users?.name}</h4>
                        <h4>{users?.idReg}</h4>
                        <Badge color={'success'} className='text-capitalize'>
                          Calon users Didik
                        </Badge>
                        <br />
                        <Button color='success' onClick={() => {
                          setProfile({
                            nama: users?.name,
                            email: users.email,
                            nisn: users.nisn
                          })
                          setModalProfile(!modalProfile)
                        }} className='mt-1' size={"sm"} style={{ marginRight: "1px" }}>
                          Edit Profile
                        </Button>
                        {userData !== "" ? <Button color='warning' onClick={() => {
                          resetPass()
                        }} className='mt-1' size={"sm"}>
                          Reset Password
                        </Button> : <Button color='warning' className='mt-1' onClick={() => setModalResetPassword(!modalResetPassword)} size={"sm"}>
                          Edit Password
                        </Button>}
                        <Button color='info' size='sm' className='mt-1' onClick={() => donwloadBerkas()}>Download Kartu Daftar</Button>
                      </div>
                    </div>
                  </div>
                </div>
                <h4 className='fw-bolder border-bottom pb-50 mb-1 mt-1'>Detail</h4>
                <div className='info-container'>
                  <ul className='list-unstyled'>
                    <li className='mb-75'>
                      <span className='fw-bolder me-25'>Email:</span>
                      <span>{users?.email}</span>
                    </li>
                    <li className='mb-75'>
                      <span className='fw-bolder me-25'>Nama Lengkap:</span>
                      <span>{users?.name}</span>
                    </li>
                    <li className='mb-75'>
                      <span className='fw-bolder me-25'>No Registrasi:</span>
                      <span>{users?.idReg}</span>
                    </li>
                    <li className='mb-75'>
                      <span className='fw-bolder me-25'>NISN:</span>
                      <span>{users?.nisn}</span>
                    </li>
                  </ul>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md={9} sm={12}>
            <Tabs className='mb-2' activeTab={activeTab} toggleTab={toggleTab} />
            <TabContent activeTab={activeTab}>
              <TabPane tabId='1'>
                {(activeTab === 1 || activeTab === "1") && <DataDiri userData={userData} />}
              </TabPane>
              <TabPane tabId='2'>
                {(activeTab === 2 || activeTab === "2") && <DataKeluarga userData={userData} />}
              </TabPane>
              <TabPane tabId='3'>
                {(activeTab === 3 || activeTab === "3") && <DataAlamat userData={userData} />}
              </TabPane>
              <TabPane tabId='4'>
                {(activeTab === 4 || activeTab === "4") && <DataBerkas userData={userData} />}
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      }
      <Modal isOpen={modalProfile} size={"md"} toggle={() => setModalProfile(!modalProfile)}>
        <ModalHeader toggle={() => setModalProfile(!modalProfile)}>Edit Profile</ModalHeader>
        <ModalBody>
          <Row>
            <Col sm={12} lg={12}>
              <Label>Nama Lengkap</Label>
              <Input type='text' className={validasiProfile.nama !== "" && "is-invalid"} value={dataProfile.nama} onChange={(e) => {
                // const reg = /^[a-zA-Z@]+$/
                // if (reg.test(e.target.value) || e.target.value.length < 1) {
                setProfile({
                  ...dataProfile,
                  nama: e.target.value
                })
                // }
                setValisiProfile(({
                  ...validasiProfile,
                  nama: ""
                }))
              }} />
              {validasiProfile.nama.length > 0 && <Label style={{ color: "red" }}>{validasiProfile.nama}</Label>}
            </Col>
            <Col sm={12} lg={12}>
              <Label>Email</Label>
              <Input className={validasiProfile.email !== "" && "is-invalid"} type='text' value={dataProfile.email} onChange={(e) => {
                setProfile({
                  ...dataProfile,
                  email: e.target.value
                })
                setValisiProfile(({
                  ...validasiProfile,
                  email: ""
                }))
              }} />
              {validasiProfile.email.length > 0 && <Label style={{ color: "red" }}>{validasiProfile.email}</Label>}
            </Col>
            <Col sm={12} lg={12}>
              <Label>NISN</Label>
              <Input className={validasiProfile.nisn !== "" && "is-invalid"} type='text' value={dataProfile.nisn} onChange={(e) => {
                const reg = /^[0-9]+$/
                if (reg.test(e.target.value) || e.target.value.length < 1) {
                  setProfile({
                    ...dataProfile,
                    nisn: e.target.value
                  })
                }
                setValisiProfile(({
                  ...validasiProfile,
                  nisn: ""
                }))
              }} />
              {validasiProfile.nisn.length > 0 && <Label style={{ color: "red" }}>{validasiProfile.nisn}</Label>}
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color='success' onClick={() => handleValidasi("profile")}>
            Simpan
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={modalResetPassword} size={"md"} toggle={() => setModalResetPassword(!modalResetPassword)}>
        <ModalHeader toggle={() => setModalResetPassword(!modalResetPassword)}>Edit Profile</ModalHeader>
        <ModalBody>
          <Row>
            <Col sm={12} lg={12}>
              <Label>Kata sandi saat ini</Label>
              <InputPasswordToggle onChange={(e) => {
                setPass({
                  ...pass,
                  oldPassword: e.target.value
                })
                setValidPass({
                  ...validPass,
                  oldPassword: ""
                })
              }} />
              {validPass.oldPassword.length > 0 && <Label style={{ color: "red" }}>{validPass.oldPassword}</Label>}
            </Col>
            <Col sm={12} lg={12}>
              <Label>Kata sandi baru</Label>
              <InputPasswordToggle onChange={(e) => {
                setPass({
                  ...pass,
                  newPassword: e.target.value
                })
                setValidPass({
                  ...validPass,
                  newPassword: ""
                })
              }} />
              {validPass.newPassword.length > 0 && <Label style={{ color: "red" }}>{validPass.newPassword}</Label>}
            </Col>
            <Col sm={12} lg={12}>
              <Label>Konfirmasi kata sandi</Label>
              <InputPasswordToggle onChange={(e) => {
                setPass({
                  ...pass,
                  confPassword: e.target.value
                })
                setValidPass({
                  ...validPass,
                  confPassword: ""
                })
              }} />
              {validPass.confPassword.length > 0 && <Label style={{ color: "red" }}>{validPass.confPassword}</Label>}
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color='success' onClick={() => handleValidasi("editpass")}>
            Verifikasi
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}
