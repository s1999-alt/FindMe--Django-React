import React from 'react';
import '../../Styles/Home.css';
import { useSelector } from 'react-redux';
import { FaPlay } from 'react-icons/fa';
import {Container, Row, Col} from 'reactstrap'

import heroImg from '../../assets/hero-img01.jpg'
import heroImg02 from '../../assets/hero-img02.jpg'
import heroVideo from '../../assets/hero-video.mp4'
import Subtitle from '../../shared/Subtitle';
import worlImage from '../../assets/world.png'
import experienceImg from '../../assets/experience.png'

import SearchBar from '../../shared/SearchBar';
import ServiceList from '../../services/ServiceList';
import FeaturedTourList from '../../components/user/Featured-Tours/FeaturedTourList';
import MasonryImagesGallery from '../../components/user/image-gallery/MasonryImagesGallery';
import Newsletter from '../../shared/Newsletter';


const Home = () => {
  return (
    <>
    {/*======================hero section==========================*/}
    <section>
      <Container>
        <Row>
          <Col lg='6'>
            <div className='hero__content'>
              <div className="hero__subtitle d-flex align-items-center">
                <Subtitle subtitle={'Know Before You Go'}/>
                <img src={worlImage} alt="" />
              </div>
              <h1>Traveling opens the door to creating <span className="highlight">
                memories</span>
              </h1>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
              </p>
            </div>
          </Col>

          <Col lg='2'>
            <div className="hero__img-box">
              <img src={heroImg} alt="" />
            </div>
          </Col>
          <Col lg='2'>
            <div className="hero__img-box mt-4">
              <video src={heroVideo} alt="" controls/>
            </div>
          </Col>
          <Col lg='2'>
            <div className="hero__img-box mt-5">
              <img src={heroImg02} alt="" />
            </div>
          </Col>
          <SearchBar/>
        </Row>
      </Container>
    </section>

    {/*===========================Hero Section Start===========================*/}
    <section>
      <Container>
        <Row>
          <Col lg="3">
            <h5 className="services__subtitle">What We Serve</h5>
            <h5 className="services__title">We offer our best services</h5>
          </Col>
          <ServiceList/>
        </Row>
      </Container>
    </section>

    {/*======================Featured Tour Section Start==========================*/}
    <section>
      <Container>
        <Row>
          <Col lg="12" className="mb-5">
            <Subtitle subtitle={"Explore"}/>
            <h2 className='featured__tour-title'>Our Featured Tours</h2>
          </Col>
          <FeaturedTourList/>
        </Row>
      </Container>
    </section>
    {/*======================Featured Tour Section End==========================*/}

    {/*======================experience Section Start==========================*/}
    <section>
      <Container>
        <Row>
          <Col lg='6'>
            <div className='experience__content'>
              <Subtitle subtitle={'Experience'}/>
            <h2>
              With our all experience <br/>We will serve you
            </h2>
            <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            <br/>
            when an unknown printer took a galley of type and scrambled it to make a type 
            specimen book.
            </p>  
            </div>

            <div className='counter__wrapper d-flex align-items-center gap-5'>
              <div className='counter__box'>
                <span>12k+</span>
                <h6>Successfull Trip</h6>
              </div>
              <div className='counter__box'>
                <span>2k+</span>
                <h6>Regular Clients</h6>
              </div>
              <div className='counter__box'>
                <span>1</span>
                <h6>Year</h6>
              </div>
            </div>
          </Col>
          <Col lg="6">
            <div className="experience__img">
              <img src={experienceImg} alt="" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
    {/*======================experience Section End==========================*/}
    
    {/*======================gallery Section Start==========================*/}

    <section>
      <Container>
        <Row>
          <Col lg='12'>
            <Subtitle subtitle={"Gallery"}/>
            <h2 className='gallery__title'>
              Visit our Customers tour Gallery
            </h2>
          </Col>
          <Col lg='12'>
            <MasonryImagesGallery/>
          </Col>
        </Row>
      </Container>
    </section>

    {/*======================gallery Section End==========================*/}

    <Newsletter/>


    </>
  );
};

export default Home;

