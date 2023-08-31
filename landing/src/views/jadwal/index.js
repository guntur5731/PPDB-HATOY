import React from 'react'
import { Button, Card, CardBody, Col, Label, Row } from 'reactstrap'
import * as Icon from 'react-feather'
import moment from 'moment'
import { BASE_API_PESERTA } from '../../configs/config'
import { useHistory } from 'react-router-dom'
const index = ({ gelombang }) => {
    const history = useHistory()
    return (
        <Row>
            <Col md={12} sm={12} xs={12} style={{ display: "flex", justifyContent: "center" }}>
                <Label><h1><b>Jadwal Pendaftaran</b></h1></Label>
            </Col>
            <Col md={12} sm={12} xs={12} className="mt-3">
                <Row>
                    {gelombang.map((v, i) => {
                        return (
                            <Col md={3} sm={12} xs={12} style={{ display: "flex", justifyContent: "center" }} key={i}>
                                <Card color={v.posting === 1 ? 'success' : 'danger'} style={{ color: "white" }}>
                                    <CardBody>
                                        <Row>
                                            <Col md={12} sm={12} xs={12}>
                                                <Icon.BookOpen size={40} />
                                            </Col>
                                            <Col md={12} sm={12} xs={12} className={"mt-1"}>
                                                <Label><h3 style={{ color: "white" }}>Gelombang {v.gelombang}</h3></Label>
                                            </Col>
                                            <Col md={12} sm={12} xs={12}>
                                                <Label><h4 style={{ color: "white" }}>Tanggal {moment(v.tanggal_mulai).format("D MMMM YYYY")} s.d {moment(v.tanggal_selesai).format("D MMMM YYYY")}</h4></Label>
                                            </Col>
                                            <Col md={12} sm={12} xs={12}>
                                                <Label><h4 style={{ color: "white" }}>{v.posting === 1 ? <Button type='button' color='warning' onClick={() => history.push("/redirect")}>Daftar</Button> : 'Sudah Di Tutup'}</h4></Label>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            </Col>
        </Row>
    )
}

export default index