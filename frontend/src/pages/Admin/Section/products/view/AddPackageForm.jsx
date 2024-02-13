import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import './add-packageform.css'



const AddPackageForm = () => {
  const [formData, setFormData] = useState({
    package_name: '',
    duration: '',
    price: '',
    sale_price: '',
    overview: '',
    category: '',
    image: [],
    city: '',
    rating:'',
    is_active: false,
  })

  const [categories, setCategories] = useState([])

  useEffect(() =>{
    const fetchCategories = async () => {
      try{
        const response = await axios.get('http://127.0.0.1:8000/api/v1/admin/categories/list/')
        setCategories(response.data);
      }catch(error){
        console.error('Error fetching categories:', error);
      }
    }

    fetchCategories()
  },[])
  

  const handleInputChange = (e) =>{
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0]})
  }

  const handleRadioChange = (e) => {
    setFormData({ ...formData, is_active: e.target.value === 'true' });
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()

    const packageData = new FormData()
    for (const key in formData){
      packageData.append(key, formData[key])
    }

    try{
      const response = await axios.post('http://127.0.0.1:8000/api/v1/admin/packages/create/', packageData)
      console.log('Package added:', response.data);
      toast.success('Package Added Successfully')

    }catch(error){
      console.error('Error adding package:', error)
      toast.error(`An error occurred during adding package: ${error.message}`)
    }
  }

  return (
    <div className='addpackage-container'>
      <h2 className="heading">Add Package</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label className='label'>
          Package Name:
          <input
            className='input'
            type="text"
            name="package_name"
            value={formData.package_name}
            onChange={handleInputChange}
          />
        </label>
        <label className='label'>
          Duration:
          <input
            className='input'
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
          />
        </label>
        <label className='label'>
          Price:
          <input
            className='input'
            type="text"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </label>
        <label className='label'>
          Sale Price:
          <input
            className='input'
            type="text"
            name="sale_price"
            value={formData.sale_price}
            onChange={handleInputChange}
          />
        </label>
        <label className='label'>
          Overview:
          <textarea
            className='textarea'
            name="overview"
            value={formData.overview}
            onChange={handleInputChange}
          />
        </label>
        <label className='label'>
          Category:
          <select
            className='select'
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="" disabled>Select a category</option>
            {categories
            .filter(category => category.is_available)
            .map(category => (
              <option key={category.id} value={category.id}>{category.category_name}</option>
            ))}
          </select>
        </label>
        <label className='label'>
          Image:
          <input className='input' type="file" name="image" onChange={handleImageChange} />
        </label>
        <label className='label'>
          City:
          <input
            className='input'
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
          />
        </label>

        <label className='label'>
          Rating:
          <input
            className='input'
            type="text"
            name="rating"
            value={formData.rating}
            onChange={handleInputChange}
          />
        </label>
        <label className='label'>
          Is Active:
          <div className='radio-group'>
            <label>
              <input
                type="radio"
                name="is_active"
                value="true"
                checked={formData.is_active === true}
                onChange={handleRadioChange}
              />
              True
            </label>
            <label>
              <input
                type="radio"
                name="is_active"
                value="false"
                checked={formData.is_active === false}
                onChange={handleRadioChange}
              />
              False
            </label>
          </div>
        </label>
        <button className='button' type="submit">Add Package</button>
      </form>
    </div>
  )
}

export default AddPackageForm
