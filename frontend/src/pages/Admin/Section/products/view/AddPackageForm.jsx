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
  })

  const [categories, setCategories] = useState([])

  useEffect(() =>{
    const fetchCategories = async () => {
      try{
        const response = await axios.get('http://127.0.0.1:8000/api/v1/admin/categories/')
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

  const handleSubmit = async (e) =>{
    e.preventDefault()

    const packageData = new FormData()
    for (const key in formData){
      packageData.append(key, formData[key])
    }

    try{
      const response = await axios.post('http://127.0.0.1:8000/api/v1/user/packages/create/', packageData)
      console.log('Package added:', response.data);
      toast.success('Package Added Successfully')

    }catch(error){
      console.error('Error adding package:', error)
      toast.error(`An error occurred during adding package: ${error.message}`)
    }
  }

  return (
    <div className='container'>
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
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.category_name}</option>
            ))}
          </select>
        </label>
        <label className='label'>
          Image:
          <input className='input' type="file" name="image" onChange={handleImageChange} />
        </label>
        <button className='button' type="submit">Add Package</button>
      </form>
    </div>
  )
}

export default AddPackageForm
