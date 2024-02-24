import React from 'react'
import './Footer.css'
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap'
import { Link } from 'react-router-dom'

const quick__links = [
  {
    path: "/home",
    display: "Home",  
  },
  {
    path: "/destinations",
    display: "Destinations",  
  },
  {
    path: "/packages",
    display: "Packages",  
  },
  {
    path: "/about",
    display: "About Us",  
  },
]

const quick__links2 = [
  {
    path: "/gallery",
    display: "Gallery",  
  },
  {
    path: "/login",
    display: "Login",  
  },
  {
    path: "/register",
    display: "Register",  
  },
]

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className='footer'>
      <Container>
        <Row>
          <Col lg='3'>
            <div className="logo">
              <img src="" alt="" />
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>

              <div className="social__links d-flex align-items-center gap-4">
                <span>
                  <Link to='#'><i class="ri-youtube-line"></i></Link>
                </span>
                <span>
                  <Link to='#'><i class="ri-github-line"></i></Link>
                </span>
                <span>
                  <Link to='#'><i class="ri-facebook-circle-line"></i></Link>
                </span>
                <span>
                  <Link to='#'><i class="ri-instagram-line"></i></Link>
                </span>
              </div>    
            </div>
          </Col>
          <Col lg="3">
            <h5 className='footer__link-title'>Discover</h5>
            <ListGroup className='footer__quick-links'>
              {
                quick__links.map((item,index)=>(
                  <ListGroupItem key={index} className='ps-0 border-0'>
                    <Link to={item.path}>{item.display}</Link>
                  </ListGroupItem>
                ))
              }
            </ListGroup>
          </Col>
          <Col lg="3">
            <h5 className='footer__link-title'>Quick Links</h5>
            <ListGroup className='footer__quick-links'>
                {
                  quick__links2.map((item,index)=>(
                    <ListGroupItem key={index} className='ps-0 border-0'>
                      <Link to={item.path}>{item.display}</Link>
                    </ListGroupItem>
                  ))
                }
              </ListGroup>
          </Col>
          <Col lg="3">
          <h5 className='footer__link-title'>Contact</h5>
            <ListGroup className='footer__quick-links'>

                    <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3'>
                      <h6 className='mb-0 d-flex align-items-center gap-2'>
                        <span><i class="ri-map-pin-line"></i></span>
                        Address:
                      </h6>
                      <p className='mb-0'>kochi,kerala,india</p>
                    </ListGroupItem>

                    <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3'>
                      <h6 className='mb-0 d-flex align-items-center gap-2'>
                        <span><i class="ri-mail-line"></i></span>
                        Email:
                      </h6>
                      <p className='mb-0'>siyadsavad313@gmail.com</p>
                    </ListGroupItem>

                    <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3'>
                      <h6 className='mb-0 d-flex align-items-center gap-2'>
                        <span><i class="ri-phone-line"></i></span>
                        Phone:
                      </h6>
                      <p className='mb-0'>+91 9633911996</p>
                    </ListGroupItem>
              </ListGroup>
          </Col>

          <Col lg="12" className='text-center pt-5'>
            <p className='copyright'>Copyright{year}, design and developed by 
            Siyad Savad. All rights reserved</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
