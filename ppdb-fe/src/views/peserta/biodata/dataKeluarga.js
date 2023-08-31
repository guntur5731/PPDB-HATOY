import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Button, Card, CardBody, Col, Input, Label, Row, Spinner } from 'reactstrap'
import { get, post } from '../../../configs/apiService'
import { detailPeserta } from '../../../configs/apiurl'
const styles = {
  fontSize: "12px",
  color: "red"
}

export default function dataKeluarga({ userData }) {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    nama_ayah: "",
    nama_ibu: "",
    nama_wali: "",
    nama_rekening: "",
    no_hp: "",
    no_hp1: "",
    pekerjaan_ayah: "",
    pekerjaan_ibu: "",
    penghasilan_ortu: "",
    pendidikan_ayah: "",
    pendidikan_ibu: ""
  })
  const [validation, setValidation] = useState({
    nama_ayah: "",
    nama_ibu: "",
    nama_wali: ""
  })
  const [param, setParams] = useState("")

  const onSubmit = () => {
    setLoading(true)
    let paramss = ""
    if (param !== "") {
      paramss = `&id=${param.id}&userUuid=${param.userUuid}`
    }
    post(`${detailPeserta}?update=datakeluarga${paramss}`, data)
      .then((res) => {
        if (res && res.data && res.data.response && res.data.response.status) {
          toast.success(res.data.response.message)
        }
        setLoading(false)
      }).catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  const handleValidasi = () => {
    if (data.nama_ayah === "" ||
      data.nama_ibu === "" ||
      data.nama_wali === "") {
      setValidation({
        ...validation,
        nama_ayah: data.nama_ayah === "" && "Kolom tidak boleh kosong",
        nama_ibu: data.nama_ibu === "" && "Kolom tidak boleh kosong",
        nama_wali: data.nama_wali === "" && "Kolom tidak boleh kosong"
      })
    } else {
      onSubmit()
    }
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
          setData({
            nama_ayah: datas.nama_ayah !== null ? datas.nama_ayah : "",
            nama_ibu: datas.nama_ibu !== null ? datas.nama_ibu : "",
            nama_wali: datas.nama_wali !== null ? datas.nama_wali : "",
            nama_rekening: datas.nama_rekening !== null ? datas.nama_rekening : "",
            no_hp: datas.no_hp !== null ? datas.no_hp : "",
            no_hp1: datas.no_hp1 !== null ? datas.no_hp1 : "",
            pekerjaan_ayah: datas.pekerjaan_ayah !== null ? datas.pekerjaan_ayah : "",
            pekerjaan_ibu: datas.pekerjaan_ibu !== null ? datas.pekerjaan_ibu : "",
            penghasilan_ortu: datas.penghasilan_ortu !== null ? datas.penghasilan_ortu : "",
            pendidikan_ayah: datas.pendidikan_ayah !== null ? datas.pendidikan_ayah : "",
            pendidikan_ibu: datas.pendidikan_ibu !== null ? datas.pendidikan_ibu : ""
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
    <Col md={12} sm={12}>
      <Card>
        <CardBody>
          <Row>
            <Col sm={12} md={12}>
              <Label>Nama Ayah</Label>
              <Input type='text' placeholder='Nama Ayah'
                className={validation.nama_ayah.length > 0 && 'is-invalid'}
                value={data.nama_ayah}
                onChange={(e) => {
                  setData({
                    ...data,
                    nama_ayah: e.target.value
                  })
                  setValidation({
                    ...validation,
                    nama_ayah: ""
                  })
                }}
              />
              <Label style={styles}>{validation.nama_ayah}</Label>
            </Col>
            <Col sm={12} md={12} >
              <Label>Nama Ibu</Label>
              <Input type='text' placeholder='Nama Ibu'
                className={validation.nama_ibu.length > 0 && 'is-invalid'}
                value={data.nama_ibu}
                onChange={(e) => {
                  setData({
                    ...data,
                    nama_ibu: e.target.value
                  })
                  setValidation({
                    ...validation,
                    nama_ibu: ""
                  })
                }}
              />
              <Label style={styles}>{validation.nama_ibu}</Label>
            </Col>
            <Col sm={12} md={12} >
              <Label>Nama Wali</Label>
              <Input type='text' placeholder='Nama Wali'
                className={validation.nama_wali.length > 0 && 'is-invalid'}
                value={data.nama_wali}
                onChange={(e) => {
                  setData({
                    ...data,
                    nama_wali: e.target.value
                  })
                  setValidation({
                    ...validation,
                    nama_wali: ""
                  })
                }}
              />
              <Label style={styles}>{validation.nama_wali}</Label>
            </Col>
            <Col sm={12} md={12} >
              <Label>Nama Pemilik Rekening</Label>
              <Input type='text' placeholder='Nama Pemilik Rekening'
                value={data.nama_rekening}
                onChange={(e) => {
                  setData({
                    ...data,
                    nama_rekening: e.target.value
                  })
                }}
              />
            </Col>
            <Col sm={12} md={12} >
              <Label>No. Hp Ayah</Label>
              <Input type='text' placeholder='No. Hp Ayah'
                value={data.no_hp}
                maxLength={14}
                onChange={(e) => {
                  const reg = /^[0-9]+$/
                  if (reg.test(e.target.value) || e.target.value.length < 1) {
                    setData({
                      ...data,
                      no_hp: e.target.value
                    })
                  }
                }} />
            </Col>
            <Col sm={12} md={12} >
              <Label>No. Hp Ibu</Label>
              <Input type='text' placeholder='No. Hp Ibu'
                value={data.no_hp1}
                maxLength={14}
                onChange={(e) => {
                  const reg = /^[0-9]+$/
                  if (reg.test(e.target.value) || e.target.value.length < 1) {
                    setData({
                      ...data,
                      no_hp1: e.target.value
                    })
                  }
                }} />
            </Col>
            <Col sm={12} md={12} >
              <Label>Pekerjaan Ayah</Label>
              <Input type='text' placeholder='Pekerjaan Ayah'
                value={data.pekerjaan_ayah}
                onChange={(e) => {
                  setData({
                    ...data,
                    pekerjaan_ayah: e.target.value
                  })
                }} />
            </Col>
            <Col sm={12} md={12} >
              <Label>Pekerjaan Ibu</Label>
              <Input type='text' placeholder='Pekerjaan Ibu'
                value={data.pekerjaan_ibu}
                onChange={(e) => {
                  setData({
                    ...data,
                    pekerjaan_ibu: e.target.value
                  })
                }} />
            </Col>
            <Col sm={12} md={12} >
              <Label>pendidikan Ayah</Label>
              <Input type='text' placeholder='pendidikan Ayah'
                value={data.pendidikan_ayah}
                onChange={(e) => {
                  setData({
                    ...data,
                    pendidikan_ayah: e.target.value
                  })
                }} />
            </Col>
            <Col sm={12} md={12} >
              <Label>pendidikan Ibu</Label>
              <Input type='text' placeholder='pendidikan Ibu'
                value={data.pendidikan_ibu}
                onChange={(e) => {
                  setData({
                    ...data,
                    pendidikan_ibu: e.target.value
                  })
                }}
              />
            </Col>
            <Col sm={12} md={12} >
              <Label>Penghasilan Orang Tua</Label>
              <Input type='text' placeholder='Penghasilan Orang Tua'
                value={data.penghasilan_ortu}
                onChange={(e) => {
                  const reg = /^[0-9]+$/
                  if (reg.test(e.target.value) || e.target.value.length < 1) {
                    setData({
                      ...data,
                      penghasilan_ortu: e.target.value
                    })
                  }
                }}
              />
            </Col>
            <Col sm={12} md={12} className="mt-1">
              <Button disabled={loading} onClick={() => {
                handleValidasi()
              }} color='success'>{loading ? <><Spinner size={'sm'} /> Loading</> : <>Simpan</>} </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  )
}
