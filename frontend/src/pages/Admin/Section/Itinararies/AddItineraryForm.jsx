import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './add-itinerary.css';
import { AdminAxios } from '../../../../axios_instance/Axios_instance';

const AddItineraryForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    package: '', // Add other fields as needed
    day_number: '',
    activities: '',
  });
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await AdminAxios.get('api/v1/admin/packages/');
        setPackages(response.data);
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };

    fetchPackages();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await AdminAxios.post('api/v1/admin/itineraries/create/', formData);
      toast.success('Itinerary Added Successfully');
      setFormData({
        package: '', // Reset form fields
        day_number: '',
        activities: '',
      });
    } catch (error) {
      console.error('Error adding itinerary:', error);
      toast.error('An error occurred during itinerary addition');
    }
  };

  return (
    <div className='add-itinerary-container'>
      <h2 className='heading'>Add Itinerary</h2>
      <form className='form' onSubmit={handleSubmit}>
        <label className='label'>
          Package:
          <select
            className='select'
            name='package'
            value={formData.package}
            onChange={handleInputChange}
          >
            <option value=''>Select Package</option>
            {packages.map((pkg) => (
              <option key={pkg.id} value={pkg.id}>{pkg.package_name}</option>
            ))}
          </select>
        </label>
        <label className='label'>
          Day Number:
          <input
            className='input'
            type='number'
            name='day_number'
            value={formData.day_number}
            onChange={handleInputChange}
          />
        </label>
        <label className='label'>
          Activities:
          <textarea
            className='textarea'
            name='activities'
            value={formData.activities}
            onChange={handleInputChange}
          ></textarea>
        </label>
        <button className='button' type='submit'>
          Add Itinerary
        </button>
      </form>
    </div>
  );
};

export default AddItineraryForm;
