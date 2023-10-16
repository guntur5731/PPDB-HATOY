import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Button, Card, CardBody, Col, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner } from 'reactstrap'
import { get, post } from '../../../configs/apiService'
import { detailPeserta } from '../../../configs/apiurl'
import { BASE_API_IMAGE } from '../../../configs/config'
const styles = {
  fontSize: "12px",
  color: "red"
}
export default function dataBerkas({ userData }) {
  const [loading, setLoading] = useState(false)
  const [centeredModal, setCenteredModal] = useState(false)
  const [validation, setValidation] = useState({
    akte: "",
    kartu_kk: "",
    bk_pembayaran: ""
  })
  const [isPicture, setIsPicture] = useState("")
  const [valueView, setValueView] = useState("")
  const [viewData, setViewData] = useState({
    akte: "",
    kartu_kk: "",
    bk_pembayaran: ""
  })
  const [data, setData] = useState({
    akte: "",
    formatakte: "",
    kartu_kk: "",
    formatkk: "",
    bk_pembayaran: "",
    fotmatpembayaran: ""
  })
  const [param, setParams] = useState("")
  const [isEdit, setIsEdit] = useState({
    kartu_kk: false,
    bk_pembayaran: false,
    akte: false
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
          akte: upload.target.result,
          formatakte: format
        })
        setValidation({
          ...validation,
          akte: ""
        })
      }
      reader.readAsDataURL(file)
    } else {
      toast.warning("Berkas peserta format jpg, jpeg, png, pdf")
    }
  }

  const fileSelectedHandlerKK = (evt) => {
    const reader = new FileReader()
    const file = evt.target.files[0]
    const formatter = (evt.target.files[0]) ? evt.target.files[0].name.substr(-4, 4) : ""
    const format = formatter.toLowerCase()
    if (format === ".jpg" || format === "jpeg" || format === ".png" || format === ".pdf") {
      reader.onload = function (upload) {
        setData({
          ...data,
          kartu_kk: upload.target.result,
          formatkk: format
        })
        setValidation({
          ...validation,
          kartu_kk: ""
        })
      }
      reader.readAsDataURL(file)
    } else {
      toast.warning("Berkas peserta format jpg, jpeg, png, pdf")
    }
  }

  const fileSelectedHandlerPem = (evt) => {
    const reader = new FileReader()
    const file = evt.target.files[0]
    const formatter = (evt.target.files[0]) ? evt.target.files[0].name.substr(-4, 4) : ""
    const format = formatter.toLowerCase()
    if (format === ".jpg" || format === "jpeg" || format === ".png" || format === ".pdf") {
      reader.onload = function (upload) {
        setData({
          ...data,
          bk_pembayaran: upload.target.result,
          fotmatpembayaran: format
        })
        setValidation({
          ...validation,
          bk_pembayaran: ""
        })
      }
      reader.readAsDataURL(file)
    } else {
      toast.warning("Berkas peserta format jpg, jpeg, png, pdf")
    }
  }
  const handleEdit = (name) => {
    if (name === "kk") {
      setIsEdit({
        kartu_kk: true,
        bk_pembayaran: false,
        akte: false
      })
    } else if (name === "pem") {
      setIsEdit({
        kartu_kk: false,
        bk_pembayaran: true,
        akte: false
      })
    } else if (name === "akte") {
      setIsEdit({
        kartu_kk: false,
        bk_pembayaran: false,
        akte: true
      })
    } else {
      setIsEdit({
        kartu_kk: false,
        bk_pembayaran: false,
        akte: false
      })
    }
    setValidation({
      akte: "",
      kartu_kk: "",
      bk_pembayaran: ""
    })
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
          setViewData({
            akte: datas.akte !== null ? datas.akte : "",
            kartu_kk: datas.kartu_kk !== null ? datas.kartu_kk : "",
            bk_pembayaran: datas.bk_pembayaran !== null ? datas.bk_pembayaran : ""
          })
        }
        setLoading(false)
      }).catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }
  const onSubmit = () => {
    setLoading(true)
    let paramss = ""
    if (param !== "") {
      paramss = `&id=${param.id}&userUuid=${param.userUuid}`
    }
    post(`${detailPeserta}?update=berkas${paramss}`, data).then((res) => {
      if (res && res.data && res.data.response && res.data.response.status) {
        toast.success(res.data.response.message)
      }
      handleEdit("")
      getDataPeserta(param)
      setLoading(false)
    }).catch((err) => {
      console.log(err)
      setLoading(false)
    })
  }
  const handleValidasi = () => {
    if (data.akte === "" ||
      data.bk_pembayaran === "" ||
      data.kartu_kk === "") {
      setValidation({
        akte: data.akte === "" && "Kolom wajib diisi",
        kartu_kk: data.kartu_kk === "" && "Kolom wajib diisi",
        bk_pembayaran: data.bk_pembayaran === "" && "Kolom wajib diisi"
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
      getDataPeserta(params)
    } else {
      getDataPeserta("")
    }
  }, [])

  const handleView = (data) => {
    const cekTypeFile = data.split(".")
    if (cekTypeFile.length > 0) {
      const types = cekTypeFile[1]
      if (types === "pdf") {
        setIsPicture(types)
      } else if (types === "jpg" || types === "jpeg" || types === "png") {
        setIsPicture(types)
      }
      setValueView(data)
    }
    setCenteredModal(!centeredModal)
  }

  return (
    <Col md={12} sm={12}>
      <Card>
        <CardBody>
          <Row>
            <Col sm={12} md={12}>
              <Label>Akte</Label>
              {viewData.akte !== "" && !isEdit.akte ? <>
                <br />
                <Button color='info' size='sm' style={{ marginRight: "1px" }} onClick={() => handleView(viewData.akte)} >Lihat Data</Button>
                <Button color='success' size='sm' onClick={() => handleEdit("akte")}>Edit Data</Button>
              </> : <>
                <Input onChange={fileSelectedHandler} type='file'
                  className={`${validation.akte.length > 0 && 'is-invalid'}`}
                  id='inputFile' name='fileInput' />
                <Label style={styles}>{validation.akte}</Label>
                <br />
                {
                  isEdit.akte && <>
                    <Button className='mt-1' disabled={loading} onClick={() => {
                      if (data.akte !== "") {
                        onSubmit()
                      } else {
                        setValidation({
                          ...validation,
                          akte: "Kolom wajib diisi"
                        })
                      }
                    }} color='success' size='sm' style={{ marginRight: "2px" }}>{loading ? <><Spinner size={'sm'} /> Loading</> : <>Upload</>} </Button>
                    <Button color='danger' size='sm' className='mt-1' onClick={() => handleEdit("")}>Batal</Button>
                  </>
                }
              </>}
            </Col>
            <Col sm={12} md={12} >
              <Label>Kartu Keluarga</Label>
              {viewData.kartu_kk !== "" && !isEdit.kartu_kk ? <>
                <br />
                <Button color='info' size='sm' style={{ marginRight: "1px" }} onClick={() => handleView(viewData.kartu_kk)}>Lihat Data</Button>
                <Button color='success' size='sm' onClick={() => handleEdit("kk")}>Edit Data</Button>
              </> : <>
                <Input onChange={fileSelectedHandlerKK} type='file'
                  className={`${validation.kartu_kk.length > 0 && 'is-invalid'}`}
                  id='inputFile' name='fileInput' />
                <Label style={styles}>{validation.kartu_kk}</Label>
                <br />
                {
                  isEdit.kartu_kk && <>
                    <Button className='mt-1' disabled={loading} onClick={() => {
                      if (data.kartu_kk !== "") {
                        onSubmit()
                      } else {
                        setValidation({
                          ...validation,
                          kartu_kk: "Kolom wajib diisi"
                        })
                      }
                    }} color='success' size='sm' style={{ marginRight: "2px" }}>{loading ? <><Spinner size={'sm'} /> Loading</> : <>Upload</>} </Button>
                    <Button color='danger' size='sm' className='mt-1' onClick={() => handleEdit("")}>Batal</Button>
                  </>
                }
              </>}
            </Col>
            <Col sm={12} md={12}>
              <Label>Bukti Pembayaran</Label>
              {viewData.bk_pembayaran !== "" && !isEdit.bk_pembayaran ? <>
                <br />
                <Button color='info' size='sm' className='mb-1' style={{ marginRight: "1px" }} onClick={() => handleView(viewData.bk_pembayaran)}>Lihat Data</Button>
                <Button color='success' size='sm' className='mb-1' onClick={() => handleEdit("pem")}>Edit Data</Button>
              </> : <>
                <Input onChange={fileSelectedHandlerPem} type='file'
                  className={`${validation.bk_pembayaran.length > 0 && 'is-invalid'}`}
                  id='inputFile' name='fileInput' />
                <Label style={styles}>{validation.bk_pembayaran}</Label>
                <br />
                {
                  isEdit.bk_pembayaran && <>
                    <Button className='mt-1' disabled={loading} onClick={() => {
                      if (data.bk_pembayaran !== "") {
                        onSubmit()
                      } else {
                        setValidation({
                          ...validation,
                          bk_pembayaran: "Kolom wajib diisi"
                        })
                      }
                    }} color='success' size='sm' style={{ marginRight: "2px" }}>{loading ? <><Spinner size={'sm'} /> Loading</> : <>Upload</>} </Button>
                    <Button color='danger' size='sm' className='mt-1' onClick={() => handleEdit("")}>Batal</Button></>
                }
              </>}
            </Col>
            <Col sm={12} md={12}>
              {viewData.akte === "" && viewData.bk_pembayaran === "" && viewData.kartu_kk === "" &&
                <Button disabled={loading} onClick={() => {
                  handleValidasi()
                }} color='success'>{loading ? <><Spinner size={'sm'} /> Loading</> : <>Simpan</>} </Button>
              }
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Modal backdrop="static" isOpen={centeredModal} toggle={() => setCenteredModal(!centeredModal)} className='modal-dialog-centered modal-lg'>
        <ModalHeader toggle={() => setCenteredModal(!centeredModal)}>Lihat Data</ModalHeader>
        <ModalBody>
          <div style={{margin: "auto"}}>
          {isPicture === "pdf" ? <>
            <embed sandbox="allow-download" type="application/pdf" src={`${BASE_API_IMAGE}/${valueView}`} width="100%" height="500px" />
          </> : isPicture === "jpg" || isPicture === "jpeg" || isPicture === "png" ? <>
            <iframe style={{display: "block"}} type={`application/${isPicture}`} src={`${BASE_API_IMAGE}/${valueView}`} width="100%" height="500px" />
          </> : <Label>Format Tidak Di Dukung</Label>}
          </div>
        </ModalBody>
      </Modal>
    </Col>
  )
}
