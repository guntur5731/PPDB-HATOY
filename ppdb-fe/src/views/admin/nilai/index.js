import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { toast } from 'react-toastify'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, DropdownItem, DropdownMenu, DropdownToggle, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner, UncontrolledButtonDropdown } from 'reactstrap'
import { get, post } from '../../../configs/apiService'
import { BASE_API_DOWNLOAD, CODE_EXPORT_EXCEL } from "../../../configs/config"
import { downloadNilai, nilai, uploadExcel, uploadNilai } from '../../../configs/apiurl'
const styles = {
    fontSize: "12px",
    color: "red"
}
// import * as FileSaver from "file-saver"
// import XLSX from "sheetjs-style"
// import jsPDF from "jspdf"
import "jspdf-autotable"
import myTemplate from '../../../utility/TEMPLATE_UPLOAD_NILAI.xlsx'

export default function index() {
    const [loading, setLoading] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const [filteredData, setFilteredData] = useState([])
    const [files, setFile] = useState()
    const [columsPreview, setColumsPreview] = useState([])
    const [previewData, setPreviewData] = useState([])
    const [loadingPreview, serLoadingPreview] = useState(false)
    const columns = [
        {
            name: 'ID Registrasi',
            sortable: true,
            selector: row => row.id_registrasi
        },
        {
            name: 'Nama',
            sortable: true,
            selector: row => row.name
        },
        {
            name: 'NISN',
            sortable: true,
            selector: row => row.nisn
        },
        {
            name: 'Nilai Akademik',
            sortable: true,
            selector: row => row.akademik
        },
        {
            name: 'Nilai Wawancara & BTQ',
            sortable: true,
            selector: row => row.lisan
        },
        {
            name: 'Nilai Rapor',
            sortable: true,
            selector: row => row.rapor
        },
        {
            name: 'Hasil Perhitungan',
            sortable: true,
            selector: row => row.hasil_perhitungan
        },
        {
            name: 'Status Kelulusan',
            sortable: true,
            selector: row => row.status_kelulusan
        }
    ]
    const [inputs, setInputs] = useState({
        noRegis: "",
        nilaiAkademik: "",
        nilaiRapot: "",
        nilaiWawancara: "",
        name: ""
    })
    const [validationData, setValidationData] = useState({
        nilaiAkademik: "",
        nilaiRapot: "",
        nilaiWawancara: ""
    })
    const [data, setData] = useState([])
    const [centeredModal, setCenteredModal] = useState(false)
    const [uploadModal, setUploadModal] = useState(false)
    const [validasiUpload, setValidasiUpload] = useState("")
    const [loadingSubmit, setLoadingSubmit] = useState(false)
    const handleGetData = () => {
        setLoading(true)
        get(nilai)
            .then((resp) => {
                if (resp && resp.data && resp.data.data) {
                    setData(resp.data.data)
                }
                setLoading(false)
            }).catch((err) => {
                console.log(err)
                setLoading(false)

            })
    }

    useEffect(() => {
        handleGetData()
        
    }, [])

    const handleRowClick = (row) => {
        setCenteredModal(!centeredModal)
        setInputs({
            noRegis: row.id_registrasi,
            name: row.name,
            nilaiRapot: row.rapor === "-" ? "" : row.rapor,
            nilaiAkademik: row.akademik === "-" ? "" : row.akademik,
            nilaiWawancara: row.lisan === "-" ? "" : row.lisan
        })
        setValidationData({
            nilaiAkademik: "",
            nilaiRapot: "",
            nilaiWawancara: ""
        })
    }

    const onSubmit = () => {
        setLoading(true)
        post(nilai, inputs)
            .then((res) => {
                if (res && res.data && res.data.response && res.data.response.status) {
                    toast.success("Berhasil menyimpan data")
                    handleGetData()
                    setCenteredModal(!centeredModal)
                }
                setLoading(false)

            }).catch((err) => {
                console.log(err)
            })
    }

    const handleValidation = () => {
        if ((inputs.nilaiRapot === "" || inputs.nilaiRapot > 100) ||
            (inputs.nilaiAkademik === "" || inputs.nilaiAkademik > 100) ||
            (inputs.nilaiWawancara === "" || inputs.nilaiWawancara > 100)) {
            setValidationData({
                nilaiAkademik: inputs.nilaiAkademik === "" ? "Kolom harus di isi" : inputs.nilaiAkademik > 100 && "Nilai tidak boleh melebihi 100",
                nilaiRapot: inputs.nilaiRapot === "" ? "Kolom harus di isi" : inputs.nilaiRapot > 100 && "Nilai tidak boleh melebihi 100",
                nilaiWawancara: inputs.nilaiWawancara === "" ? "Kolom harus di isi" : inputs.nilaiWawancara > 100 && "Nilai tidak boleh melebihi 100"
            })
        } else {
            onSubmit()
        }
    }

    const handleFilter = (value) => {
        let updatedData = []
        setSearchValue(value)
        if (value.length) {
            updatedData = data.filter(item => {
                const startsWith =
                    item.id_registrasi.toLowerCase().startsWith(value.toLowerCase()) ||
                    item.name.toLowerCase().startsWith(value.toLowerCase())

                const includes =
                    item.id_registrasi.toLowerCase().includes(value.toLowerCase()) ||
                    item.name.toLowerCase().includes(value.toLowerCase())

                if (startsWith) {
                    return startsWith
                } else if (!startsWith && includes) {
                    return includes
                } else return null
            })
            setFilteredData(updatedData)
        }
    }

    // function convertArrayOfObjectsToCSV(array) {
    //     let result

    //     const columnDelimiter = ','
    //     const lineDelimiter = '\n'
    //     const keys = Object.keys(data[0])

    //     result = ''
    //     result += keys.join(columnDelimiter)
    //     result += lineDelimiter

    //     array.forEach(item => {
    //         let ctr = 0
    //         keys.forEach(key => {
    //             if (ctr > 0) result += columnDelimiter

    //             result += item[key]

    //             ctr++
    //         })
    //         result += lineDelimiter
    //     })

    //     return result
    // }

    // function downloadCSV(array) {
    //     const link = document.createElement('a')
    //     let csv = convertArrayOfObjectsToCSV(array)
    //     if (csv === null) return

    //     const filename = 'export data nilai.csv'

    //     if (!csv.match(/^data:text\/csv/i)) {
    //         csv = `data:text/csv;charset=utf-8,${csv}`
    //     }

    //     link.setAttribute('href', encodeURI(csv))
    //     link.setAttribute('download', filename)
    //     link.click()
    // }

    // const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
    // const fileExtension = ".xlsx"

    // const excelDownload = () => {
    //     return
    //     const a = document.createElement('a')
    //     a.href = downloadNilai
    //     document.body.appendChild(a)
    //     a.click()
    //     a.remove()
    //     return
    //     const filename = "export data nilai"
    //     const ws = XLSX.utils.json_to_sheet(data)
    //     const wb = { Sheets: { data: ws }, SheetNames: ['data'] }

    //     const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    //     const datas = new Blob([excelBuffer], { type: fileType })
    //     FileSaver.saveAs(datas, filename + fileExtension)
    // }

    // const exportPDF = () => {
    //     const unit = "pt"
    //     const size = "A4" // Use A1, A2, A3 or A4
    //     const orientation = "landscape" // portrait or landscape

    //     const marginLeft = 40
    //     const doc = new jsPDF(orientation, unit, size)

    //     doc.setFontSize(15)

    //     const title = "EXPORT DATA NILAI CALON PESERTA DIDIK"
    //     const headers = [["NO REGISTRASI", "NISN", "NAME", "NILAI RAPOR", "NILAI WAWANCARA & BTQ", "NILAI AKADEMIK", "HASIL PERHITUNGAN", "STATUS KELULUSAN"]]

    //     const datas = data.map(elt => [elt.id_registrasi, elt.nisn, elt.name, elt.rapor, elt.lisan, elt.akademik, elt.hasil_perhitungan, elt.status_kelulusan])

    //     const content = {
    //         startY: 50,
    //         head: headers,
    //         body: datas
    //     }

    //     doc.text(title, marginLeft, 40)
    //     doc.autoTable(content)
    //     doc.save("report.pdf")
    //     excelDownload()
    // }

    const uploadData = () => {
        if (files) {
            const form = new FormData()
            form.append('file', files)
            serLoadingPreview(true)
            post(uploadExcel, form)
                .then((res) => {
                    if (res && res.data && res.data.data) {
                        const datas = res.data.data
                        if (datas.length > 0) {
                            const key = Object.keys(datas[0])
                            const _colums = []
                            if (key.length > 0) {
                                key.forEach((item) => {
                                    _colums.push(
                                        {
                                            name: item.toLocaleUpperCase().replaceAll("_", " "),
                                            sortable: true,
                                            maxWidth: "200px",
                                            selector: (row) => row[item],
                                            wrap: true
                                        }
                                    )
                                })
                                setColumsPreview(_colums)
                            }
                        }
                        datas.splice(0, 1)
                        setPreviewData(datas)
                    }
                    serLoadingPreview(false)
                }).catch((err) => {
                    console.log(err)
                    serLoadingPreview(false)
                })
        } else {
            setValidasiUpload("File belum di pilih")
        }
    }

    const handleUploadData = () => {
        setLoadingSubmit(true)
        post(uploadNilai, previewData)
            .then((res) => {
                if (res && res.data && res.data.response && res.data.response.status) {
                    toast.success(res.data.response.message)
                    setUploadModal(!uploadModal)
                    setPreviewData([])
                    handleGetData()
                } else if (res && res.data && res.data.response && res.data.response.message && res.data.data !== "") {
                    toast.warning(res.data.data)
                }
                setLoadingSubmit(false)
            }).catch((err) => {
                console.log(err)
                setLoadingSubmit(false)
            })
    }

    return (
        <div>
            <Row>
                <Col md={12} sm={12}>
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Nilai
                            </CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Row className='x-0'>
                                <Col className='mt-1' md='6' sm='12'>
                                    <Button size='sm' color='success' onClick={() => {
                                        setUploadModal(!uploadModal)
                                    }}>Upload</Button>

                                    <UncontrolledButtonDropdown size='sm' style={{ marginLeft: "10px" }}>
                                        <DropdownToggle color='info' caret>
                                            Download
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem tag='a' onClick={() => toast.warning("COMING SOON")}>
                                                CSV
                                            </DropdownItem>
                                            <DropdownItem tag='a' target="_blank" href={`${BASE_API_DOWNLOAD}${downloadNilai}?type=${CODE_EXPORT_EXCEL}`}>
                                                Excel
                                            </DropdownItem>
                                            <DropdownItem tag='a'  onClick={() => toast.warning("COMING SOON")}>
                                                Pdf
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledButtonDropdown>
                                </Col>
                                <Col className='d-flex align-items-center justify-content-end mt-1' md='6' sm='12'>
                                    <Label className='me-1' for='search-input'>
                                        Search
                                    </Label>
                                    <Input
                                        className='dataTable-filter mb-50'
                                        type='text'
                                        bsSize='sm'
                                        id='search-input'
                                        value={searchValue}
                                        onChange={(e) => handleFilter(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <DataTable
                                progressPending={loading}
                                columns={columns}
                                data={searchValue.length ? filteredData : data}
                                pagination
                                noHeader
                                onRowDoubleClicked={(row) => handleRowClick(row)}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Modal backdrop="static" isOpen={centeredModal} toggle={() => setCenteredModal(!centeredModal)} className='modal-dialog-centered'>
                <ModalHeader toggle={() => setCenteredModal(!centeredModal)}>Input Nilai</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col md={12} sm={12}>
                            <Label>No Registrasi</Label>
                            <Input type='text' readOnly value={inputs.noRegis} disabled={true} />
                        </Col>
                        <Col md={12} sm={12}>
                            <Label>Nama</Label>
                            <Input type='text' readOnly value={inputs.name} disabled={true} />
                        </Col>
                        <Col md={12} sm={12}>
                            <Label>Nilai Akademik</Label>
                            <Input type='text'
                                maxLength={3}
                                value={inputs.nilaiAkademik}
                                className={validationData.nilaiAkademik.length > 0 && 'is-invalid'}
                                placeholder="Masukan Nilai Akademik"
                                onChange={(e) => {
                                    const reg = /^[0-9]+$/
                                    if (reg.test(e.target.value) || e.target.value.length < 1) {
                                        setInputs({
                                            ...inputs,
                                            nilaiAkademik: e.target.value
                                        })
                                    }
                                    setValidationData({
                                        ...validationData,
                                        nilaiAkademik: ""
                                    })
                                }}
                            />
                            <Label style={styles}>{validationData.nilaiAkademik}</Label>
                        </Col>
                        <Col md={12} sm={12}>
                            <Label>Nilai Lisan & BTQ</Label>
                            <Input type='text'
                                maxLength={3}
                                value={inputs.nilaiWawancara}
                                className={validationData.nilaiWawancara.length > 0 && 'is-invalid'}
                                placeholder="Masukan Nilai Lisan & BTQ"
                                onChange={(e) => {
                                    const reg = /^[0-9]+$/
                                    if (reg.test(e.target.value) || e.target.value.length < 1) {
                                        setInputs({
                                            ...inputs,
                                            nilaiWawancara: e.target.value
                                        })
                                    }
                                    setValidationData({
                                        ...validationData,
                                        nilaiWawancara: ""
                                    })
                                }} />
                            <Label style={styles}>{validationData.nilaiWawancara}</Label>
                        </Col>
                        <Col md={12} sm={12}>
                            <Label>Nilai Rapor</Label>
                            <Input type='text'
                                maxLength={3}
                                value={inputs.nilaiRapot}
                                placeholder="Masukan Nilai Rapor"
                                className={validationData.nilaiRapot.length > 0 && 'is-invalid'}
                                onChange={(e) => {
                                    const reg = /^[0-9]+$/
                                    if (reg.test(e.target.value) || e.target.value.length < 1) {
                                        setInputs({
                                            ...inputs,
                                            nilaiRapot: e.target.value
                                        })
                                    }
                                    setValidationData({
                                        ...validationData,
                                        nilaiRapot: ""
                                    })
                                }} />
                            <Label style={styles}>{validationData.nilaiRapot}</Label>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color='success' onClick={() => handleValidation()}>
                        {loading ? <><Spinner size={'sm'} /> loading </> : "Simpan"}
                    </Button>{' '}
                </ModalFooter>
            </Modal>
            <Modal backdrop="static" isOpen={uploadModal} size={'lg'}
                toggle={() => {
                    if (!loadingPreview && !loadingSubmit) {
                        setUploadModal(!uploadModal)
                    }
                }}
                className='modal-dialog-centered'>
                <ModalHeader
                    toggle={() => {
                        if (!loadingPreview && !loadingSubmit) {
                            setUploadModal(!uploadModal)
                        }
                    }}
                >Upload Data Nilai Peserta</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col md={12} sm={12} className={"mb-1"}>
                            <a href={myTemplate} target="_blank">Download Template Upload Excel</a>
                        </Col>
                        <Col md={12} sm={12}>
                            <Label>File</Label>
                            <Input type='file' onChange={(e) => {
                                setFile(e.target.files[0])
                                setValidasiUpload("")
                            }} />
                            {validasiUpload.length > 0 && <Label style={{ color: "red", fontSize: "12px" }}>{validasiUpload}</Label>}
                            <br />
                            <Button size={"sm"} disabled={loadingPreview} style={{ marginTop: "5px" }} color='success' onClick={() => uploadData()}>
                                {loadingPreview ? <><Spinner size={"sm"} /> Loading</> : "preview"}
                            </Button>
                        </Col>
                        <Col md={12} sm={12}>
                            <DataTable
                                columns={columsPreview}
                                data={previewData}
                                pagination
                                progressPending={loadingPreview}
                            />
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    {previewData.length > 0 &&
                        <Button disabled={loadingSubmit} color='success' onClick={() => handleUploadData()}>
                            {loadingSubmit ? <><Spinner size={"sm"} /> Loading</> : "upload"}
                        </Button>
                    }
                </ModalFooter>
            </Modal>
        </div>
    )
}
