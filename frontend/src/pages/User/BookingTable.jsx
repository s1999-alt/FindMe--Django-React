import React, { useEffect, useState } from 'react';
import '../../Styles/booking-table.css'; 
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const BookingTable = () => {
  const {user, userInfo} = useSelector((state) => state.auth)
  const [bookings, setBookings] = useState([])

  useEffect( () => {
    const fetchBookingDetails = async ()=> {
      try {
        if(userInfo && userInfo.id){
          const response = await axios.get(`http://localhost:8000/api/v1/user/bookings/${userInfo.id}/`)
          setBookings(response.data)
        }else{
          console.log('User info is not available.');
        }  
      } catch (error) {
        console.log('Error fetching booking data:', error);
      }
    }
    fetchBookingDetails()
  },[userInfo])


  return (
    <div className="booking-table-container">
      <table className="booking-table">
        <thead>
          <tr>
            <th>SL No</th>
            <th>Booking No</th>
            <th>Package Name</th>
            <th>Total Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{booking.booking_number}</td>
              <td>{booking.package_details.package_name}</td>
              <td>₹{booking.total}</td>
              <td>
                {/* Use a button with appropriate styling for the "Track" action */}
                <button className="track-button">
                  <Link to={`/userAccount/bookings/${booking.id}`} style={{color:'white'}}>show</Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default BookingTable;
