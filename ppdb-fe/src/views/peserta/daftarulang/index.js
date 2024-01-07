import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Input, Label, Modal, ModalBody, ModalHeader, Row, Spinner } from 'reactstrap'
import { get, post } from '../../../configs/apiService'
import { toast } from 'react-toastify'
import moment from 'moment'
import * as Icon from 'react-feather'
import { BASE_API_IMAGE } from '../../../configs/config'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

export default function index() {
    const [content, setContent] = useState([])
    const [contentLampiran1, setContentLampiran1] = useState([])
    const [contentLampiran2, setContentLampiran2] = useState([])
    const [loading, setLoading] = useState(false)
    const [loading1, setLoading1] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [loadingUpload, setLoadingUpload] = useState(false)
    const [loadingUpload1, setLoadingUpload1] = useState(false)
    const [loadingUpload2, setLoadingUpload2] = useState(false)
    const [uploadBuktiPembayaran, setUploadBuktiPembayaran] = useState(true)
    const [uploadLampiran1, setUploadLampiran1] = useState(true)
    const [uploadLampiran2, setUploadLampiran2] = useState(true)
    const [centeredModal, setCenteredModal] = useState(false)
    const [viewFile, setViewFile] = useState({
        file: "",
        format: ""
    })
    const cekCountUploadFile = (type) => {
        if (type === "buktibayar" || type === "bukti_transfer") {
            setLoading(true)
        } else if (type === "inputLampiran1" || type === "lampiran_1") {
            setLoading1(true)
        } else if (type === "inputLampiran2" || type === "lampiran_2") {
            setLoading2(true)
        } else {
            setLoading(true)
            setLoading1(true)
            setLoading2(true)
        }
        get("/daftar-cek")
            .then((res) => {
                const data = res.data
                setUploadBuktiPembayaran(data?.data?.buktiTransfer)
                setUploadLampiran1(data?.data?.lampiran1)
                setUploadLampiran2(data?.data?.lampiran2)
                setContent(data?.data?.dataPembayaran)
                setContentLampiran1(data?.data?.dataLampiran1)
                setContentLampiran2(data?.data?.dataLampiran2)
                setLoading(false)
                setLoading1(false)
                setLoading2(false)
            }).catch((err) => {
                console.log(err)
                setLoading(false)
                setLoading1(false)
                setLoading2(false)
            })
    }
    const deleteConfirm = (data) => {
        console.log(data)
        MySwal.fire({
            title: 'Konfirmasi',
            text: `Apakah anda yakin menghapus bukti pembayaran ${moment(data.created_at).format("DD-MM-YYYY")}?`,
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
                if (data.keys === "lampiran_1") {
                    setLoading1(true)
                }
                if (data.keys === "lampiran_2") {
                    setLoading2(true)
                }
                if (data.keys === "bukti_transfer") {
                    setLoading(true)
                }
                get(`/daftar-cek/${data.uuid}`)
                    .then((res) => {
                        if (res && res.data && res.data.response && res.data.response.status) {
                            toast.success(res.data.response.message)
                        }
                        cekCountUploadFile(data.keys)
                    }).catch((err) => {
                        console.log(err)
                        setLoading(false)
                        setLoading1(false)
                        setLoading2(false)
                    })
            }
        })
    }
    const columns = [
        {
            name: 'File',
            sortable: true,
            selector: row => <Button.Ripple size={'sm'} className='btn-icon' color='info' onClick={() => {
                setViewFile({
                    file: row.bukti_transfer,
                    format: row.format
                })
                setCenteredModal(!centeredModal)
            }}>
                {row.format.includes("pdf") ? <Icon.File size={16} /> : <Icon.Image size={16} />}
            </Button.Ripple>
        },
        {
            name: 'Tanggal Upload',
            sortable: true,
            selector: row => moment(row.created_at).format("DD-MM-YYYY")
        },
        {
            name: 'Aksi',
            sortable: true,
            selector: row => <>
                <Button.Ripple name={row.bukti_transfer} size={'sm'} className='btn-icon' color='danger' onClick={() => deleteConfirm(row)}>
                    <Icon.Trash size={16} />
                </Button.Ripple>
            </>
        }
    ]
    const [uploadData, setUploadData] = useState({
        files: null,
        format: null,
        type: "bukti_transfer"
    })
    const [uploadDataLampiran1, setUploadDataLampiran1] = useState({
        files: null,
        format: null,
        type: "lampiran_1"
    })
    const [uploadDataLampiran2, setUploadDataLampiran2] = useState({
        files: null,
        format: null,
        type: "lampiran_2"
    })
    const [validation, setValidation] = useState({
        file: ""
    })
    const [validation1, setValidation1] = useState({
        file: ""
    })
    const [validation2, setValidation2] = useState({
        file: ""
    })
    

    useEffect(() => {
        cekCountUploadFile("all")
    }, [])
    const reset = (status, type) => {
        if (status === true) {
            if (type === "buktibayar") {
                setUploadData({
                    ...uploadData,
                    files: null,
                    format: null
                })
                setValidation({ file: "" })
            }
            if (type === "inputLampiran1") {
                setUploadDataLampiran1({
                    ...uploadDataLampiran1,
                    files: null,
                    format: null
                })
                setValidation1({ file: "" })
            }
            if (type === "inputLampiran2") {
                setUploadDataLampiran2({
                    ...uploadDataLampiran2,
                    files: null,
                    format: null
                })
                setValidation2({ file: "" })
            }
        } else {
            if (type === "buktibayar") {
                setValidation({ file: "" })
            }
            if (type === "inputLampiran1") {
                setValidation1({ file: "" })
            }
            if (type === "inputLampiran2") {
                setValidation2({ file: "" })
            }
        }
        setLoadingUpload(false)
        setLoadingUpload1(false)
        setLoadingUpload2(false)
    }

    const fileSelectedHandlerPem = (evt) => {
        const ids = evt.target.id
        const reader = new FileReader()
        const file = evt.target.files[0]
        const formatter = (evt.target.files[0]) ? evt.target.files[0].name.substr(-4, 4) : ""
        const format = formatter.toLowerCase()
        if (format === ".jpg" || format === "jpeg" || format === ".png" || format === ".pdf") {
            reader.onload = function (upload) {
                if (ids === "buktibayar") {
                    setUploadData({
                        ...uploadData,
                        files: upload.target.result,
                        format
                    })
                    reset(false, "buktibayar")
                }
                if (ids === "inputLampiran1") {
                    setUploadDataLampiran1({
                        ...uploadDataLampiran1,
                        files: upload.target.result,
                        format
                    })
                    reset(false, "inputLampiran1")
                }
                if (ids === "inputLampiran2") {
                    setUploadDataLampiran2({
                        ...uploadDataLampiran2,
                        files: upload.target.result,
                        format
                    })
                    reset(false, "inputLampiran2")
                }
            }
            reader.readAsDataURL(file)
        } else {
            toast.warning("Berkas peserta format jpg, jpeg, png, pdf")
        }
    }

    const onSubmit = (type) => {
        if (uploadData.files !== null || uploadDataLampiran1.files !== null || uploadDataLampiran2.files !== null) {
            let sendData = {}
            if (type === "buktibayar") {
                setLoadingUpload(true)
                sendData = uploadData
            } else if (type === "inputLampiran1") {
                setLoadingUpload1(true)
                sendData = uploadDataLampiran1
            } else if (type === "inputLampiran2") {
                setLoadingUpload2(true)
                sendData = uploadDataLampiran2
            } else {
                return
            }
            post("/daftar-upload", sendData)
                .then((resp) => {
                    if (resp) { }
                    reset(true, type)
                    cekCountUploadFile(type)
                }).catch((err) => {
                    console.log(err)
                    setLoadingUpload(false)
                })
        } else {
            if (type === "buktibayar") {
                setValidation({ file: "File Harus Di Isi" })
            }
            if (type === "inputLampiran1") {
                setValidation1({ file: "File Harus Di Isi" })
            }
            if (type === "inputLampiran2") {
                setValidation2({ file: "File Harus Di Isi" })
            }
        }
    }

    return (
        <Row>
            <Col lg={12} md={12} sm={12}>
                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Ulang</CardTitle>
                    </CardHeader>
                </Card>
            </Col>
            <Col lg={6} md={6} sm={12}>
                <Card>
                    <CardHeader>
                        <CardTitle>Lampiran 1</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col lg={6} md={6} sm={6}>
                                <Input onChange={fileSelectedHandlerPem} type='file' disabled={!uploadLampiran1}
                                    className={`${validation1.file.length > 0 && 'is-invalid'}`}
                                    id='inputLampiran1' name='fileInput' />
                                <Button className='mt-1' onClick={() => {
                                    if (uploadLampiran1) {
                                        onSubmit("inputLampiran1")
                                    }
                                }} disabled={(loadingUpload1)} color='success' size='sm' style={{ marginRight: "2px" }}>{loadingUpload1 ? <><Spinner size={'sm'} /> Loading</> : <>Upload</>} </Button>
                            </Col>
                            <Col lg={12} md={12} sm={12}>

                                <DataTable
                                    progressPending={loading1}
                                    columns={columns}
                                    data={contentLampiran1}
                                    pagination
                                    noHeader
                                />
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
            <Col lg={6} md={6} sm={12}>
                <Card>
                    <CardHeader>
                        <CardTitle>Lampiran 2</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col lg={6} md={6} sm={6}>
                                <Input onChange={fileSelectedHandlerPem} type='file' disabled={!uploadLampiran2}
                                    className={`${validation2.file.length > 0 && 'is-invalid'}`}
                                    id='inputLampiran2' name='fileInput' />
                                <Button className='mt-1' onClick={() => {
                                    if (uploadLampiran2) {
                                        onSubmit("inputLampiran2")
                                    }
                                }} disabled={(loadingUpload2)} color='success' size='sm' style={{ marginRight: "2px" }}>{loadingUpload2 ? <><Spinner size={'sm'} /> Loading</> : <>Upload</>} </Button>
                            </Col>
                            <Col lg={12} md={12} sm={12}>

                                <DataTable
                                    progressPending={loading2}
                                    columns={columns}
                                    data={contentLampiran2}
                                    pagination
                                    noHeader
                                />
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
            <Col lg={6} md={6} sm={12}>
                <Card>
                    <CardHeader>
                        <CardTitle>Upload Bukti Pembayaran</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col lg={6} md={6} sm={6}>
                                <Input onChange={fileSelectedHandlerPem} type='file' disabled={!uploadBuktiPembayaran}
                                    className={`${validation.file.length > 0 && 'is-invalid'}`}
                                    id='buktibayar' name='fileInput' />
                                <Button className='mt-1' onClick={() => {
                                    if (uploadBuktiPembayaran) {
                                        onSubmit("buktibayar")
                                    }
                                }} disabled={(loadingUpload)} color='success' size='sm' style={{ marginRight: "2px" }}>{loadingUpload ? <><Spinner size={'sm'} /> Loading</> : <>Upload</>} </Button>
                            </Col>
                            <Col lg={12} md={12} sm={12}>

                                <DataTable
                                    progressPending={loading}
                                    columns={columns}
                                    data={content}
                                    pagination
                                    noHeader
                                />
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
            <Modal backdrop="static" isOpen={centeredModal} toggle={() => setCenteredModal(!centeredModal)} className='modal-dialog-centered modal-lg'>
                <ModalHeader toggle={() => setCenteredModal(!centeredModal)}>Lihat Data</ModalHeader>
                <ModalBody>
                    <center>
                        {viewFile.format === ".pdf" ? <>
                            <embed sandbox="allow-download" type="application/pdf" src={`${BASE_API_IMAGE}/${viewFile.file}`} width="100%" height="500px" />
                        </> : viewFile.format === ".jpg" || viewFile.format === ".jpeg" || viewFile.format === ".png" ? <>
                            <img src={`${BASE_API_IMAGE}/${viewFile.file}`} width="50%" />
                        </> : <Label>Format Tidak Di Dukung</Label>}
                    </center>
                </ModalBody>
            </Modal>
        </Row>
    )
}
