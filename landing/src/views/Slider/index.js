// import sliderImage1 from '@src/assets/images/sekolah/hatoyfoto1.jpeg'
import Carousel from 'react-bootstrap/Carousel'
import { BASE_API } from '../../configs/config'
const UncontrolledExample = ({ slideImage }) => {
  console.log(slideImage, "ANHD")
  return (
    <Carousel interval={5000}>
      {slideImage.map((v, i) => {
        return (
          <Carousel.Item key={i}>
            <img
              className="d-block w-100"
              src={`${BASE_API}/${v.image}`}
              alt="First slide"
              style={{ width: "100%", height: "500px", objectFit: "cover" }}
            />
          </Carousel.Item>
        )
      })}
    </Carousel>
  )
}

export default UncontrolledExample