// import sliderImage1 from '@src/assets/images/sekolah/hatoyfoto1.jpeg'
// import sliderImage2 from '@src/assets/images/slider/02.jpg'
// import sliderImage3 from '@src/assets/images/slider/05.jpg'
import Carousel from 'react-bootstrap/Carousel'
import { Card, CardBody, Col, Label, Row } from 'reactstrap'
import { BASE_API } from '../../configs/config'
const UncontrolledExample = ({ eskulImage }) => {
    console.log(eskulImage)
    return (
        <Card className='p-2'>
            <CardBody>
                <Row style={{ display: "flex", justifyContent: "center" }}>
                    <Col md={12} sm={12} xs={12} style={{ display: "flex", justifyContent: "center" }}>
                        <Label><h2><b>Ekstrakulikuler</b></h2></Label>
                    </Col>
                    <Col md={6} sm={12} xs={12}>
                        <Carousel interval={5000}>
                            {eskulImage.map((v, i) => {
                                return (
                                    <Carousel.Item key={i}>
                                        <img
                                            className="d-block w-100"
                                            src={`${BASE_API}/${v.image}`}
                                            alt={v.name}
                                            style={{ width: "100%", height: "500px", objectFit: "cover" }}
                                        />
                                        <Carousel.Caption>
                                            <b>{v.name}</b>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                )
                            })}
                        </Carousel>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}

export default UncontrolledExample