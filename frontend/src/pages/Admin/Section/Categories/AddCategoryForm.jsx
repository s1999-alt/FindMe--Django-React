import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const AddCategoryForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    category_name : '',
    is_available : true,
    soft_deleted: false,
    category_image: null,
  })

  const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e) => {
    setFormData({...formData, category_image: e.target.files[0]})
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()

    const categoryData = new FormData()
    for (const key in formData){
      categoryData.append(key, formData[key])
    }

    try{
      await axios.post('http://127.0.0.1:8000/api/v1/admin/categories/', categoryData)
      navigate('/admin/categories')
      toast.success('Category Added Successfully');
      setFormData({
        category_name: '',
        is_available: true,
        soft_deleted: false,
        category_image: null,
      })
    }catch(error){
      console.error('Error adding category:', error);
      toast.error(`An error occurred during category addition: ${error.message}`);  
    }
  }

  return (
    <div className='addcategory-container'>
      <h2 className="heading">Add Category</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label className='label'>
          Category Name:
          <input
            className='input'
            type="text"
            name="category_name"
            value={formData.category_name}
            onChange={handleInputChange}
          />
        </label>
        <label className='label'>
          Is Available:
          <select
            className='select'
            name="is_available"
            value={formData.is_available}
            onChange={handleInputChange}
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </label>
        <label className='label'>
          Category Image:
          <input
            className='input'
            type="file"
            name="category_image"
            onChange={handleImageChange}
          />
        </label>
        <button className='button' type="submit">Add Category</button>
      </form>
    </div>
  )
}

export default AddCategoryForm