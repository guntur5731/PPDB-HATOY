import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, Col, Input, Label, Row, Spinner } from 'reactstrap'
import { jenisKelamin } from '../../../utility/data/data'
import Select from 'react-select'
const styles = {
    fontSize: "12px",
    color: "red"
}
import Flatpickr from 'react-flatpickr'
import moment from 'moment'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { get, post } from "../../../configs/apiService"
import { detailPeserta } from '../../../configs/apiurl'
import { toast } from 'react-toastify'
export default function dataDiri({ userData }) {
    const [data, setData] = useState({
        nik: "",
        anakKe: "",
        jenisKelamin: "",
        tempatLahir: "",
        tanggalLahir: "",
        asalSekolah: "",
        alamatAsalSekolah: ""
    })
    const [validation, setValidation] = useState({
        nik: "",
        anakKe: "",
        jenisKelamin: "",
        tempatLahir: "",
        tanggalLahir: "",
        asalSekolah: "",
        alamatAsalSekolah: ""
    })

    const [param, setParams] = useState("")

    const [loading, setLoading] = useState(false)

    const onSubmit = () => {
        setLoading(true)
        let paramss = ""
        if (param !== "") {
            paramss = `&id=${param.id}&userUuid=${param.userUuid}`
        }
        data.tanggalLahir = moment(data.tanggalLahir).format("YYYY-MM-DD")
        post(`${detailPeserta}?update=biodata${paramss}`, data).then((res) => {
            if (res && res.data && res.data.response && res.data.response.status) {
                toast.success(res.data.response.message)
            } else {
                if (res.data.response.message.includes("Nik Sudah Terdaftar")) {
                    setValidation({...validation,
                        nik: "Nik Sudah Terdaftar"
                    })
                }
                toast.warn(res.data.response.message)
            }
            setLoading(false)
        }).catch((err) => {
            console.log(err)
            setLoading(false)
        })
    }

    const handleValidasi = () => {
        if (data.nik === "" ||
            data.anakKe === "" ||
            data.jenisKelamin === "" ||
            data.tempatLahir === "" ||
            data.tanggalLahir === "" ||
            data.asalSekolah === "" ||
            data.alamatAsalSekolah === "") {
            setValidation({
                ...validation,
                nik: data.nik === "" && "Kolom wajib diisi",
                anakKe: data.anakKe === "" && "Kolom wajib diisi",
                jenisKelamin: data.jenisKelamin === "" && "Kolom wajib diisi",
                tempatLahir: data.tempatLahir === "" && "Kolom wajib diisi",
                tanggalLahir: data.tanggalLahir === "" && "Kolom wajib diisi",
                asalSekolah: data.asalSekolah === "" && "Kolom wajib diisi",
                alamatAsalSekolah: data.alamatAsalSekolah === "" && "Kolom wajib diisi"
            })
        } else {
            onSubmit()
        }
    }

    const getDataPeserta = (params) => {
        setLoading(true)
        let url = ""
        if (params !== "") {
            url = `${detailPeserta}?id=${params.id}&userUuid=${params.userUuid}`
        } else {
            url = detailPeserta
        }
        get(url)
            .then((res) => {
                if (res && res.data && res.data.data) {
                    const datas = res.data.data
                    setData({
                        nik: datas.nik !== null ? datas.nik : "",
                        anakKe: datas.anakke !== null ? datas.anakke : "",
                        jenisKelamin: datas.jenis_kelamin !== null ? datas.jenis_kelamin : "",
                        tempatLahir: datas.tempat_lahir !== null ? datas.tempat_lahir : "",
                        tanggalLahir: datas.tanggal_lahir !== null ? new Date(datas.tanggal_lahir) : "",
                        asalSekolah: datas.asal_sekolah !== null ? datas.asal_sekolah : "",
                        alamatAsalSekolah: datas.alamat_asal_sekolah !== null ? datas.alamat_asal_sekolah : ""
                    })
                }
                setLoading(false)
            }).catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }

    useEffect(() => {
        if (userData) {
            const params = {
                id: userData.userId,
                userUuid: userData.usersUuid
            }
            setParams(params)
            getDataPeserta(params)
        } else {
            getDataPeserta("")
        }
    }, [])

    return (
        <Col md={12} sm={12}>
            <Card>
                <CardBody>
                    <Row>
                        <Col sm={12} md={12}>
                            <Label>NIK <span style={{ color: "red" }}>*</span></Label>
                            <Input
                                className={validation.nik.length > 0 && 'is-invalid'}
                                type='text'
                                placeholder='NIK'
                                maxLength={20}
                                minLength={10}
                                value={data.nik}
                                onChange={(e) => {
                                    const reg = /^[0-9]+$/
                                    if (reg.test(e.target.value) || e.target.value.length < 1) {
                                        setData({
                                            ...data,
                                            nik: e.target.value
                                        })
                                    }
                                    setValidation({
                                        ...validation,
                                        nik: ""
                                    })
                                }}
                            />
                            <Label style={styles}>{validation.nik}</Label>
                        </Col>
                        <Col sm={12} md={12}>
                            <Label>Anak Ke <span style={{ color: "red" }}>*</span></Label>
                            <Input type='text' value={data.anakKe} placeholder='Anak Ke'
                                className={validation.anakKe.length > 0 && 'is-invalid'}
                                maxLength={2}
                                onChange={(e) => {
                                    const reg = /^[0-9]+$/
                                    if (reg.test(e.target.value) || e.target.value.length < 1) {
                                        setData({
                                            ...data,
                                            anakKe: e.target.value
                                        })
                                    }
                                    setValidation({
                                        ...validation,
                                        anakKe: ""
                                    })
                                }} />
                            <Label style={styles}>{validation.anakKe}</Label>
                        </Col>
                        <Col sm={12} md={12}>
                            <Label>Jenis Kelamin <span style={{ color: "red" }}>*</span></Label>
                            <Select
                                className={`${validation.jenisKelamin.length > 0 && 'is-invalid'} react-select`}
                                classNamePrefix='select'
                                options={jenisKelamin}
                                value={jenisKelamin.find(item => item.value === data.jenisKelamin)}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        jenisKelamin: e.value
                                    })
                                    setValidation({
                                        ...validation,
                                        jenisKelamin: ""
                                    })
                                }}
                                placeholder="Tanggal"
                            />
                            <Label style={styles}>{validation.jenisKelamin}</Label>
                        </Col>
                        <Col sm={12} md={12}>
                            <Label>Tempat Lahir <span style={{ color: "red" }}>*</span></Label>
                            <Input type='text' value={data.tempatLahir} placeholder='Tempat Lahir'
                                className={validation.tempatLahir.length > 0 && 'is-invalid'}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        tempatLahir: e.target.value
                                    })
                                    setValidation({
                                        ...validation,
                                        tempatLahir: ""
                                    })
                                }}
                            />
                            <Label style={styles}>{validation.tempatLahir}</Label>
                        </Col>
                        <Col sm={12} md={12}>
                            <Label>Tanggal Lahir <span style={{ color: "red" }}>*</span></Label>
                            <Flatpickr
                                className={`${validation.tanggalLahir.length > 0 && 'is-invalid'} form-control`}
                                value={data.tanggalLahir}
                                id='default-picker'
                                options={{
                                    dateFormat: 'd-M-Y',
                                    maxDate: new Date()
                                }}
                                onChange={(date) => {
                                    setData({
                                        ...data,
                                        tanggalLahir: new Date(date)
                                    })
                                    setValidation({
                                        ...validation,
                                        tanggalLahir: ""
                                    })
                                }}
                            />
                            <Label style={styles}>{validation.tempatLahir}</Label>
                        </Col>
                        <Col sm={12} md={12}>
                            <Label>Asal Sekolah <span style={{ color: "red" }}>*</span></Label>
                            <Input type='text' value={data.asalSekolah} placeholder='Asal Sekolah'
                                className={validation.asalSekolah.length > 0 && 'is-invalid'}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        asalSekolah: e.target.value
                                    })
                                    setValidation({
                                        ...validation,
                                        asalSekolah: ""
                                    })
                                }} />
                            <Label style={styles}>{validation.asalSekolah}</Label>
                        </Col>
                        <Col sm={12} md={12}>
                            <Label>Alamat Asal Sekolah <span style={{ color: "red" }}>*</span></Label>
                            <Input type='textarea' value={data.alamatAsalSekolah} placeholder='Alamat Asal Sekolah'
                                className={validation.alamatAsalSekolah.length > 0 && 'is-invalid'}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        alamatAsalSekolah: e.target.value
                                    })
                                    setValidation({
                                        ...validation,
                                        alamatAsalSekolah: ""
                                    })
                                }} />
                            <Label style={styles}>{validation.alamatAsalSekolah}</Label>
                        </Col>
                        <Col sm={12} md={12}>
                            <Button disabled={loading} onClick={() => {
                                handleValidasi()
                            }} color='success'>{loading ? <><Spinner size={'sm'} /> Loading</> : <>Simpan</>} </Button>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Col>
    )
}
