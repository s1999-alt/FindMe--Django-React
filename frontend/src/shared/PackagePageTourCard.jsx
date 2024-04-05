import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import './package-page-tour-card.css';

const PackagePageTourCard = ({ pack }) => {
  const { id, package_name, duration, category, price, sale_price, overview, image, images, city, rating, is_active } = pack;

  return (
    <div className='package-page-tour__card'>
      <Card>
        <div className="tour__img">
          <img src={image} alt="pack-img" />
          <span>Featured</span>
        </div>

        <CardBody>
          <div className="card__top d-flex align-items-center justify-content-between">
            <div className="package-info">
              <h5 className="package-name">{package_name}</h5>
              {/* <p className="package-details">{duration} days package</p> */}
            </div>
            <span className='tour__location d-flex align-items-center gap-1' style={{ marginRight: '10px' }}>
              <i class="ri-map-pin-line"></i>{pack.city}
            </span>
             &nbsp;
            <span className='tour__rating d-flex align-items-center gap-1'>
              <i class="ri-star-fill"></i>{pack.rating}{" "}
            </span>
          </div>
          <div className="inclsn">
            <div className="hicn">
              <i class="i-htl"></i>
              <span class="incTxt">Hotel</span>
            </div>
            <div className="hicn">
              <i class="i-sig"></i>
              <span class="incTxt">Sightseeing</span>
            </div>
            <div className="hicn">
              <i class="i-car"></i>
              <span class="incTxt">Transfer</span>
            </div>
            <div className="hicn">
              <i class="i-mea"></i>
              <span class="incTxt">Meal</span>
            </div>
          </div>
          <h5 className='tour__title'><Link to={``}>{package_name}</Link></h5>
          <div className="card__bottom d-flex align-items-center 
          justify-content-between mt-3">
            <h6>₹ {sale_price} <span>/per person</span></h6>
            <button className='btn booking__btn'>
              <Link to={`/packages/${id}`}>Book Now</Link>
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default PackagePageTourCard;
