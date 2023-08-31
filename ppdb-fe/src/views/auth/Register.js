// ** React Imports
import { Link } from 'react-router-dom'

// ** Icons Imports
import { Facebook, Twitter, Mail, GitHub } from 'react-feather'

// ** Custom Components
import InputPasswordToggle from '@components/input-password-toggle'

// ** Reactstrap Imports
import { Card, CardBody, CardTitle, CardText, Form, Label, Input, Button, Media, Alert, Spinner } from 'reactstrap'

// ** Styles
import '@styles/react/pages/page-authentication.scss'

import image from '../../configs/logo/logo.png'
import { useState, useEffect } from 'react'
import { get, post } from "../../configs/apiService"
import { apiGelombang, register } from '../../configs/apiurl'
import { toast } from 'react-toastify'

const styles = {
    fontSize: "12px",
    color: "red"
}

const RegisterBasic = () => {
    const [data, setData] = useState({
        namaPeserta: "",
        nisn: "",
        email: "",
        password: "",
        file: "",
        formatFile: ""
    })

    const [dataValidation, setDataValidation] = useState({
        namaPeserta: "",
        nisn: "",
        email: "",
        password: "",
        file: "",
        formatFile: ""
    })
    const [gelombang, setGelombang] = useState("")
    const [successSend, setSuccessSend] = useState("")
    const [loading, setLoading] = useState(false)
    const [loadings, setLoadings] = useState(false)

    const hanleSubmit = () => {
        if (data.namaPeserta === "" ||
            data.nisn === "" ||
            data.email === "" ||
            data.password === "" ||
            data.file === "") {
            setDataValidation({
                namaPeserta: data.namaPeserta.length < 1 && "Nama Peserta harus di isi",
                nisn: data.nisn.length < 1 ? "NISN harus di isi" : data.nisn.length < 8 && "NISN minimal 8 digit",
                email: data.email.length < 1 && "Email harus di isi",
                password: data.password.length < 1 && "Password harus di isi",
                file: data.file.length < 1 && "File harus di isi"
            })
        } else {
            if (/\S+@\S+\.\S+/.test(data.email) !== true) {
                setDataValidation({
                    ...dataValidation,
                    email: "Format email tidak sesuai"
                })
                return
            }
            setLoading(true)
            post(register, data)
                .then((resp) => {
                    if (resp.data && resp.data.data === "Email Sudah Terdaftar") {
                        setDataValidation({
                            ...dataValidation,
                            email: "Email Sudah Terdaftar"
                        })
                    } else if (resp.data && resp.data.data === "Pendaftaran Peserta Didik Baru Sudah Di tutup") {
                        setGelombang("Pendaftaran Peserta Didik Baru Sudah Di tutup")
                    } else {
                        setSuccessSend("Pendaftaran berhasil dilakukan")
                        setData({
                            namaPeserta: "",
                            nisn: "",
                            email: "",
                            password: "",
                            file: "",
                            formatFile: ""
                        })
                    }
                    setLoading(false)
                })
                .catch((err) => {
                    setLoading(false)
                    console.log(err)
                })
        }
    }

    const fileSelectedHandler = (evt) => {
        const reader = new FileReader()
        const file = evt.target.files[0]
        const formatter = (evt.target.files[0]) ? evt.target.files[0].name.substr(-4, 4) : ""
        const format = formatter.toLowerCase()
        if (format === ".jpg" || format === "jpeg" || format === ".png") {
            reader.onload = function (upload) {
                setData({
                    ...data,
                    file: upload.target.result,
                    formatFile: format
                })
                setDataValidation({
                    ...dataValidation,
                    file: ""
                })
            }
            reader.readAsDataURL(file)
        } else {
            toast.warning("Poto peserta format jpg, jpeg dan png")
        }
    }

    const getGlombang = () => {
        setLoadings(true)
        get(apiGelombang)
            .then((resp) => {
                if (resp.data && resp.data.data === null) {
                    setGelombang("Pendaftaran Peserta Didik Baru Sudah Di tutup")
                }
                setLoadings(false)
            }).catch((err) => {
                console.log(err)
                setLoadings(false)
            })
    }

    useEffect(() => {
        getGlombang()
    }, [])

    return (
        <div className='auth-wrapper auth-basic px-2'>
            <div className='auth-inner my-2'>
                {!loadings &&
                    <Card className='mb-0'>
                        <CardBody>
                            <CardTitle tag='h4' className='mb-1 text-center'>
                                <Media src={image} width="80px" /> <p />
                                {gelombang.length < 1 && <>Pendaftaran Peserta Didik Baru</>}
                            </CardTitle>
                            {gelombang.length < 1 ? <>
                                {successSend &&
                                    <div>
                                        <Alert color='success'>
                                            <h4 className='alert-heading'>Sukses</h4>
                                            <div className='alert-body'>
                                                {successSend}
                                            </div>
                                        </Alert>
                                    </div>
                                }
                                <div>
                                    <Label className={'form-label'} for='register-username'>
                                        Nama Peserta
                                    </Label>
                                    <Input invalid={dataValidation.namaPeserta.length > 0} value={data.namaPeserta} type='text' id='register-username' placeholder='johndoe' autoFocus
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                namaPeserta: e.target.value
                                            })
                                            setDataValidation({
                                                ...dataValidation,
                                                namaPeserta: ""
                                            })
                                        }}
                                    />
                                    <Label style={styles}>{dataValidation.namaPeserta}</Label>
                                </div>
                                <div>
                                    <Label className='form-label' for='register-email'>
                                        NISN
                                    </Label>
                                    <Input type='text' id='register-email' placeholder='NISN'
                                        invalid={dataValidation.nisn.length > 0}
                                        value={data.nisn}
                                        onChange={(e) => {
                                            const reg = /^[0-9]+$/
                                            if (reg.test(e.target.value) || e.target.value.length < 1) {
                                                setData({
                                                    ...data,
                                                    nisn: e.target.value
                                                })
                                            }
                                            setDataValidation({
                                                ...dataValidation,
                                                nisn: ""
                                            })
                                        }}
                                    />
                                    <Label style={styles}>{dataValidation.nisn}</Label>
                                </div>
                                <div>
                                    <Label className='form-label' for='register-email'>
                                        Email
                                    </Label>
                                    <Input value={data.email} type='email' id='register-email' placeholder='email@example.com'
                                        // className={dataValidation.email.length > 0 && 'is-invalid'}
                                        invalid={dataValidation.email.length > 0}
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                email: e.target.value
                                            })
                                            setDataValidation({
                                                ...dataValidation,
                                                email: ""
                                            })
                                        }}
                                    />
                                    <Label style={styles}>{dataValidation.email}</Label>
                                </div>
                                <div>
                                    <Label className='form-label' for='register-password'>
                                        Password
                                    </Label>
                                    <InputPasswordToggle id='register-password'
                                        invalid={dataValidation.password.length > 0}
                                        className={`input-group-merge`}
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                password: e.target.value
                                            })
                                            setDataValidation({
                                                ...dataValidation,
                                                password: ""
                                            })
                                        }}
                                        value={data.password}
                                    />
                                    <Label style={styles}>{dataValidation.password}</Label>
                                </div>
                                <div>
                                    <Label className='form-label' for='inputFile'>
                                        Foto Peserta
                                    </Label>
                                    <Input onChange={fileSelectedHandler} type='file' className={`${dataValidation.file.length > 0 && 'is-invalid'}`} id='inputFile' name='fileInput' />
                                    <Label style={styles}>{dataValidation.file}</Label>
                                </div>
                                <Button color='primary' disabled={loading} block onClick={() => hanleSubmit()}>
                                    {loading ? <><Spinner size={"sm"} /> loading</> : <>Daftar</>}
                                </Button>

                                <p className='text-center mt-2'>
                                    <span className='me-25'>Sudah punya akun?</span>
                                    <Link to='/login'>
                                        <span>Masuk Disini</span>
                                    </Link>
                                </p>
                                <p className='text-center mt-2'>
                                    <Link to={"#"} onClick={() => location.replace("https://ppdb.smpithatoy.com")}>
                                        <span>Kembali</span>
                                    </Link>
                                </p>
                            </> : <>
                                <div>
                                    <Alert color='warning'>
                                        <h4 className='alert-heading'>Info</h4>
                                        <div className='alert-body'>
                                            {gelombang}
                                        </div>
                                    </Alert>
                                </div>
                            </>}
                        </CardBody>
                    </Card>
                }
            </div>
        </div>
    )
}

export default RegisterBasic
