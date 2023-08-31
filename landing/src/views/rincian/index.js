import React, { useState } from 'react'
import { Card, CardBody, CardImg, CardImgOverlay, CardText, CardTitle, Col, Label, Row } from 'reactstrap'
import img3 from '@src/assets/images/sekolah/rincian.png'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import DataTable from 'react-data-table-component'
const index = ({ dataBiaya }) => {
    const colums = [
        {
            name: 'Keterangan',
            sortable: false,
            width: "50%",
            selector: row => <b>{row.keterangan}</b>
        },
        {
            name: "Nominal",
            sortable: false,
            width: "50%",
            selector: row => <b>{row.nominal}</b>
        }
    ]
    const [data] = useState([
        { keterangan: "Biaya Pendaftaran", nominal: `Rp. ${parseInt(dataBiaya.biaya_pendaftaran).toLocaleString()}` },
        { keterangan: "Uang Pangkal", nominal: `Rp. ${parseInt(dataBiaya.uang_pangkal).toLocaleString()}` },
        { keterangan: "Dana Tahunan", nominal: `Rp. ${parseInt(dataBiaya.dana_tahunan).toLocaleString()}` },
        { keterangan: "Biaya Pendidikan Bulanan / Infaq Pendidikan (Juli)", nominal: `Rp. ${parseInt(dataBiaya.biaya_pendidikan).toLocaleString()}` },
        { keterangan: "Seragam Sekolah dan Buku Paket Pelajaran", nominal: `Rp. ${parseInt(dataBiaya.biaya_seragam).toLocaleString()}` },
        { keterangan: "Total", nominal: `Rp. ${parseInt(dataBiaya.biaya_seragam + dataBiaya.biaya_pendaftaran + dataBiaya.uang_pangkal + dataBiaya.biaya_pendidikan + dataBiaya.biaya_seragam).toLocaleString()}` }
    ])
    return (
        <Row>
            <Col md={12} sm={12} xs={12}>
                <Card>
                    <CardBody>
                        <Row>
                            <Col md={12} sm={12} xs={12} style={{ justifyContent: "center", display: "flex" }}>
                                <img src={img3} width="80%" />
                            </Col>
                            <Col md={12} sm={12} xs={12}>
                                <div className='react-dataTable' style={{ width: "100%" }}>
                                    <DataTable
                                        columns={colums} data={data}
                                        responsive
                                        className='react-dataTable'
                                    />
                                </div>
                            </Col>
                            <Col md={12} sm={12} xs={12}>
                                <div
                                    dangerouslySetInnerHTML={{ __html: dataBiaya.keterangan }}
                                />
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
}

export default index
