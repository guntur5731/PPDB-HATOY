import { useEffect, useState } from 'react'
import { Badge, Button, Card, CardBody, CardHeader, CardTitle, Col, Input, Label, Row, Spinner } from 'reactstrap'
import { sertifikat } from '../../../configs/apiurl'
import { toast } from 'react-toastify'
import { get, patch, post } from '../../../configs/apiService'
import DataTable from 'react-data-table-component'
import { BASE_API_IMAGE } from '../../../configs/config'
import * as Icon from 'react-feather'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
export default function Sertifikat({ userData }) {
  const [param, setParams] = useState("")
  const [datalist, setDataList] = useState([])
  const [data, setData] = useState({
    keterangan: "",
    files: "",
    formatfile: ""
  })
  const [loading, setLoading] = useState(false)
  const getDataSertifikat = (params) => {
    setLoading(true)
    const _paramss = `userUuid=${params.userUuid}`

    get(`${sertifikat}?${_paramss}`).then((res) => {
      if (res?.data?.data) {
        setDataList(res?.data?.data)
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
      text: `Apakah anda yakin menghapus sertifikat ${row.keterangan}?`,
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
        patch(sertifikat, { id: row.id })
          .then((res) => {
            if (res && res.data && res.data.response && res.data.response.status) {
              toast.success(res.data.response.message)
              setDataList([])
              getDataSertifikat(param)
            }
            setLoading(false)
          }).catch((err) => {
            console.log(err)
            setLoading(false)
          })
      }
    })
  }
  const columsData = [
    {
      name: 'Keterangan',
      sortable: true,
      selector: row => row.keterangan
    },
    {
      name: 'Sertifikat',
      cell: row => (<div style={{ wordWrap: 'break-word', marginTop: "1px", marginBottom: "1px" }}>
        {row.files !== null && <a href={`${BASE_API_IMAGE}/${row.files}`} target="_blank">
          <Badge color='info' style={{ margin: "0.5px" }}>
            <Icon.Download size={12} className='align-middle me-25' />
            <span className='align-middle ms-25'>{row.keterangan}</span>
          </Badge>
        </a>
        }
      </div>)
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
    }
  ]

  const [validation, setValidation] = useState({
    keterangan: ""
  })


  const fileSelectedHandler = (evt) => {
    const reader = new FileReader()
    const file = evt.target.files[0]
    const fileSize = Math.round(file.size / 1024)
    const formatter = (evt.target.files[0]) ? evt.target.files[0].name.substr(-4, 4) : ""
    const format = formatter.toLowerCase()
    if (fileSize > 1512) {
      toast.error("Berkas ukuran maximal 1 MB")
      return
    }
    if (format === ".jpg" || format === "jpeg" || format === ".png" || format === ".pdf") {
      console.log("renderd")
      reader.onload = function (upload) {
        setData({
          ...data,
          files: upload.target.result,
          formatfile: format
        })
      }
      reader.readAsDataURL(file)
    } else {
      toast.warning("Berkas peserta format jpg, jpeg, png, pdf")
    }
  }
  const onSubmit = () => {
    setLoading(true)
    let paramss = ""
    if (param !== "") {
      paramss = `userUuid=${param.userUuid}`
    }
    post(`${sertifikat}?${paramss}`, data).then((res) => {
      if (res && res.data && res.data.response && res.data.response.status) {
        toast.success(res.data.response.message)
        setData({
          keterangan: "",
          files: "",
          formatfile: ""
        })
        getDataSertifikat(param)
      }
      // getDataPeserta(param)
      setLoading(false)
    }).catch((err) => {
      console.log(err)
      setLoading(false)
    })
  }
  const handleValidasi = () => {
    if (data.keterangan === "") {
      setValidation({
        keterangan: data.keterangan === "" && "Kolom wajib diisi"
      })
    } else {
      onSubmit()
    }
  }

  useEffect(() => {
    if (userData) {
      const params = {
        id: userData.userId,
        userUuid: userData.usersUuid
      }
      setParams(params)
      getDataSertifikat(params)

    }
  }, [])

  return (
    <Row>
      <Col md="12" sm="12">
        <Card>
          <CardHeader>
            <CardTitle>Tambah Data Sertifikat / Prestasi</CardTitle>
          </CardHeader>
          <CardBody>
            <Row>
              <Col sm={12} md={6} className='mt-1'>
                <Label>Keterangan</Label>
                <Input type='text' placeholder='Keterangan Sertifikat / Prestasi' value={data.keterangan}
                  className={`${validation.keterangan.length > 0 && 'is-invalid'}`}
                  onChange={(event) => {
                    setData({
                      ...data,
                      keterangan: event.target.value
                    })
                    setValidation({
                      ...validation,
                      keterangan: ""
                    })
                  }}
                />
              </Col>
              <Col sm={12} md={6} className='mt-1'>
                <Label>Berkas Sertifikat</Label>
                <Input onChange={fileSelectedHandler} type='file'

                  id='inputFile' name='fileInput' />
              </Col>
              <Col sm={12} md={12} className='mt-1'>
                <Button disabled={loading} onClick={() => {
                  handleValidasi()
                }} color='success'>{loading ? <><Spinner size={'sm'} /> Loading</> : <>Simpan</>} </Button>
              </Col>
              {datalist.length > 0 && <>
                <Col sm={12} md={6} className='mt-1'>
                  <CardTitle>List Sertifikat / Prestasi</CardTitle>
                </Col>
                <Col sm={12} md={12}>
                  <DataTable
                    columns={columsData}
                    data={datalist}
                    progressPending={loading}
                  />
                </Col>
              </>}
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}
