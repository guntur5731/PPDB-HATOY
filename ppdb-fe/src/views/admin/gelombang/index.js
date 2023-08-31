import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner } from 'reactstrap'
import { get, patch, post, put } from "../../../configs/apiService"
import { gelombang } from '../../../configs/apiurl'
import * as Icon from 'react-feather'
import Select from 'react-select'
import { dataGelombang } from '../../../utility/data/data'
import Flatpickr from 'react-flatpickr'
import moment from 'moment'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
const styles = {
    fontSize: "12px",
    color: "red"
}
export default function index() {
    const [data, setData] = useState([])
    const [tahun, setTahun] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    const [loading, setLoading] = useState(false)
    const [centeredModal, setCenteredModal] = useState(false)
    const [kodeGel, setKodeGel] = useState("")
    const [inputData, setInputData] = useState({
        idGlombang: "",
        gelombang: "",
        tanggalMulai: new Date(),
        tanggalSelesai: new Date(),
        tahunAjaran: ""
    })
    const [validationData, setValidationData] = useState({
        gelombang: "",
        tanggalSelesai: "",
        tahunAjaran: ""
    })
    const getList = () => {
        setLoading(true)
        get(gelombang).then((res) => {
            if (res.data && res.data.data && res.data.data.length > 0) {
                setData(res.data.data)
            }
            setLoading(false)
        }).catch((err) => {
            console.log(err)
            setLoading(false)
        })
    }
    const handleDelete = (row) => {
        MySwal.fire({
            title: 'Konfirmasi',
            text: `Apakah anda yakin menghapus gelombang ${row.gelombang}?`,
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
                setLoading(true)
                patch(gelombang, { id: row.id_gelombang })
                    .then((res) => {
                        if (res && res.data && res.data.response && res.data.response.status) {
                            toast.success(res.data.response.message)
                            getList()
                        }
                        setLoading(false)
                    }).catch((err) => {
                        console.log(err)
                        setLoading(false)
                    })
            }
        })
    }
    const handleOpen = (row) => {
        MySwal.fire({
            title: 'Konfirmasi',
            text: `Apakah anda yakin ${row.posting === 1 || row.posting === "1" ? "menonaktif" : "mengaktifkan"} gelombang ${row.gelombang}?`,
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
                setLoading(true)
                put(`${gelombang}?status=open`, { id: row.id_gelombang, aktif: row.posting })
                    .then((res) => {
                        if (res && res.data && res.data.response && res.data.response.status) {
                            toast.success(res.data.response.message)
                            getList()
                        }
                        setLoading(false)
                    }).catch((err) => {
                        console.log(err)
                        setLoading(false)
                    })
            }
        })
    }
    const handleReset = () => {
        setInputData({
            idGlombang: "",
            gelombang: "",
            tanggalMulai: new Date(),
            tanggalSelesai: new Date(),
            tahunAjaran: ""
        })
    }
    const colums = [
        {
            name: 'Nama Gelombang',
            sortable: true,
            selector: row => (`Gelombang ${row.gelombang}`)
        },
        {
            name: 'Lihat Kode',
            width: "130px",
            selector: row => (<>
                <Button.Ripple onClick={() => {
                    setKodeGel(row.id_gelombang)
                    setCenteredModal(!centeredModal)
                }} key={row.id} className='btn-icon' color='success'>
                    <Icon.Grid size={16} />
                </Button.Ripple>
            </>)
        },
        {
            name: 'Tahun Ajaran',
            sortable: true,
            width: "170px",
            selector: row => row.tahun_ajaran
        },
        {
            name: 'Tanggal Mulai',
            sortable: true,
            selector: row => row.tanggal_mulai
        },
        {
            name: 'Tanggal Selesai',
            sortable: true,
            selector: row => row.tanggal_selesai
        },
        {
            name: 'Aksi',
            width: "80px",
            selector: (row) => (
                <>
                    <Button.Ripple disabled={loading} onClick={() => handleDelete(row)} size={'sm'} className='btn-icon' color='danger'>
                        <Icon.Trash size={16} />
                    </Button.Ripple>
                </>
            )
        },
        {
            name: 'Aksi Gelombang',
            selector: row => (
                <>
                    <Button disabled={loading} size={'sm'} onClick={() => handleOpen(row)}
                        color={row.posting !== null && (row.posting === 1 || row.posting === "1") ? "danger" : "success"}
                    >{row.posting !== null && (row.posting === 1 || row.posting === "1") ? "Tutup Gelombang" : "Buka Gelombang"}</Button>
                </>
            )
        }
    ]
    const getListTahun = () => {
        let year = moment().format("YYYY") - 1
        const listTahun = []
        listTahun.push({ label: "Pilih Tahun", value: "" })
        for (let index = 0; index < 3; index++) {
            listTahun.push({
                label: (year + 1), value: (year + 1)
            })
            year += 1
        }
        setTahun(listTahun)
    }
    useEffect(() => {
        getList()
        getListTahun()
    }, [])

    const handleOnSubmit = () => {
        const sendData = {
            idGlombang: inputData.idGlombang,
            gelombang: inputData.gelombang,
            tanggalMulai: moment(inputData.tanggalMulai).format("YYYY-MM-DD"),
            tanggalSelesai: moment(inputData.tanggalSelesai).format("YYYY-MM-DD"),
            tahunAjaran: inputData.tahunAjaran
        }
        setLoading(true)
        if (isEdit) {
            put(`${gelombang}?status=update`, sendData)
                .then((res) => {
                    if (res && res.data && res.data.response && res.data.response.status) {
                        toast.success(res.data.response.message)
                        handleReset()
                        getList()
                    }
                    setIsEdit(false)
                    setLoading(false)
                }).catch((err) => {
                    console.log(err)
                    setIsEdit(false)
                    setLoading(false)
                })
        } else {
            post(gelombang, sendData)
                .then((res) => {
                    if (res && res.data && res.data.response && res.data.response.status) {
                        toast.success(res.data.response.message)
                        handleReset()
                        getList()
                    }
                    setLoading(false)
                }).catch((err) => {
                    console.log(err)
                    setLoading(false)
                })
        }
    }

    const handleValidasi = () => {
        if (inputData.gelombang === "" ||
            inputData.tanggalSelesai === "" ||
            inputData.tahunAjaran === "") {
            setValidationData({
                gelombang: inputData.gelombang === "" && "Pilih gelombang pendaftaran",
                tanggalSelesai: inputData.tanggalSelesai === "" && "Pilih tanggal selesai",
                tahunAjaran: inputData.tahunAjaran === "" && "Pilih tahun ajaran"
            })
        } else {
            handleOnSubmit()
        }
    }

    const handleRowClick = (row) => {
        setInputData({
            idGlombang: row.id_gelombang,
            gelombang: parseInt(row.gelombang),
            tanggalMulai: new Date(row.tanggal_mulai),
            tanggalSelesai: new Date(row.tanggal_selesai),
            tahunAjaran: parseInt(row.tahun_ajaran)
        })
        setIsEdit(true)
    }
    return (
        <div>
            <Row>
                <Col md={12} sm={12}>
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Gelombang
                            </CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col sm={12} md={3}>
                                    <Label>Gelombang</Label>
                                    <Select
                                        className='react-select'
                                        classNamePrefix='select'
                                        options={dataGelombang}
                                        value={dataGelombang.find(item => item.value === inputData.gelombang)}
                                        onChange={(e) => {
                                            setInputData({
                                                ...inputData,
                                                gelombang: e.value
                                            })
                                            setValidationData({
                                                gelombang: ""
                                            })
                                        }}
                                        placeholder="Tanggal"
                                    />
                                    <Label style={styles}>{validationData.gelombang}</Label>
                                </Col>
                                <Col sm={12} md={3}>
                                    <Label>Tanggal Mulai</Label>
                                    <Flatpickr
                                        className='form-control'
                                        value={inputData.tanggalMulai}
                                        id='default-picker'
                                        options={{
                                            dateFormat: 'd-M-Y'
                                        }}
                                        onChange={(date) => {
                                            setInputData({
                                                ...inputData,
                                                tanggalMulai: new Date(date)
                                            })
                                            setValidationData({
                                                tanggalMulai: ""
                                            })
                                            if (new Date(inputData.tanggalSelesai) < new Date(date)) {
                                                setInputData({
                                                    ...inputData,
                                                    tanggalSelesai: new Date(date)
                                                })
                                            }
                                        }}
                                    />
                                    <Label style={styles}>{validationData.tanggalMulai}</Label>
                                </Col>
                                <Col sm={12} md={3}>
                                    <Label>Tanggal Selesai</Label>
                                    <Flatpickr
                                        className='form-control'
                                        value={inputData.tanggalSelesai}
                                        id='timepicker'
                                        options={{
                                            dateFormat: 'd-M-Y',
                                            minDate: new Date(inputData.tanggalMulai)
                                        }}
                                        onChange={(date) => {
                                            setInputData({
                                                ...inputData,
                                                tanggalSelesai: new Date(date)
                                            })
                                            setValidationData({
                                                tanggalSelesai: ""
                                            })
                                        }}
                                    />
                                    <Label style={styles}>{validationData.tanggalSelesai}</Label>
                                </Col>
                                <Col sm={12} md={3}>
                                    <Label>Tahun ajaran</Label>
                                    <Select
                                        className='react-select'
                                        classNamePrefix='select'
                                        options={tahun}
                                        value={tahun.find(item => item.value === inputData.tahunAjaran)}
                                        onChange={(e) => {
                                            setInputData({
                                                ...inputData,
                                                tahunAjaran: e.value
                                            })
                                            setValidationData({
                                                tahunAjaran: ""
                                            })
                                        }}
                                    />
                                    <Label style={styles}>{validationData.tahunAjaran}</Label>
                                </Col>
                                <Col sm={12} md={12} className="mb-1 flex">
                                    <Button disabled={loading} onClick={() => handleValidasi()} color='success' size={'md'}>
                                        {loading ? <><Spinner size={'sm'} /> loading </> : isEdit ? "Edit Gelombang" : "Tambah Gelombang"}
                                    </Button>
                                    {isEdit &&
                                        <Button style={{ marginLeft: "2px" }} disabled={loading} onClick={() => handleReset()} color='danger' size={'md'}>
                                            Batal
                                        </Button>
                                    }
                                </Col>
                                <Col sm={12} md={12}>
                                    <div className='react-dataTable'>
                                        <DataTable
                                            onRowDoubleClicked={(row) => handleRowClick(row)}
                                            data={data}
                                            progressPending={loading}
                                            columns={colums}
                                            pagination
                                            
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Modal backdrop="static" isOpen={centeredModal} size={'md'}
                toggle={() => {
                    setCenteredModal(!centeredModal)
                    setKodeGel("")
                }}
                className='modal-dialog-centered'>
                <ModalHeader
                    toggle={() => {
                        setCenteredModal(!centeredModal)
                        setKodeGel("")
                    }}
                >Kode Gelombang</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col md={12} sm={12} className={"mb-1 text-center"}>
                            <span style={{fontSize: 30, fontWeight: "bold"}}>{kodeGel}</span>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
        </div>
    )
}
