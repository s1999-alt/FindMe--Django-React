import React from 'react'
import './newsletter.css'

import { Container, Row, Col } from 'reactstrap'
import maleTourist from '../assets/male-tourist.png'

const Newsletter = () => {
  return( 
  <section className='newsletter'>
    <Container>
      <Row>
        <Col lg='6'>
          <div className='newsletter__content'>
            <h2>Subscribe now to get useful traveling information</h2>
            <div className="newsletter__input">
              <input type="email" placeholder='Enter Your Email' />
              <button className="btn newsletter__btn">Subscribe</button>
            </div>

            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
          </div>
        </Col>
        <Col lg="6">
          <div className="newsletter__img">
            <img src={maleTourist} alt="" />
          </div>
        </Col>
      </Row>
    </Container>
  </section>
  )
}

export default Newsletter
