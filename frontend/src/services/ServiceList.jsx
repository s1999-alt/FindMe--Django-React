import React from 'react'
import ServiceCard from './ServiceCard'
import { Col } from 'reactstrap'

import weatherImg from '../assets/weather.png'
import guideImg from '../assets/guide.png'
import customizationImg from '../assets/customization.png'

const serviceData = [
  {
    imgUrl : weatherImg,
    title : "Calculate Weather",
    desc : "Discover destinations where every moment is shaped by the perfect climate, ensuring your journey is as unforgettable as the weather itself."
  },
  {
    imgUrl : guideImg,
    title : "Best Tour Guide",
    desc : "Embark on your adventure with our seasoned tour guides, blending expertise and enthusiasm to curate an unforgettable exploration."
  },
  {
    imgUrl : customizationImg,
    title : "Customization",
    desc : "Tailor your journey with our customization options, ensuring every detail reflects your unique travel preferences and desires."
  }
]

const ServiceList = () => {
  return (
    <>
    {
      serviceData.map((item, index)=>(
      <Col lg='3' key={index}>
        <ServiceCard item={item} />
      </Col>))
    }
    </>
  )
}

export default ServiceList
