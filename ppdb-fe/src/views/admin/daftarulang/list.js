import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Label, Modal, ModalBody, ModalHeader, Row, Spinner, TabContent, TabPane } from 'reactstrap'
import DataTable from 'react-data-table-component'
import { get, post } from '../../../configs/apiService'
import * as Icon from 'react-feather'
import { BASE_API_IMAGE } from '../../../configs/config'
import Tabs from './Tabs'
import NotVerify from './verify'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

export default function list() {
  const [activeTab, setActiveTab] = useState('1')
  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [content, setContent] = useState([])
  const [centeredModal, setCenteredModal] = useState(false)
  const [viewFile, setViewFile] = useState({
    file: "",
    format: ""
  })
  const renderLampiran = (data) => {
    const datas = []
    if (data !== null) {
      const listData = data.split(",")
      if (listData.length > 1) {
        listData.forEach(items => {
          datas.push(items)
        })
      } else {
        datas.push(data)
      }
      return datas
    }
  }
  const [selectedData, setSelectedData] = useState([])
  const getList = () => {
    setLoading(true)
    get("/daftar-verifikasi?verify=false")
      .then((resp) => {
        if (resp.data?.data && resp.data?.data.length > 0) {
          console.log(resp.data.data)
          const data = []
          resp.data.data.forEach(items => {
            const listlampiran1 = renderLampiran(items.lampiran1)
            const listlampiran2 = renderLampiran(items.lampiran2)
            const buktipembayaran = renderLampiran(items.buktipembayaran)
            data.push({
              userUuid: items.userUuid,
              name: items.name,
              id_registrasi: items.id_registrasi,
              listlampiran1,
              listlampiran2,
              buktipembayaran
            })
          })
          setContent(data)
        }
        setLoading(false)
      }).catch((err) => {
        if (err) {

        }
        setLoading(false)
      })
  }
  const columns = [
    {
      name: 'Nama Peserta',
      sortable: true,
      selector: row => row.name
    },
    {
      name: 'No Registrasi',
      sortable: true,
      selector: row => row.id_registrasi
    },
    {
      name: 'Lampiran 1',
      sortable: true,
      selector: row => <div style={{ wordWrap: 'break-word', marginTop: "1px", marginBottom: "1px" }}>
        {row.listlampiran1 && row.listlampiran1.map((items, index) => {
          const type = items.split(".")
          const idx = type.length - 1
          return (
            <Button.Ripple size={'sm'} className='btn-icon' style={{ marginRight: "2px" }} id={index} color='info' onClick={() => {
              setViewFile({
                file: items,
                format: type[idx]
              })
              setCenteredModal(!centeredModal)
            }}>
              {type[idx].includes("pdf") ? <Icon.File size={16} /> : <Icon.Image size={16} />}
            </Button.Ripple>
          )
        })}
      </div>
    },
    {
      name: 'Lampiran 2',
      sortable: true,
      selector: row => <div style={{ wordWrap: 'break-word', marginTop: "1px", marginBottom: "1px" }}>
        {row.listlampiran2 && row.listlampiran2.map((items, index) => {
          const type = items.split(".")
          const idx = type.length - 1
          return (
            <Button.Ripple size={'sm'} className='btn-icon' style={{ marginRight: "2px" }} id={index} color='info' onClick={() => {
              setViewFile({
                file: items,
                format: type[idx]
              })
              setCenteredModal(!centeredModal)
            }}>
              {type[idx].includes("pdf") ? <Icon.File size={16} /> : <Icon.Image size={16} />}
            </Button.Ripple>
          )
        })}
      </div>
    },
    {
      name: 'Bukti Pembayaran',
      sortable: true,
      selector: row => <div style={{ wordWrap: 'break-word', marginTop: "1px", marginBottom: "1px" }}>
        {row.buktipembayaran && row.buktipembayaran.map((items, index) => {
          const type = items.split(".")
          const idx = type.length - 1
          return (
            <Button.Ripple size={'sm'} className='btn-icon' style={{ marginRight: "2px" }} id={index} color='info' onClick={() => {
              setViewFile({
                file: items,
                format: type[idx]
              })
              setCenteredModal(!centeredModal)
            }}>
              {type[idx].includes("pdf") ? <Icon.File size={16} /> : <Icon.Image size={16} />}
            </Button.Ripple>
          )
        })}
      </div>
    }
  ]

  useEffect(() => {
    setLoading(false)
    setContent([])
    getList()
  }, [])

  const setSelectedRow = (value) => {
    setSelectedData(value.selectedRows)
  }

  const toggleTab = tab => {
    setActiveTab(tab)
    if (tab === "1") {
      getList()
    }
  }

  const handleVerif = () => {
    if (selectedData.length > 0) {
      const data = []
      selectedData.forEach(items => {
        data.push(items.userUuid)
      })
      MySwal.fire({
        title: 'Konfirmasi',
        text: `Apakah anda yakin verifikasi data tersebut?`,
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
          setLoading2(true)
          post("/daftar-verif", { dataList: data })
            .then((resp) => {
              if (resp) {

              }
              getList()
              setSelectedData([])
              setLoading2(false)
            })
            .catch((err) => {
              if (err) {

              }
              setLoading2(false)
            })
        }
      })
    }
  }

  return (
    <Row>
      <Col lg={12} md={12} sm={12}>
        <Card>
          <CardHeader>
            <CardTitle>Peserta Daftar Ulang</CardTitle>
          </CardHeader>
          <CardBody>
            <Tabs className='mb-2' activeTab={activeTab} toggleTab={toggleTab} />
            <TabContent activeTab={activeTab}>
              <TabPane tabId='2'>
                {(activeTab === 2 || activeTab === "2") && <NotVerify />}
              </TabPane>
            </TabContent>
            {activeTab === "1" && <><Button disabled={loading2} onClick={() => handleVerif()} color='success' size='sm'>{loading2 ? <><Spinner size={"sm"} /> Loading</> : "Verifikasi"}</Button>
              <DataTable
                progressPending={loading}
                columns={columns}
                data={content}
                pagination
                noHeader
                selectableRows
                onSelectedRowsChange={setSelectedRow}
              />
            </>}
          </CardBody>
        </Card>
      </Col>
      <Modal backdrop="static" isOpen={centeredModal} toggle={() => setCenteredModal(!centeredModal)} className='modal-dialog-centered modal-lg'>
        <ModalHeader toggle={() => setCenteredModal(!centeredModal)}>Lihat Data</ModalHeader>
        <ModalBody>
          <center>
            {viewFile.format === "pdf" ? <>
              <embed sandbox="allow-download" type="application/pdf" src={`${BASE_API_IMAGE}/${viewFile.file}`} width="100%" height="500px" />
            </> : viewFile.format === "jpg" || viewFile.format === "jpeg" || viewFile.format === "png" ? <>
              <img src={`${BASE_API_IMAGE}/${viewFile.file}`} width="50%" />
            </> : <Label>Format Tidak Di Dukung</Label>}
          </center>
        </ModalBody>
      </Modal>
    </Row>
  )
}
