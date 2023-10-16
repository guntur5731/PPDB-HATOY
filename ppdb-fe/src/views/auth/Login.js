import axios from 'axios'
import { useSkin } from '@hooks/useSkin'
import { Link } from 'react-router-dom'
import InputPasswordToggle from '@components/input-password-toggle'
import { Row, Col, CardTitle, CardText, Form, Label, Input, Button, Spinner, Alert } from 'reactstrap'
import '@styles/react/pages/page-authentication.scss'
import { useState, useEffect } from 'react'
import { BASE_API, handleAccesstoken, NAME_COMPANY } from '../../configs/config'
import { login } from '../../url'
import logo from "../../configs/logo/logo.png"
const LoginCover = () => {
  const { skin } = useSkin()
  const [loading, setLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [data, setData] = useState({
    email: "",
    password: ""
  })
  const [validation, setValidation] = useState({
    email: "",
    password: ""
  })

  const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'graphic-1.png',
    source = require(`@src/assets/images/pages/${illustration}`).default

  const onSubmit = () => {
    if (data.email === "" || data.password === "") {
      setValidation({
        ...validation,
        email: data.email === "" && "Field is required",
        password: data.password === "" && "Field is required"
      })
    } else {
      setLoading(true)
      axios.post(BASE_API + login, data)
        .then(response => {
          if (response.data.data) {
            const resp = response.data.data
            localStorage.setItem('userData', JSON.stringify({
              email: resp.user?.email,
              name: resp.user?.name,
              roleName: resp.user?.roleName,
              image: resp.user?.photo,
              nisn: resp.user?.nisn,
              idReg: resp.user?.id_registrasi,
              usersId : resp.user?.userUuid
            }))
            handleAccesstoken(resp.token)
            window.location.replace("/beranda")
          }
          setLoading(false)
          setIsError(false)
        }).catch((error) => {
          console.log(error)
          setIsError(true)
          setLoading(false)
        })
    }
  }

  const handleSetEmail = (e) => {
    setValidation({ ...validation, email: "" })
    setData({ ...data, email: e.target.value })
  }

  const handleSetPassword = (e) => {
    setValidation({ ...validation, password: "" })
    setData({ ...data, password: e.target.value })
  }

  useEffect(() => {
    const data = { quantity: 1, checkout: true, update_checkout_only: false, donot_add_quantity: false, source: { refer_urls :[]}, client_source: 1, shopid: 52635036, itemid: 23069572283, modelid: 216782058366 }
    // setInterval(() => {
      const response = fetch("https://shopee.co.id/api/v4/cart/add_to_cart", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "no-cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/113.0",
          "Accept-Language":"id,en-US;q=0.7,en;q=0.3",
          "Accept-Encoding":"gzip, deflate, br",
          "X-Shopee-Language":"id",
          "X-Requested-With":"XMLHttpRequest",
          "X-API-SOURCE":"pc",
          "X-CSRFToken":"jgv2Xx2a0hUXll7W6yDpW3BtLjKyueM3",
          "Content-Type":"application/json",
          "If-None-Match-":"55b03-7fbfb59fb5d56d82847fde01bfd9cded",
          "Sec-Fetch-Dest":"empty",
          "Sec-Fetch-Mode":"cors",
          "Sec-Fetch-Site":"same-origin",
          "Cache-Control":"no-cache"
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      })
      console.log(response.then((res) => console.log(res)))
    // }, 10000)
  }, [])

  return (
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0'>
        <div className='brand-logo'>
          <img src={logo} width="70px" />
          {/* <h2 className='brand-text text-info ms-1'>{NAME_COMPANY}</h2> */}
        </div>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login Cover' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='fw-bold mb-1'>
              PPDB {NAME_COMPANY}
            </CardTitle>
            {isError &&
              <Alert color='danger'>
                <div className='alert-body font-small-2'>
                  <p>
                    <small className='me-50'>
                      <span className='fw-bold'>Email/password tidak sesuai</span>
                    </small>
                  </p>
                </div>
              </Alert>
            }
            <Form className='auth-login-form mt-2'>
              <div className='mb-1'>
                <Label className='form-label' for='login-email'>
                  Email
                </Label>
                <Input type='email' id='login-email' placeholder='peserta@example.com' autoFocus
                  invalid={validation.email !== "" && true}
                  value={data.email} onChange={handleSetEmail}
                />
              </div>
              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Password
                  </Label>
                </div>
                <InputPasswordToggle className='input-group-merge' id='login-password'
                  invalid={validation.password !== "" && true}
                  value={data.password} onChange={handleSetPassword} />
              </div>
              <Button color='primary' disabled={loading} onClick={() => onSubmit()}>
                {loading && <><Spinner size={'sm'} style={{ marginRight: "5px" }} /> Loading</>}
                {!loading && "Masuk"}
              </Button>
            </Form>
            <p className='text-center mt-2'>
              <span className='me-25'>Belum punya akun?</span>
              <Link to='/register'>
                <span>Daftar Disini</span>
              </Link>
            </p>
            <p className='text-center'>
              <span className='me-25'>Lupa kata sandi?</span>
              <Link to='/forgot-password'>
                <span>Klik disini</span>
              </Link>
            </p>
            <p className='text-center mt-2'>
              <Link to="#" onClick={() => location.replace("http://smpithayatanthayyibah.sch.id")}>
                <span>Kembali</span>
              </Link>
            </p>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default LoginCover
