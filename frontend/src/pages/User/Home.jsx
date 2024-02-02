import React from 'react';
import '../../Styles/Home.css';
import { useSelector } from 'react-redux';
import { FaPlay } from 'react-icons/fa';

import mainImage from '../../assets/girls2Travel.jpg'
import mainsubImage from '../../assets/mainSubImage.jpg'
import Categories from './Categories';


const Home = () => {
  return (
    <>
    <div className='Home container section'>
      <div className="textDiv grid">
        <span className='redText'>Best Destinations Around the Kerala</span>
        <h2>Travel, enjoy and live a new and full life</h2>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          It has survived not only five centuries but also the leap into electronic typesetting, remaining essentially unchanged.
          It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
          and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
        </p>
        <div className="buttons flex">
          <button className="btn">Find More</button>
          <div className="playBtn flex">
            <FaPlay className='icon'/>
            <span>play demo</span>
          </div>
        </div>
      </div>

      <div className="imgDiv flex">
        <img src={mainImage} alt="MainImage" />
      </div>
      <img src={mainsubImage} alt="mainSubImage" className="subMainImage"/>
    </div>
    <Categories/>
    </>
  );
};

export default Home;

