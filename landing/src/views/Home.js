import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink, Row, Col, Label } from 'reactstrap'
import CarouselBasic from "./Slider"
import Jadwal from './jadwal'
import AlurPendaftaran from "./alurPendaftaran/index"
import SyaratPendaftaran from "./syarat/index"
import Rincian from './rincian'
import Eskul from './ekstrakulikuler'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_API, homeLanding } from '../configs/config'
const Home = () => {
  const [biaya, setBiaya] = useState("")
  const [slideImage, setSlideImage] = useState([])
  const [eskulImage, setEskulImage] = useState([])
  const [gelombang, setGelombang] = useState([])
  useEffect(() => {
    clearInterval()
    clearTimeout()
    axios.get(BASE_API + homeLanding)
      .then((res) => {
        if (res && res.data && res.data.data) {
          const data = res.data.data
          if (data.biaya) {
            setBiaya(data.biaya)
          }
          if (data.slide) {
            setSlideImage(data.slide)
          }
          if (data.eskul) {
            setEskulImage(data.eskul)
          }
          if (data.gelombang) {
            setGelombang(data.gelombang)
          }
        }
      }).catch((err) => {
        console.log(err)
      })
  }, [])
  return (
    <div>
      <Row>
        <Col md={12} sm={12} xs={12}>
          <Card>
            <Row>
              {slideImage.length > 0 && <>
                <Col md={4} sm={12} xs={12} style={{ alignItems: "center", display: "flex", justifyContent: "center" }}>
                  <div style={{ color: "black", fontSize: "30px", padding: "15px" }}>Selamat Datang Calon Peserta Didik Baru <br /><b>SMP IT Hayatan Thayyibah</b></div>
                </Col>
                <Col md={8} sm={12} xs={12}>
                  <CarouselBasic slideImage={slideImage} />
                </Col>
              </>}
            </Row>
          </Card>
        </Col>
        {gelombang.length > 0 ? <Col md={12} sm={12} xs={12} className={"p-3"}>
            <Jadwal gelombang={gelombang} />
          </Col> : <Col md={12} sm={12} xs={12} className={"p-3"} style={{ display: "flex", justifyContent: "center" }}> 
                <Label><h1><b>Jadwal Pendaftaran</b></h1></Label>
                <Label><h3><b>Belum Tersedia</b></h3></Label>
          </Col>
        }
        <Col md={12} sm={12} xs={12}>
          <AlurPendaftaran />
        </Col>
        <Col md={12} sm={12} xs={12}>
          <SyaratPendaftaran />
        </Col>
        {biaya !== "" &&
          <Col md={12} sm={12} xs={12}>
            <Rincian dataBiaya={biaya} />
          </Col>
        }
        {eskulImage.length > 0 &&
          <Col md={12} sm={12} xs={12}>
            <Eskul eskulImage={eskulImage} />
          </Col>
        }
      </Row>
    </div>
  )
}

export default Home
