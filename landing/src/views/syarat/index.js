import React from 'react'
import { Card, CardBody, CardImg, CardImgOverlay, CardText, CardTitle, Col, Label, Row } from 'reactstrap'
import img3 from '@src/assets/images/sekolah/syarat.png'

const index = () => {

  return (
    <Row>
      <Col md={12} sm={12} xs={12}>
        <Card className='text-white' style={{alignItems: "center"}}>
          <img src={img3} width="80%"/>
        </Card>
      </Col>
    </Row>
  )
}

export default index
