import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, Col, Input, InputGroup, InputGroupText, Label, Row, Spinner } from 'reactstrap'
import Select from 'react-select'
import { detailPeserta } from '../../../configs/apiurl'
import { get, post } from '../../../configs/apiService'
export default function lainnya({ userData }) {
    const jarakOptions = [
        { label: "M", value: "M" },
        { label: "KM", value: "KM" }
    ]
    const jamOptions = [
        { label: "Menit", value: "Menit" },
        { label: "Jam", value: "Jam" }
    ]
    const [data, setData] = useState({
        tinggi_badan: "",
        berat_badan: "",
        jarak_rumah: "",
        waktu_rumah: "",
        jumlah_saudara: "",
        jarak: "M",
        waktu: "Menit"
    })
    const [param, setParams] = useState("")
    const [loading, setLoading] = useState(false)
    function onSubmit() {
        setLoading(true)
        let paramss = ""
        if (param !== "") {
            paramss = `&id=${param.id}&userUuid=${param.userUuid}`
        }
        post(`${detailPeserta}?update=lainnya${paramss}`, data).then((res) => {
            if (res && res.data && res.data.response && res.data.response.status) {
                toast.success(res.data.response.message)
            } else {
                toast.warn(res.data.response.message)
            }
            setLoading(false)
        }).catch((err) => {
            console.log(err)
            setLoading(false)
        })
    }
    const getDataPeserta = (params) => {
        setLoading(true)
        let url = ""
        if (params !== "") {
            url = `${detailPeserta}?userUuid=${params.userUuid}`
        } else {
            url = detailPeserta
        }
        get(url)
            .then((res) => {
                if (res && res.data && res.data.data) {
                    const datas = res.data.data
                    console.log(datas)
                    setData({
                        tinggi_badan: datas.tinggi_badan,
                        berat_badan: datas.berat_badan,
                        jarak_rumah: datas.jarak_rumah,
                        waktu_rumah: datas.waktu_rumah,
                        jumlah_saudara: datas.jumlah_saudara,
                        jarak: datas.jarak,
                        waktu: datas.waktu
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
        <Row>
            <Col md={12} sm={12}>
                <Card>
                    <CardBody>
                        <Row>
                            <Col sm={12} md={6} className='mt-1'>
                                <Label>Tinggi Badan</Label>
                                <Input type='text' placeholder='Tinggi Badan' value={data.tinggi_badan}
                                    onChange={(event) => {
                                        setData({
                                            ...data,
                                            tinggi_badan: event.target.value
                                        })
                                    }}
                                />
                            </Col>
                            <Col sm={12} md={6} className='mt-1'>
                                <Label>Berat Badan</Label>
                                <InputGroup className='mb-2'>
                                    <Input placeholder="Berat Badan" value={data.berat_badan}
                                        onChange={(event) => {
                                            setData({
                                                ...data,
                                                berat_badan: event.target.value
                                            })
                                        }} />
                                    <InputGroupText>Kg</InputGroupText>
                                </InputGroup>
                            </Col>
                            <Col sm={12} md={6} className='mt-1'>
                                <Label>Jarak Tempat Tinggal Kesekolah</Label>
                                <InputGroup className='mb-2'>
                                    <Input placeholder="Jarak Tempat Tinggal Kesekolah" value={data.jarak_rumah}
                                        onChange={(event) => {
                                            setData({
                                                ...data,
                                                jarak_rumah: event.target.value
                                            })
                                        }} />
                                    <Select
                                        className={`react-select`}
                                        classNamePrefix='select'
                                        options={jarakOptions}
                                        value={jarakOptions.find(item => item.value === data.jarak)}
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                jarak: e.value
                                            })
                                        }}
                                    />
                                </InputGroup>
                            </Col>
                            <Col sm={12} md={6} className='mt-1'>
                                <Label>Waktu Tempuh Berangkat Kesekolah</Label>
                                <InputGroup className='mb-2'>
                                    <Input placeholder="Waktu Tempuh Berangkat Kesekolah" value={data.waktu_rumah}
                                        onChange={(event) => {
                                            setData({
                                                ...data,
                                                waktu_rumah: event.target.value
                                            })
                                        }} />
                                    <Select
                                        className={`react-select`}
                                        classNamePrefix='select'
                                        options={jamOptions}
                                        value={jamOptions.find(item => item.value === data.waktu)}
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                waktu: e.value
                                            })
                                        }}
                                    />
                                </InputGroup>
                            </Col>
                            <Col sm={12} md={6} className='mt-1'>
                                <Label>Jumlah Saudara Kandung</Label>
                                <Input type='text' placeholder='Jumlah Saudara Kandung' value={data.jumlah_saudara}
                                    onChange={(event) => {
                                        setData({
                                            ...data,
                                            jumlah_saudara: event.target.value
                                        })
                                    }}
                                />
                            </Col>
                            <Col sm={12} md={12} className='mt-1'>
                                <Button color='success' onClick={() => onSubmit()} disabled={loading}>{loading ? <><Spinner size={"sm"}/> Loading </> : "Simpan"}</Button>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
}
