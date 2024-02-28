import React, { useEffect, useState } from 'react'
import '../../Styles/tour-details.css'
import { Container, Row, Col, Form, ListGroup } from 'reactstrap'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import threestar from '../../assets/3-star.gif'


const TourDetails = () => {
  const {id} = useParams()
  const [packageDetails, setPackageDetails] = useState(null)
  const [itinararies, setItinararies] = useState([])

  useEffect( () => {
    const fetchData = async () => {
      try {
        const responce = await axios.get(`http://localhost:8000/api/v1/user/packages/${id}`)
        setPackageDetails(responce.data)

        //fetch daywise itinararies
        const itinararyResponse = await axios.get(`http://localhost:8000/api/v1/user/itinararies/?package=${id}`)
        console.log(itinararyResponse.data);
        setItinararies(itinararyResponse.data)

      } catch (error) {
        console.error('Error fetching package details:', error);
      }
    }

    fetchData()
  }, [id])



  if (!packageDetails) {
    return <div>Loading...</div>;
  }

  const {
    package_name,
    duration,
    price,
    sale_price,
    overview,
    category,
    image,
    images,
    city,
    rating,
    inclusions,
    exclusions,
    hotels,
    is_active,
  } = packageDetails;

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <div className="tour__content">
                <img style={{width:"100%",height:"22rem"}} src={image} alt="" />

                <div className="tour__info">
                  <h2 style={{ display: 'inline-block', marginRight: '8px' }}>{package_name}</h2>
                  <p style={{ display: 'inline-block', fontSize: 'medium' }}>{duration}</p>
                  <span className='landonly'style={{ display: 'inline-block', fontSize: 'medium',marginLeft: '8px' }} >Land Only</span>
                  <div className="d-flex align-items-center gap-5">
                    <span className="d-flex align-items-center gap-1">
                      <i class="ri-star-fill" style=
                      {{'color':"var(--secondary-color)"}}></i>{rating}{" "}
                    </span>
                    <span>
                      <i class="ri-map-pin-fill"></i>{city}
                    </span>
                  </div>

                  <div className="tour__extra-details">
                    <span><i class="ri-money-rupee-circle-line"></i>{price} / per person</span>
                    <span><i class="ri-group-line"></i>17(maximum)</span>
                  </div>
                  <h5>Description</h5>
                  <p>{overview}</p>
                </div>

                <div className="container mgt15">
                  <div className="main-lef-bx">
                    <h3>Inclusions</h3>
                    <ul>
                      {
                        inclusions.map((item, index) => (
                          <li key={index} className='ng-binding ng-scope'>{item.inclusion}</li>
                        ))
                      } 
                    </ul>
                  </div>

                  <div className="main-rig-bx">
                    <h3>Excluisons</h3>
                    <ul>
                      {
                        exclusions.map((item, index) => (
                          <li key={index} className='ng-binding ng-scope'>{item.exclusion}</li>
                        ))
                      }
                    </ul>
                  </div>
                </div>

                <div className="test2 tracked">
                  <div className="boxv1 mgt15">
                    <div className="container">
                      <div className="hotel-heading">
                        Hotel Details
                      </div>
                      <div className="container mgt15">
                        {hotels.map((hotel, index) => (
                          <div key={index} className="main-holid-new ng-scope">
                            <div className="in-hot-img">
                              <img src={hotel.hotel_image} alt={hotel.hotel_name} />
                            </div>
                            <div className="in-hot-cane">
                              <div className="hed-holid">
                                <h3 className='ng-binding'>{hotel.hotel_name}</h3>
                              </div>
                              <div className="hol-str-ico">
                                <img src={threestar} alt="" />
                              </div>
                              <div className="clr"></div>
                                <span>
                                  <i class="ri-map-pin-fill"></i>{hotel.place}
                                </span>
                              <div className="holi-can-holiy">
                                <p className='ng-binding'>
                                  {hotel.hotel_overview}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="test3 tracked">
                  <div className="boxv1 mgt15">
                    <div className="container">
                      <div className="hotel-heading">
                        Day Wise Itinerary
                      </div>
                      <div className="container2 mgt15 ng-scope">
                        {
                          itinararies.map((itinarary, index) => (
                            <div key={index}>
                              <h4 className='ng-binding'>{`Day ${itinarary.day_number}`}</h4>
                              <div className="item">
                                <div id='timeline'>
                                  <div>
                                    <section className='year ng-scope' style={{padding:"0px"}}>
                                      <section className='mtags' style={{padding:"0px"}}>
                                        <div className></div>
                                        <ul>
                                          <li className='dspn ng-binding ng-scope'>{itinarary.activities}</li>
                                        </ul>
                                      </section>
                                    </section>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        }
                        
                        

                        
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default TourDetails
