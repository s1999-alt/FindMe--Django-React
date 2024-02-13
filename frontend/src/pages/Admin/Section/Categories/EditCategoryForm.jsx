import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const EditCategoryForm = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const [formData,setFormData] = useState({
    category_name : '',
    is_available : true,
    soft_deleted: false,
    category_image: null,
  })

  useEffect( () => {
    const fetchCategoryDetails = async () =>{
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/admin/categories/${id}`)
        setFormData(response.data)
      } catch (error) {
        console.log('Error fetching category details', error)
      }
    }
    fetchCategoryDetails()
  },[id])

  const handleInputChange = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const handleImageChange = (e) => {
    setFormData({...formData, category_image: e.target.files[0]})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const categoryData = new FormData()
    for (const key in formData){
      categoryData.append(key, formData[key])
    }

    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/v1/admin/categories/update/${id}`, categoryData)
      console.log('Category updated:', response.data);
      navigate('/admin/categories')
      toast.success('Category updated Successfully');

    } catch (error) {
      console.error('Error updating category:', error);
      toast.error(`An error occurred during category updation: ${error.message}`); 
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
        <button className='button' type="submit">update Category</button>
      </form>
    </div>
  )
}

export default EditCategoryForm
