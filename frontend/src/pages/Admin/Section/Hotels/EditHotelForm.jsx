import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const EditHotelForm = () => {
  const {id} = useParams()
  const [formData, setFormData] = useState({
    hotel_name: '',
    place: '',
    hotel_overview: '',
    hotel_image: null,
    is_available: true,
  })

  useEffect( () => {
    const fetchHotelDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/admin/hotels/list/${id}`)
        setFormData(response.data)
      } catch (error) {
        console.log('Error fetching hotel details', error);
      }
    }
    fetchHotelDetails()
  },[id])

  const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleImageChange = (e) => {
    setFormData({ ...formData, hotel_image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    const hotelData = new FormData()
    for (const key in formData){
      hotelData.append(key,formData[key])
    }

    try {
      await axios.put(`http://127.0.0.1:8000/api/v1/admin/hotels/list/${id}/`, hotelData)
      toast.success('Hotel updated successfully');
    } catch (error) {
      console.error('Error updating hotel:', error);
      toast.error(`An error occurred during hotel update: ${error.message}`);
    }
  }


  return (
    <div className='add-hotel-container'>
      <h2>Edit Hotel</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Hotel Name:
          <input
            type='text'
            name='hotel_name'
            value={formData.hotel_name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Place:
          <input
            type='text'
            name='place'
            value={formData.place}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Hotel Overview:
          <textarea
            name='hotel_overview'
            value={formData.hotel_overview}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Hotel Image:
          <input type='file' name='hotel_image' onChange={handleImageChange} />
        </label>
        <label>
          Is Available:
          <input
            type='checkbox'
            name='is_available'
            checked={formData.is_available}
            onChange={() =>
              setFormData({ ...formData, is_available: !formData.is_available })
            }
          />
        </label>
        <button type='submit'>Update Hotel</button>
      </form>
    </div>
  )
}

export default EditHotelForm
