import React, { useEffect, useState } from 'react'
import { Col, Row } from 'reactstrap'
import * as Icon from 'react-feather'
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'
import { get } from '../../configs/apiService'
import { home } from '../../configs/apiurl'

export default function Home() {
  const [data, setData] = useState({
    totalPendaftar: 0,
    belumVerifikasi: 0,
    sudahVerifikasi: 0,
    siswaLulus: 0
  })
  useEffect(() => {
    get(home).then((res) => {
      if (res && res.data && res.data.data) {
        const rest = res.data.data
        setData({
          totalPendaftar: rest.totalPendaftar,
          belumVerifikasi: rest.belumVerifikasi,
          sudahVerifikasi: rest.sudahVerifikasi,
          siswaLulus: rest.siswaLulus
        })
      }
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  }, [])
  return (
    <div>
      <Row>
        <Col md='3' sm='12'>
          <StatsHorizontal icon={<Icon.UserPlus size={21} />} color='success' stats={data.siswaLulus} statTitle='Siswa Lulus' />
        </Col>
        <Col md='3' sm='12'>
          <StatsHorizontal icon={<Icon.UserCheck size={21} />} color='success' stats={data.sudahVerifikasi} statTitle='Sudah Verifikasi' />
        </Col>
        <Col md='3' sm='12'>
          <StatsHorizontal icon={<Icon.UserX size={21} />} color='danger' stats={data.belumVerifikasi} statTitle='Belum Verifikasi' />
        </Col>
        <Col md='3' sm='12'>
          <StatsHorizontal icon={<Icon.Users size={21} />} color='info' stats={data.totalPendaftar} statTitle='Total Pendaftar' />
        </Col>
      </Row>
    </div>
  )
}
