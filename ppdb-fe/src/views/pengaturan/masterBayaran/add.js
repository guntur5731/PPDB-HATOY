import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Input, Label, Row } from 'reactstrap'
import Select from 'react-select'
import { get } from '../../../configs/apiService'
import { tahunAjaran, masterBayaranList, jenisPembayaran } from '../../../url'
import classnames from 'classnames'
function Add() {
    const [tahunAjar, setTahunAjar] = useState([])
    const [inputData, setInputData] = useState({
        idTahunAjaran: "",
        idTypeKelas: ""
    })
    const [validation, setValidation] = useState({
        idTahunAjaran: "",
        idTypeKelas: ""
    })
    const [tipeKelas, setTipeKelas] = useState([])
    const [listFormPembayaran, setListFormPembayaran] = useState([])

    const getTahunAjar = () => {
        get(tahunAjaran).then((resp) => {
            if (resp.data.data && resp.data.data.length > 0) {
                const data = []
                resp.data.data.forEach((item) => {
                    data.push({ value: item.id_tahun, label: item.tahun_ajaran, allData: item })
                })
                setTahunAjar(data)
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const listBayar = (tahun) => {
        get(`${masterBayaranList}?tahun=${btoa(tahun)}`).then((resp) => {
            if (resp.data.data && resp.data.data.length > 0) {
                const list = []
                list.push({ value: "", label: "Pilih Tipe Kelas" })
                if (resp.data.data.length) {
                    resp.data.data.forEach(v => {
                        list.push(v)
                    })
                }
                setTipeKelas(list)
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const getListBayaran = () => {
        get(jenisPembayaran).then((resp) => {
            if (resp.data.data && resp.data.data.length > 0) {
                const list = []
                resp.data.data.forEach(v => {
                    list.push({
                        id_jenis_pem: v.id_jenis_pem,
                        idTahun: inputData.idTahunAjaran,
                        idType: inputData.idTypeKelas,
                        keterangan: v.keterangan,
                        jumlah: 0,
                        required: false
                    })
                })
                setListFormPembayaran(list)
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const onSubmit = () => {
        if (inputData.idTahunAjaran === "" || inputData.idTypeKelas === "") {
            setValidation({
                ...validation,
                idTahunAjaran: inputData.idTahunAjaran === "" ? true : "",
                idTypeKelas: inputData.idTypeKelas === "" ? true : ""
            })
        } else {
            listFormPembayaran[0].required = true
            console.log(listFormPembayaran[0])
            setListFormPembayaran(listFormPembayaran)
        }
    }

    useEffect(() => {
        getTahunAjar()
    }, [])

    const handleTahunAjaran = (e) => {
        setListFormPembayaran([])
        setTipeKelas([])
        listBayar(e.value)
        setInputData({ ...inputData, idTahunAjaran: e.value, idTypeKelas: "" })
        setValidation({ ...validation, idTahunAjaran: "" })
    }

    const handleTypeKelas = (e) => {
        getListBayaran(e.value)
        setListFormPembayaran([])
        setInputData({ ...inputData, idTypeKelas: e.value })
        setValidation({ ...validation, idTypeKelas: "" })
    }

    const handleKeterangan = (index, e) => {
        listFormPembayaran[index].jumlah = e.target.value
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Tambah Data Master Pembayaran
                </CardTitle>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col md={6} sm={12} className={'mb-2'}>
                        <Label>Tahun Ajaran</Label>
                        <Select
                            className={classnames('react-select', { 'is-invalid': validation.idTahunAjaran !== "" })}
                            classNamePrefix='select'
                            options={tahunAjar}
                            isClearable={false}
                            value={tahunAjar && tahunAjar.find(item => item.value === inputData.idTahunAjaran)}
                            onChange={(e) => {
                                handleTahunAjaran(e)
                            }}
                        />
                    </Col>
                    <Col md={6} sm={12} className={'mb-2'}>
                        <Label>Tipe Kelas</Label>
                        <Select
                            className={classnames('react-select', { 'is-invalid': validation.idTypeKelas !== "" })}
                            classNamePrefix='select'
                            options={tipeKelas}
                            isClearable={false}
                            value={tipeKelas && tipeKelas.find(item => item.value === inputData.idTypeKelas)}
                            onChange={(e) => {
                                handleTypeKelas(e)
                            }}
                        />
                    </Col>
                    <Col md={12} sm={12} className={'mb-2'}>
                        {listFormPembayaran.length ? listFormPembayaran.map(function (item, index) {
                            return (
                                <Col md={12} sm={12} className={'mb-2'} key={index}>
                                    <Label>{item.keterangan}</Label>
                                    <Input type='text' defaultValue={item.jumlah}
                                        className={item.required ? 'is-invalid' : ""}
                                        onChange={(e) => {
                                            handleKeterangan(index, e)
                                        }}
                                    />
                                </Col>
                            )
                        }) : ""}
                    </Col>
                    <Col md={12} sm={12} className="mt-1">
                        <Button onClick={() => onSubmit()} type='button' color='primary'>Simpan</Button>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}
export default Add