import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Card, CardBody, Col, Row } from 'reactstrap'
import * as Icon from 'react-feather'
import StatsVertical from '@components/widgets/stats/StatsVertical'
import { get } from "../../configs/apiService"
import { dashboardPeserta } from '../../configs/apiurl'
export default function Home() {
  const history = useHistory()
  const [isVerifikasi, setIsverifikasi] = useState(0)
  const [isBio, setIsBio] = useState(0)
  const [isTest, setIsTest] = useState("")
  const [files, setFiles] = useState("")
  const getPeserta = () => {
    get(dashboardPeserta)
      .then((res) => {
        if (res && res.data && res.data.data) {
          if (res.data.data.biodata) {
            const bio = res.data.data.biodata
            if ((bio.biodata && bio.biodata === 1) && (bio.alamat && bio.alamat === 1) && (bio.berkas && bio.berkas === 1) && (bio.datakeluarga && bio.datakeluarga === 1)) {
              setIsBio(1)
            }
          }
          setIsverifikasi(res.data.data.verifikasi)
          if (res.data.data.kelulusan && res.data.data.kelulusan.status_kelulusan) {
            setIsTest(res.data.data.kelulusan.status_kelulusan)
          }
          if (res.data.data.kelulusan && res.data.data.kelulusan.files) {
            setFiles(res.data.data.kelulusan.files !== "" || res.data.data.kelulusan.files !== null ? res.data.data.kelulusan.files : "")
          }
        }
      }).catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    getPeserta()
  }, [])
  return (
    <div>
      <Row>
        <Col xl='6' md='6' sm='12' className='cursor-pointer' onClick={() => {
          history.push('/biodata')
        }}>
          {(isBio === 1 || isBio === "1") && <StatsVertical icon={<Icon.Check size={21} />} files={""} color='success' stats='Biodata' statTitle='Biodata Sudah Lengkap' />}
          {(isBio === 0 || isBio === "0") && <StatsVertical icon={<Icon.Info size={21} />} files={""} color='danger' stats='Biodata' statTitle='Harap Melengkapi Biodata Terlebih Dahulu' />}
        </Col>
        <Col xl='6' md='6' sm='12'>
          {(isVerifikasi === 1 || isVerifikasi === "1") && <StatsVertical files={""} icon={<Icon.Check size={21} />} color='success' stats='Verifikasi' statTitle='Sudah Terverifikasi' />}
          {(isVerifikasi === 0 || isVerifikasi === "0") && <StatsVertical files={""} icon={<Icon.X size={21} />} color='warning' stats='Verifikasi' statTitle='Belum Terverifikasi' />}
        </Col>
        <Col xl='12' md='12' sm='12'>
          {isTest === "Lulus" && <StatsVertical icon={<Icon.Book size={21} />} files={files} color='success' stats='Status Kelulusan' statTitle={isTest} />}
          {isTest === "Tidak Lulus" && <StatsVertical icon={<Icon.X size={21} />} color='error' files={files} stats='Status Kelulusan' statTitle={isTest} />}
          {isTest === "" && <StatsVertical icon={<Icon.Info size={21} />} color='warning' files={""} stats='Status Kelulusan' statTitle={"Silahkan Mengikuti Tes Offline Sesuai Gelombang"} />}
        </Col>
      </Row>
    </div>
  )
}
