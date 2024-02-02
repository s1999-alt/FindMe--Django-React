import React from 'react'
import '../../Styles/Categories.css'
import Satelite from '../../assets/Satellite.png'
import Rec from '../../assets/Rec.png'

const Categories = () => {
  return (
  <>
    <div className='Categories container section'>
      <div className="secHeader">
        <span>
          Category
        </span>
        <h2>
          We Offer Best Services
        </h2>
      </div>

      <div className="secContainer grid">

        <div className="singleCard grid">
          <div className="imgDiv">
            <img src={Satelite} alt="" className="mainImage"/>
            <img src={Rec} alt="" className="design"/>
          </div>
          <span>calculated Weather</span>
          <p>Built Wicket longer admire do barton vanity itself do
          in it.</p>
        </div>

        <div className="singleCard grid">
          <div className="imgDiv">
            <img src={Satelite} alt="" className="mainImage" style={{width:90}}/>
            <img src={Rec} alt="" className="design"/>
          </div>
          <span>calculated Weather</span>
          <p>Built Wicket longer admire do barton vanity itself do
          in it.</p>
        </div>

        <div className="singleCard grid">
          <div className="imgDiv">
            <img src={Satelite} alt="" className="mainImage"/>
            <img src={Rec} alt="" className="design"/>
          </div>
          <span>calculated Weather</span>
          <p>Built Wicket longer admire do barton vanity itself do
          in it.</p>
        </div>

      </div>

    </div>
  </>
  )
}

export default Categories
