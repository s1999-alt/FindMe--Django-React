import React from 'react'
import { Card, CardBody } from 'reactstrap'
import { Link } from 'react-router-dom'
import './tour-card.css'

const TourCard = ({pack}) => {

  const {id, package_name, duration, price, sale_price, overview, category, images} = pack

  return (
    <div className='tour__card'>
      <Card>
        <div className="tour__img">
        <img src={images.length > 0 ? images[0].image : 'default_image_url'} alt="pack-img" />
          <span>Featured</span>
        </div>
      </Card>

      <CardBody>
        <div className="card__top d-flex align-items-center justify-content-between">
          <span className='tour__location d-flex align-items-center gap-1'>
            <i class="ri-map-pin-line"></i>
          </span>
          <span className='tour__rating d-flex align-items-center gap-1'>
            <i class="ri-star-fill"></i>
          </span>
        </div>
        <h5 className='tour__title'><Link to={``}>{package_name}</Link></h5>
        <div className="card__bottom d-flex align-items-center 
        justify-content-between mt-3">
          <h6>${sale_price} <span>/per person</span></h6>
          <button className='btn booking__btn'>
            <Link>Book Now</Link>
          </button>
        </div>
      </CardBody>
    </div>
  )
}

export default TourCard
