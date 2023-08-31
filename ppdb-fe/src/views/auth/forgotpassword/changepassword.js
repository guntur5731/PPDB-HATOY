import React, { useEffect, useState } from 'react'
import '@styles/react/pages/page-authentication.scss'
import { Button, Card, CardBody, CardTitle, Col, Label, Media, Row, Spinner } from 'reactstrap'
import image from '../../../configs/logo/logo.png'
import { Link, useHistory, useLocation } from 'react-router-dom'
import moment from "moment"
import { post } from '../../../configs/apiService'
import { cek_token, changePass } from '../../../configs/apiurl'
import InputPasswordToggle from '@components/input-password-toggle'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
export default function changepassword() {
    const location = useLocation()
    const history = useHistory()
    const [statusUpdate, setStatusUpdate] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loadings, setLoadings] = useState(false)
    const [token, setToken] = useState("")
    const [data, setData] = useState({
        password: "",
        confPassword: ""
    })
    const [validasi, setValidasi] = useState({
        password: "",
        confPassword: ""
    })
    const cekToken = (token) => {
        setLoading(true)
        post(cek_token, { token })
            .then((res) => {
                if (res && res.data && res.data.data) {
                    const convertUrl = atob(location.search.replace("?", ""))
                    const data = convertUrl.split("&")
                    if (data.length === 2) {
                        const date = moment(data[1])
                        if (moment(date).diff(moment(), 'day') > 0) {
                            setStatusUpdate(true)
                        }
                    }
                }
                setLoading(false)
            }).catch((err) => {
                setLoading(false)
                console.log(err)
            })
    }

    useEffect(() => {
        if (location && location.search !== "") {
            cekToken(location.search.replace("?", ""))
            setToken(location.search.replace("?", ""))
        }
    }, [])

    const handleValidasi = () => {
        if (data.password === "" || data.confPassword === "" || (data.password !== data.confPassword)) {
            setValidasi({
                ...validasi,
                password: data.password === "" ? "Password Tidak Boleh Kosong" : data.password.length < 8 ? "Password minimal 8 karakter" : "",
                confPassword: data.confPassword === "" ? "Konfirmasi Password Tidak Boleh Kosong" : data.password !== data.confPassword ? "Konfirmasi password tidak tepat" : ""
            })
        } else {
            if (data.password.length < 8) {
                setValidasi({
                    ...validasi,
                    password: "Password minimal 8 karakter"
                })
                return
            }
            setLoadings(true)
            const sendData = {
                token,
                newPassword: data.password,
                confPassword: data.confPassword
            }
            post(changePass, sendData)
                .then((res) => {
                    setLoadings(false)
                    if (res && res.data && res.data.response && res.data.response.status) {
                        MySwal.fire({
                            title: 'Sukses',
                            text: "Kata Sandi berhasil di perbaharui",
                            icon: 'info',
                            showCancelButton: false,
                            confirmButtonText: 'Oke',
                            customClass: {
                                confirmButton: 'btn btn-success',
                                cancelButton: 'btn btn-outline-danger ms-1'
                            },
                            allowOutsideClick: false,
                            buttonsStyling: false
                        }).then(function (result) {
                            if (result.value) {
                                history.push("/login")
                            }
                        })
                    }
                }).catch((err) => {
                    console.log(err)
                    setLoadings(false)
                })
        }
    }

    return (
        <div className='auth-wrapper auth-basic px-2'>
            <div className='auth-inner my-2'>
                {!loading && statusUpdate && <>
                    <Card className='mb-0'>
                        <CardBody>
                            <CardTitle tag='h4' className='mb-1 text-center'>
                                <Media src={image} width="80px" /> <p />
                                Ubah Kata Sandi
                            </CardTitle>
                            <Row>
                                <Col md={12} sm={12}>
                                    <Label>Kata Sandi Baru<span style={{ color: "red" }}>*</span></Label>
                                    <InputPasswordToggle id="id1"
                                        placeHolder="Kata sandi baru"
                                        className={validasi.password.length && "is-invalid"}
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                password: e.target.value
                                            })
                                            setValidasi({
                                                ...validasi,
                                                password: ""
                                            })
                                        }}
                                    />
                                    {validasi.password.length > 0 && <Label style={{ color: "red" }}>{validasi.password}</Label>}
                                </Col>
                                <Col md={12} sm={12}>
                                    <Label>Konfirmasi Kata Sandi<span style={{ color: "red" }}>*</span></Label>
                                    <InputPasswordToggle id="id2"
                                        placeHolder="Konfirmasi Kata sandi"
                                        className={validasi.confPassword.length && "is-invalid"}
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                confPassword: e.target.value
                                            })
                                            setValidasi({
                                                ...validasi,
                                                confPassword: ""
                                            })
                                        }}
                                    />
                                    {validasi.confPassword.length > 0 && <Label style={{ color: "red" }}>{validasi.confPassword}</Label>}
                                </Col>
                                <Col md={12} sm={12} className="mt-1">
                                    <Button disabled={loadings} type='button' onClick={() => handleValidasi()} color='success' size='sm'>
                                        {loadings ? <><Spinner size={"sm"} /> loading</> : <>
                                            Simpan</>
                                        }
                                    </Button>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </>}
                {!loading && !statusUpdate && <Card>
                    <CardBody>
                        <CardTitle tag='h4' className='mb-1 text-center'>
                            <Media src={image} width="80px" /> <p />
                            Masa aktif token sudah habis
                        </CardTitle>
                        <p className='text-center mt-1'>
                            <Link to='/login'>
                                <span>Kembali</span>
                            </Link>
                        </p>
                    </CardBody>
                </Card>}
            </div>
        </div>
    )
}
