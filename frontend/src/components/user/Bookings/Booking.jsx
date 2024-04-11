import React, { useEffect, useState } from 'react'
import './booking.css'
import { Button, Form, FormGroup, ListGroup, ListGroupItem } from 'reactstrap'
import { FaRupeeSign } from "react-icons/fa";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserAxios } from '../../../axios_instance/Axios_instance';


const Booking = ({packageDetails}) => {
  const {user, userInfo} = useSelector((state) => state.auth);
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    full_name:'',
    phone:'',
    email:'',
    start_date:'',
    no_of_guest:'',
  })

  useEffect(()=>{
  },[formData,packageDetails])


  const handleChange = (e) =>{

    const { name, value } = e.target;

    if (name === 'phone' && (!/^[1-9][0-9]{0,9}$/.test(value))) {
      toast.error('Invalid phone number. Please enter a valid positive number.');
      return;
    }
    console.log(e);
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const serviceCharge = 100
  const packageAmount = packageDetails.sale_price * Number(formData.no_of_guest)
  const rawtaxAmount = 0.1 * packageAmount
  const taxAmount = parseFloat(rawtaxAmount.toFixed(2));
  const grandTotal = packageAmount + taxAmount + serviceCharge


  const handleSubmit = async (e) => {
    e.preventDefault()

    const { full_name, phone, email, start_date, no_of_guest } = formData;

    if (!full_name || !phone || !email || !start_date || !no_of_guest) {
      toast.error('All fields are required');
      return;
    }

    if (!/^\d+$/.test(no_of_guest)) {
      toast.error('Number of guests should contain only numeric values');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Invalid email address');
      return;
    }

    if (!/^[1-9][0-9]{9}$/.test(formData.phone)) {
     toast.error('Invalid phone number. Please enter a valid 10-digit number.');
      return;
    }

    try {
      const response = await UserAxios.post('api/v1/user/bookings/',{
        ...formData,
        package: packageDetails.id,
        user:userInfo.id,
        total:grandTotal,
      })
      console.log('Booking successful:', response.data);
      // Navigate to the checkout page or show a success message
      const bookingId = response.data.id
      navigate(`/bookingConfirm/${bookingId}`)
      
    } catch (error) {
      console.error('Error during booking:', error);
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        console.error('Error during booking:', error);
      }
    }
  }

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className='booking'>
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3><FaRupeeSign />{packageDetails.sale_price} <span>/per person</span></h3>
        <span className="d-flex align-items-center">
          <i class="ri-star-fill" style=
            {{'color':"var(--secondary-color)"}}></i>{packageDetails.rating}{" "}
        </span>
      </div>

      {/* ===================== booking form ========================== */}

      <div className="booking__form">
        <h5>Information</h5>
        <Form className='booking__info-form'>
          <FormGroup>
            <input type="text" placeholder='Full Name' name='full_name' required onChange={handleChange}/>
          </FormGroup>
          <FormGroup>
            <input type="number" placeholder='Phone' name='phone' required onChange={handleChange}/>
          </FormGroup>
          <FormGroup>
            <input type="email" placeholder='Email' name='email' required onChange={handleChange}/>
          </FormGroup>
          <FormGroup className='d-flex align-items-center gap-1'>
            <input type="date" placeholder='' name='start_date' min={today} required onChange={handleChange}/>
            <input type="number" placeholder='No of Guest' name='no_of_guest' required onChange={handleChange}/>
          </FormGroup>
        </Form>
      </div>

      {/* ===================== booking form end ========================== */}


      {/* ===================== booking bottom ========================== */}

      <div className="booking__bottom">
        <ListGroup>

          <ListGroupItem className='border-0 px-0'>
            <h5 className='d-flex align-items-center gap-1'><FaRupeeSign />{packageDetails.sale_price}<i class="ri-close-line"></i>1 person</h5>
            <span><FaRupeeSign />{packageAmount}</span>
          </ListGroupItem>

          <ListGroupItem className='border-0 px-0'>
            <h5>Service Charge</h5>
            <span><FaRupeeSign />{serviceCharge}</span>
          </ListGroupItem>

          <ListGroupItem className='border-0 px-0'>
            <h5>Tax</h5>
            <span><FaRupeeSign />{taxAmount}</span>
          </ListGroupItem>

          <ListGroupItem className='border-0 px-0 total'>
            <h5>Grand Total</h5>
            <span><FaRupeeSign />{grandTotal}</span>
          </ListGroupItem>

        </ListGroup>
        <Button className='btn primary__btn w-100 mt-4' onClick={handleSubmit}>Book Now</Button>
      </div>
    </div>
  )
}

export default Booking
