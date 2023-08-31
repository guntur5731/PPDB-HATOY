import React, { useState } from 'react'
import { Button, Card, CardBody, CardTitle, Col, Input, Label, Media, Row } from 'reactstrap'
import image from '../../../configs/logo/logo.png'
import '@styles/react/pages/page-authentication.scss'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
import { post } from "../../../configs/apiService"
import { lupaPassword } from '../../../configs/apiurl'
export default function index() {
    const [email, setEmail] = useState("")
    const [validation, setValidation] = useState("")

    const handleSubmit = () => {
        const sendData = {
            email
        }
        post(lupaPassword, sendData)
        .then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
        MySwal.fire({
            title: 'Sukses',
            text: "Email konfirmasi sudah terkirim",
            icon: 'info',
            showCancelButton: false,
            confirmButtonText: 'Oke',
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-outline-danger ms-1'
            },
            buttonsStyling: false
        }).then(function (result) {
            if (result.value) {
                console.log("OK")
            }
        })
    }

    const handleValidasi = () => {
        if (email === "") {
            setValidation(
                email.length < 1 ? "Kolom harus diisi!" : ""
            )
        } else {
            if (/\S+@\S+\.\S+/.test(email) !== true) {
                setValidation("Format email tidak sesuai")
                return
            }
            handleSubmit()
        }
    }
    return (
        <div className='auth-wrapper auth-basic px-2'>
            <div className='auth-inner my-2'>
                <Card className='mb-0'>
                    <CardBody>
                        <CardTitle tag='h4' className='mb-1 text-center'>
                            <Media src={image} width="80px" /> <p />
                            Lupa Kata Sandi
                        </CardTitle>
                        <Row>
                            <Col md={12} sm={12}>
                                <Label>Email<span style={{ color: "red" }}>*</span></Label>
                                <Input type='text' value={email}
                                    className={validation.length > 0 && "is-invalid"}
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                        setValidation("")
                                    }} />
                                {validation.length > 0 && <Label style={{ color: "red" }}>{validation}</Label>}
                            </Col>
                            <Col md={12} sm={12} className="mt-1">
                                <Button type='button' onClick={() => handleValidasi()} color='success' size='sm'>Kirim Kode Verifikasi</Button>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}
