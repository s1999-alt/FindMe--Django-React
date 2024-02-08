import React, { useEffect, useState } from 'react'
import TourCard from '../../../shared/TourCard'
import { Col } from 'reactstrap'
import axios from 'axios'

const FeaturedTourList = () => {
  const [packages, setPackages] = useState([])

  useEffect(()=>{
    const fetchData = async () =>{
      try{
        const response = await axios.get('http://localhost:8000/api/v1/user/packages/')
        setPackages(response.data)
      }catch(error){
        console.error('Error fetching package details:', error)
      }
    }
    console.log(packages);
    fetchData()
  }, [])
  return (
    <>
    {
      packages?.map(pack =>(
        <Col lg="3" className='mb-4' key={pack.id}>
          <TourCard pack={pack}/>
        </Col>
      ))
    }
    </>
  )
}

export default FeaturedTourList
