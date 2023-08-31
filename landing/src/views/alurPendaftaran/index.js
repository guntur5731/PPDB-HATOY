import React from 'react'
import { Card, CardBody, CardImg, CardImgOverlay, CardText, CardTitle, Col, Label, Media, Row } from 'reactstrap'
import img3 from '@src/assets/images/sekolah/alurpendaftarn.jpg'

const index = () => {

  return (
    <Row>
      <Col md={12} sm={12} xs={12}>
        <Card className='text-white'>
          <Label className='mt-2' style={{display: "flex", justifyContent: "center"}}>
            <h1><b>Alur Pendaftaran</b></h1>
          </Label>
          {/* <ReactImageZoom {...props} style={{zIndex: 1000}} /> */}
          <Media src={img3} width="100%"/>
        </Card>
      </Col>
    </Row>
  )
}

export default index
