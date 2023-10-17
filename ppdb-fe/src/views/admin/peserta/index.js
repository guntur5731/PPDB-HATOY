import React, { useEffect, useState } from 'react'
import { Badge, Button, Card, CardBody, CardHeader, CardTitle, Col, DropdownItem, DropdownMenu, DropdownToggle, Input, Label, Media, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner, UncontrolledButtonDropdown } from 'reactstrap'
import DataTable from 'react-data-table-component'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { get, post } from "../../../configs/apiService"
import { downloadPeserta, listpeserta, uploadExcel, uploadpeserta } from '../../../configs/apiurl'
import * as Icon from 'react-feather'
import { BASE_API_DOWNLOAD, BASE_API_IMAGE, CODE_EXPORT_EXCEL } from '../../../configs/config'
// import * as FileSaver from "file-saver"
// import XLSX from "sheetjs-style"
// import jsPDF from "jspdf"
import "jspdf-autotable"
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'
import myTemplate from '../../../utility/TEMPLATE_UPLOAD_SISWA.xlsx'
import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import moment from 'moment'

export default function index() {
  const history = useHistory()
  const [searchValue, setSearchValue] = useState("")
  const [filteredData, setFilteredData] = useState([])
  const [centeredModal, setCenteredModal] = useState(false)
  const [centeredModalDownload, setCenteredModalDownload] = useState(false)
  const [files, setFile] = useState()
  const colums = [
    {
      name: 'Photo',
      sortable: true,
      selector: row => (<div className="text-truncate mb-0 p-1">
        <Media src={`${BASE_API_IMAGE}/${row.photo}`} width={50} height={"60"} style={{objectFit: "cover"}} />
      </div>)
    },
    {
      name: 'No Registrasi',
      sortable: true,
      width: '145px',
      selector: row => row.id_registrasi
    },
    {
      name: 'NISN',
      width: '145px',
      selector: row => row.nisn
    },
    {
      name: 'Nama',
      sortable: true,
      width: '145px',
      selector: row => row.name
    },
    {
      name: 'Jenis Kelamin',
      sortable: true,
      width: '145px',
      selector: row => row.jenis_kelamin
    },
    {
      name: 'Email',
      sortable: true,
      width: '150px',
      selector: row => (<div style={{ wordWrap: 'break-word' }}>{row.email}</div>)
    },
    {
      name: 'Gelombang',
      sortable: true,
      width: '140px',
      selector: row => (<>Gelombang {row.gelombang}</>)
    },
    {
      name: 'No Hp',
      selector: row => row.no_hp
    },
    // {
    //   name: 'Alamat',
    //   width: '180px',
    //   selector: row => (<div style={{ wordWrap: 'break-word' }}>{row.alamat}</div>)
    // },
    {
      name: 'Status Melengkapi',
      sortable: false,
      width: '170px',
      cell: row => (<div style={{ wordWrap: 'break-word', marginTop: "1px", marginBottom: "1px" }}>
        {row.statusBiodata === 1 || row.statusBiodata === "1" ? <>
          <Badge color='success' style={{ margin: "0.5px" }}>
            <Icon.Check size={12} className='align-middle me-25' />
            <span className='align-middle ms-25'>Biodata</span>
          </Badge>
        </> : <>
          <Badge color='danger' style={{ margin: "0.5px" }}>
            <Icon.X size={12} className='align-middle me-25' />
            <span className='align-middle ms-25'>Biodata</span>
          </Badge>
        </>}
        {row.statusDataKeluarga === 1 || row.statusDataKeluarga === "1" ? <>
          <Badge color='success' style={{ margin: "0.5px" }}>
            <Icon.Check size={12} className='align-middle me-25' />
            <span className='align-middle ms-25'>Data Keluarga</span>
          </Badge>
        </> : <>
          <Badge color='danger' style={{ margin: "0.5px" }}>
            <Icon.X size={12} className='align-middle me-25' />
            <span className='align-middle ms-25'>Data Keluarga</span>
          </Badge>
        </>}
        {row.statusAlamat === 1 || row.statusAlamat === "1" ? <>
          <Badge color='success' style={{ margin: "0.5px" }}>
            <Icon.Check size={12} className='align-middle me-25' />
            <span className='align-middle ms-25'>Data Alamat</span>
          </Badge>
        </> : <>
          <Badge color='danger' style={{ margin: "0.5px" }}>
            <Icon.X size={12} className='align-middle me-25' />
            <span className='align-middle ms-25'>Data Alamat</span>
          </Badge>
        </>}
        {row.statusBerkas === 1 || row.statusBerkas === "1" ? <>
          <Badge color='success' style={{ margin: "0.5px" }}>
            <Icon.Check size={12} className='align-middle me-25' />
            <span className='align-middle ms-25'>Berkas</span>
          </Badge>
        </> : <>
          <Badge color='danger' style={{ margin: "0.5px" }}>
            <Icon.X size={12} className='align-middle me-25' />
            <span className='align-middle ms-25'>Berkas</span>
          </Badge>
        </>}
      </div>)
    },
    {
      name: 'Status Verifikasi',
      width: '200px',
      selector: "is_verifikasi",
      cell: row => (<>
        {row.is_verifikasi === 1 || row.is_verifikasi === "1" ? <>
          <Badge color='success'>
            <Icon.Check size={12} className='align-middle me-25' />
            <span className='align-middle ms-25'>Sudah Di Verifikasi</span>
          </Badge>
        </> : <>
          <Badge color='danger'>
            <Icon.X size={12} className='align-middle me-25' />
            <span className='align-middle ms-25'>Belum Di Verifikasi</span>
          </Badge>
        </>} </>)
    },
    {
      name: 'Download',
      width: '200px',

      cell: row => (<div style={{ wordWrap: 'break-word', marginTop: "1px", marginBottom: "1px" }}>
        {row.akte !== null && <a href={`${BASE_API_IMAGE}/${row.akte}`} target="_blank">
          <Badge color='info' style={{ margin: "0.5px" }}>
            <Icon.Download size={12} className='align-middle me-25' />
            <span className='align-middle ms-25'>Akte</span>
          </Badge>
        </a>
        }
        {row.bk_pembayaran !== null && <a href={`${BASE_API_IMAGE}/${row.bk_pembayaran}`} target="_blank">
          <Badge color='info' style={{ margin: "0.5px" }}>
            <Icon.Download size={12} className='align-middle me-25' />
            <span className='align-middle ms-25'>Bukti Pembayaran</span>
          </Badge>
        </a>
        }
        {row.kartu_kk !== null && <a href={`${BASE_API_IMAGE}/${row.kartu_kk}`} target="_blank">
          <Badge color='info' style={{ margin: "0.5px" }}>
            <Icon.Download size={12} className='align-middle me-25' />
            <span className='align-middle ms-25'>Kartu Keluarga</span>
          </Badge>
        </a>
        }
      </div>)
    },
    {
      name: 'Status Lulus',
      width: '200px',
      selector: row => (<>
        {row.status_kelulusan === "Lulus" ? <>
          <Badge color='success'>
            <Icon.Check size={12} className='align-middle me-25' />
            <span className='align-middle ms-25'>{row.status_kelulusan}</span>
          </Badge>
        </> : row.status_kelulusan === "Tidak Lulus" ? <>
          <Badge color='danger'>
            <Icon.X size={12} className='align-middle me-25' />
            <span className='align-middle ms-25'>{row.status_kelulusan}</span>
          </Badge>
        </> : <>
          <Badge color='danger'>
            <Icon.X size={12} className='align-middle me-25' />
            <span className='align-middle ms-25'>Belum mengikuti Tes</span>
          </Badge>
        </>}
      </>)
    }
  ]
  const [columsPreview, setColumsPreview] = useState([])
  const [data, setData] = useState([])
  const [previewData, setPreviewData] = useState([])
  const [loading, setLoading] = useState([])
  const [loadingPreview, serLoadingPreview] = useState(false)
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const [validasiUpload, setValidasiUpload] = useState("")
  const [rangeTanggal, setRangTanggal] = useState({
    startDate: new Date(),
    endDate : new Date()
  })

  const getListPeserta = () => {
    setLoading(true)
    get(listpeserta)
      .then((res) => {
        if (res.data && res.data.data && res.data.data.length > 0) {
          setData(res.data.data)
        }
        setLoading(false)
      }).catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  useEffect(() => {
    getListPeserta()
  }, [])

  const handleFilter = (value) => {
    let updatedData = []
    setSearchValue(value)
    if (value.length) {
      updatedData = data.filter(item => {
        console.log(item)
        const startsWith =
          item.id_registrasi.toLowerCase().startsWith(value.toLowerCase())
          || item.name.toLowerCase().startsWith(value.toLowerCase())
          || item.email.toLowerCase().startsWith(value.toLowerCase())
          || item.nisn.toLowerCase().startsWith(value.toLowerCase())
          || item.jenis_kelamin?.toLowerCase().startsWith(value.toLowerCase())

        const includes =
          item.id_registrasi.toLowerCase().includes(value.toLowerCase())
          || item.name.toLowerCase().startsWith(value.toLowerCase())
          || item.email.toLowerCase().startsWith(value.toLowerCase())
          || item.nisn.toLowerCase().startsWith(value.toLowerCase())
          || item.jenis_kelamin?.toLowerCase().startsWith(value.toLowerCase())

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
  //   let result

  //   const columnDelimiter = ','
  //   const lineDelimiter = '\n'
  //   const keys = Object.keys(data[0])

  //   result = ''
  //   result += keys.join(columnDelimiter)
  //   result += lineDelimiter

  //   array.forEach(item => {
  //     let ctr = 0
  //     keys.forEach(key => {
  //       if (ctr > 0) result += columnDelimiter

  //       result += item[key]

  //       ctr++
  //     })
  //     result += lineDelimiter
  //   })

  //   return result
  // }

  // function downloadCSV(array) {
  //   const link = document.createElement('a')
  //   let csv = convertArrayOfObjectsToCSV(array)
  //   if (csv === null) return

  //   const filename = 'export data peserta.csv'

  //   if (!csv.match(/^data:text\/csv/i)) {
  //     csv = `data:text/csv;charset=utf-8,${csv}`
  //   }

  //   link.setAttribute('href', encodeURI(csv))
  //   link.setAttribute('download', filename)
  //   link.click()
  // }

  // const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
  // const fileExtension = ".xlsx"
  // const excelDownload = () => {

  //   const filename = "export data Peserta"
  //   const ws = XLSX.utils.json_to_sheet(data)
  //   const wb = { Sheets: { data: ws }, SheetNames: ['data'] }

  //   const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array', cellStyles: true })
  //   const datas = new Blob([excelBuffer], { type: fileType })
  //   FileSaver.saveAs(datas, filename + fileExtension)
  // }

  // const exportPDF = () => {
  //   const unit = "pt"
  //   const size = "A4" // Use A1, A2, A3 or A4
  //   const orientation = "landscape" // portrait or landscape

  //   const marginLeft = 40
  //   const doc = new jsPDF(orientation, unit, size)

  //   doc.setFontSize(15)

  //   const title = "EXPORT DATA CALON PESERTA DIDIK"
  //   const headers = [["NO REGISTRASI", "NISN", "NAME", "EMAIL", "GELOMBANG", "NO HP", "ALAMAT"]]

  //   const datas = data.map(elt => [elt.id_registrasi, elt.nisn, elt.name, elt.email, elt.gelombang, elt.no_hp, elt.alamat])

  //   const content = {
  //     startY: 50,
  //     head: headers,
  //     body: datas
  //   }

  //   doc.text(title, marginLeft, 40)
  //   doc.autoTable(content)
  //   doc.save("EXPORT_DATA_CALON_PESERTA_DIDIK.pdf")
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
    post(uploadpeserta, previewData)
      .then((res) => {
        if (res && res.data && res.data.response && res.data.response.status) {
          toast.success(res.data.response.message)
          setCenteredModal(!centeredModal)
          setPreviewData([])
          getListPeserta()
        } else if (res && res.data && res.data.response && res.data.response.message && res.data.data !== "") {
          toast.warning(res.data.data)
        }
        setLoadingSubmit(false)
      }).catch((err) => {
        console.log(err)
        setLoadingSubmit(false)
      })
  }

  const handleRowClick = (row) => {
    history.push("/biodata", { userData: row })
  }
  const handleDownloadData = () => {
    console.log(rangeTanggal)
    window.open(`${BASE_API_IMAGE}/${downloadPeserta}?type=${CODE_EXPORT_EXCEL}&startDate=${moment(rangeTanggal.startDate).format("YYYY-MM-DD")}&endDate=${moment(rangeTanggal.endDate).format("YYYY-MM-DD")}`)
  }

  return (
    <div>
      <Row>
        <Col md={12} sm={12}>
          <Card>
            <CardHeader>
              <CardTitle>
                Data Peserta
              </CardTitle>
            </CardHeader>
            <CardBody>
              <Row>
                <Col className='mt-1' md='6' sm='12'>
                  {/* <Button size='sm' color='success' onClick={() => setCenteredModal(!centeredModal)}>Upload</Button> */}
                  <Button size='sm' color='info' style={{ marginLeft: "2px" }} onClick={() => setCenteredModalDownload(!centeredModalDownload)}>Download</Button>

                  {/* <UncontrolledButtonDropdown size='sm' style={{ marginLeft: "10px" }}>
                    <DropdownToggle color='info' caret>
                      Download
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem tag='a' onClick={() => toast.warning("COMING SOON")}>
                        CSV
                      </DropdownItem>
                      <DropdownItem tag='a' target="_blank" href={`${BASE_API_DOWNLOAD}${downloadPeserta}?type=${CODE_EXPORT_EXCEL}`}>
                        Excel
                      </DropdownItem>
                      <DropdownItem tag='a' onClick={() => toast.warning("COMING SOON")}>
                        Pdf
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledButtonDropdown> */}
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
                <DataTable
                  columns={colums}
                  data={searchValue.length ? filteredData : data}
                  onRowDoubleClicked={(row) => handleRowClick(row)}
                  pagination />
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Modal backdrop="static" isOpen={centeredModal} size={'lg'}
        toggle={() => {
          if (!loadingPreview && !loadingSubmit) {
            setCenteredModal(!centeredModal)
          }
        }}
        className='modal-dialog-centered'>
        <ModalHeader
          toggle={() => {
            if (!loadingPreview && !loadingSubmit) {
              setCenteredModal(!centeredModal)
            }
          }
          }
        >Upload Data Peserta</ModalHeader>
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
                {loadingPreview ? <><Spinner size={"sm"} /> Loading </> : "Preview"}
              </Button>
            </Col>
            <Col md={12} sm={12}>
              <DataTable
                columns={columsPreview}
                data={previewData}
                pagination
                progressPending={loading}
              />
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          {previewData.length > 0 &&
            <Button color='success' disabled={loadingSubmit} onClick={() => handleUploadData()}>
              {loadingSubmit ? <><Spinner size={"sm"} /> Loading</> : "Upload"}
            </Button>
          }
        </ModalFooter>
      </Modal>
      <Modal backdrop="static" isOpen={centeredModalDownload} size={'lg'}
        toggle={() => {
          if (!loadingPreview && !loadingSubmit) {
            setCenteredModalDownload(!centeredModalDownload)
          }
        }}
        className='modal-dialog-centered'>
        <ModalHeader toggle={() => {
          if (!loadingPreview && !loadingSubmit) {
            setCenteredModalDownload(!centeredModalDownload)
          }
        }
        }
        >Download Data Peserta</ModalHeader>
        <ModalBody>
          <Row>
            <Col md="6" sm="12">
              <Label>Tanggal Mulai</Label>
              <Flatpickr
                className={`form-control`}
                id='default-picker'
                options={{
                  dateFormat: 'd-M-Y',
                  maxDate: new Date()
                }}
                onChange={(date) => {
                  setRangTanggal({
                    ...rangeTanggal,
                    startDate: new Date(date)
                  })
                }}
              />
            </Col>
            <Col md="6" sm="12">
              <Label>Tanggal Selesai</Label>
              <Flatpickr
                className={`form-control`}
                id='default-picker'
                options={{
                  dateFormat: 'd-M-Y',
                  minDate: rangeTanggal.startDate,
                  maxDate: new Date()
                }}
                onChange={(date) => {
                  setRangTanggal({
                    ...rangeTanggal,
                    endDate: new Date(date)
                  })
                }}
              />
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
            <Button color='success' disabled={loadingSubmit} onClick={() => handleDownloadData()}>
              {loadingSubmit ? <><Spinner size={"sm"} /> Loading</> : "Download Daftar Peserta"}
            </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}
