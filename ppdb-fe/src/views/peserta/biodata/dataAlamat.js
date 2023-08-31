import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Button, Card, CardBody, Col, Input, Label, Row, Spinner } from 'reactstrap'
import { get, post } from '../../../configs/apiService'
import { detailPeserta } from '../../../configs/apiurl'
const styles = {
    fontSize: "12px",
    color: "red"
}
export default function dataAlamat({ userData }) {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        kwn: "",
        alamat: "",
        rt: "",
        rw: "",
        kelurahan: "",
        kecamatan: "",
        kota: "",
        kode_pos: ""
    })
    const [validation, setValidation] = useState({
        kwn: "",
        alamat: "",
        rt: "",
        rw: "",
        kelurahan: "",
        kecamatan: "",
        kota: "",
        kode_pos: ""
    })
    const [param, setParams] = useState("")

    const onSubmit = () => {
        setLoading(true)
        let paramss = ""
        if (param !== "") {
            paramss = `&id=${param.id}&userUuid=${param.userUuid}`
        }
        post(`${detailPeserta}?update=alamat${paramss}`, data).then((res) => {
            if (res && res.data && res.data.response && res.data.response.status) {
                toast.success(res.data.response.message)
            }
            setLoading(false)
        }).catch((err) => {
            console.log(err)
            setLoading(false)
        })
    }

    const handleValidasi = () => {
        const { kwn, alamat, rt, rw, kelurahan, kecamatan, kota, kode_pos } = data
        if (kwn === "" ||
            alamat === "" ||
            rt === "" ||
            rw === "" ||
            kelurahan === "" ||
            kecamatan === "" ||
            kota === "" ||
            kode_pos === "") {
            setValidation({
                kwn: data.kwn === "" && "Kolom wajib diisi",
                alamat: data.alamat === "" && "Kolom wajib diisi",
                rt: data.rt === "" && "Kolom wajib diisi",
                rw: data.rw === "" && "Kolom wajib diisi",
                kelurahan: data.kelurahan === "" && "Kolom wajib diisi",
                kecamatan: data.kecamatan === "" && "Kolom wajib diisi",
                kota: data.kota === "" && "Kolom wajib diisi",
                kode_pos: data.kode_pos === "" && "Kolom wajib diisi"
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
                        kwn: datas.kwn !== null ? datas.kwn : "",
                        alamat: datas.alamat !== null ? datas.alamat : "",
                        rt: datas.rt !== null ? datas.rt : "",
                        rw: datas.rw !== null ? datas.rw : "",
                        kelurahan: datas.kelurahan !== null ? datas.kelurahan : "",
                        kecamatan: datas.kecamatan !== null ? datas.kecamatan : "",
                        kota: datas.kota !== null ? datas.kota : "",
                        kode_pos: datas.kode_pos !== null ? datas.kode_pos : ""
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
                            <Label>Kewarganegaraan</Label>
                            <Input type='text' placeholder='Kewarganegaraan'
                                className={validation.kwn.length > 0 && 'is-invalid'}
                                value={data.kwn}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        kwn: e.target.value
                                    })
                                    setValidation({
                                        ...validation,
                                        kwn: ""
                                    })
                                }}
                            />
                            <Label style={styles}>{validation.kwn}</Label>
                        </Col>
                        <Col sm={12} md={12}>
                            <Label>Alamat</Label>
                            <Input type='textarea' placeholder='Alamat'
                                className={validation.alamat.length > 0 && 'is-invalid'}
                                value={data.alamat}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        alamat: e.target.value
                                    })
                                    setValidation({
                                        ...validation,
                                        alamat: ""
                                    })
                                }} />
                            <Label style={styles}>{validation.alamat}</Label>
                        </Col>
                        <Col sm={12} md={12} >
                            <Label>RT</Label>
                            <Input type='text' placeholder='RT'
                                className={validation.rt.length > 0 && 'is-invalid'}
                                value={data.rt}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        rt: e.target.value
                                    })
                                    setValidation({
                                        ...validation,
                                        rt: ""
                                    })
                                }} />
                            <Label style={styles}>{validation.rt}</Label>
                        </Col>
                        <Col sm={12} md={12} >
                            <Label>RW</Label>
                            <Input type='text' placeholder='RW'
                                className={validation.rw.length > 0 && 'is-invalid'}
                                value={data.rw}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        rw: e.target.value
                                    })
                                    setValidation({
                                        ...validation,
                                        rw: ""
                                    })
                                }} />
                            <Label style={styles}>{validation.rw}</Label>
                        </Col>
                        <Col sm={12} md={12} >
                            <Label>Kelurahan/Desa</Label>
                            <Input type='text' placeholder='Kelurahan/Desa'
                                value={data.kelurahan}
                                className={validation.kelurahan.length > 0 && 'is-invalid'}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        kelurahan: e.target.value
                                    })
                                    setValidation({
                                        ...validation,
                                        kelurahan: ""
                                    })
                                }} />
                            <Label style={styles}>{validation.kelurahan}</Label>
                        </Col>
                        <Col sm={12} md={12} >
                            <Label>Kecamatan</Label>
                            <Input type='text' placeholder='Kecamatan'
                                className={validation.kecamatan.length > 0 && 'is-invalid'}
                                value={data.kecamatan}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        kecamatan: e.target.value
                                    })
                                    setValidation({
                                        ...validation,
                                        kecamatan: ""
                                    })
                                }} />
                            <Label style={styles}>{validation.kecamatan}</Label>
                        </Col>
                        <Col sm={12} md={12}>
                            <Label>Kota/Kabupaten</Label>
                            <Input type='text' placeholder='Kota/Kabupaten'
                                className={validation.kota.length > 0 && 'is-invalid'}
                                value={data.kota}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        kota: e.target.value
                                    })
                                    setValidation({
                                        ...validation,
                                        kota: ""
                                    })
                                }} />
                            <Label style={styles}>{validation.kota}</Label>
                        </Col>
                        <Col sm={12} md={12}>
                            <Label>Kode Pos</Label>
                            <Input type='text' placeholder='Kode Pos'
                                className={validation.kode_pos.length > 0 && 'is-invalid'}
                                value={data.kode_pos}
                                maxLength={10}
                                onChange={(e) => {
                                    const reg = /^[0-9]+$/
                                    if (reg.test(e.target.value) || e.target.value.length < 1) {
                                        setData({
                                            ...data,
                                            kode_pos: e.target.value
                                        })
                                    }
                                    setValidation({
                                        ...validation,
                                        kode_pos: ""
                                    })
                                }}
                            />
                            <Label style={styles}>{validation.kode_pos}</Label>
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
