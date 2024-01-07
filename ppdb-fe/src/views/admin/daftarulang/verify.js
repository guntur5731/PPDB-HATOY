import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import DataTable from 'react-data-table-component'
import { get } from '../../../configs/apiService'
import * as Icon from 'react-feather'
import { BASE_API_IMAGE } from '../../../configs/config'
import Tabs from './Tabs'

export default function list() {
  const [loading, setLoading] = useState(false)
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
  const getList = () => {
    setLoading(true)
    get("/daftar-verifikasi?verify=true")
      .then((resp) => {
        if (resp.data?.data && resp.data?.data.length > 0) {
          console.log(resp.data.data)
          const data = []
          resp.data.data.forEach(items => {
            const listlampiran1 = renderLampiran(items.lampiran1)
            const listlampiran2 = renderLampiran(items.lampiran2)
            const buktipembayaran = renderLampiran(items.buktipembayaran)
            data.push({
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

  return (
    <Row>
      <Col lg={12} md={12} sm={12}>
        <Card>
          <CardBody>
            <DataTable
              progressPending={loading}
              columns={columns}
              data={content}
              pagination
              noHeader
            />
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
