import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './package-list.css'


const PackageList = () => {
  const [packages, setPackages] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/admin/packages')
        setPackages(response.data)
      } catch (error) {
        console.log('Error Fetching packages', error)
      }
    }
    fetchPackages()
  }, [])

  const handleEdit = (packageId) => {
    navigate(`/admin/edit-package/${packageId}`)
  }
 

  return (
    <div className='package-list-container'>
      <h2 className="package-list-heading">Package List</h2>
      <table className="package-list-table">
        <thead>
          <tr>
            <th>Package Name</th>
            <th>Image</th>
            <th>Duration</th>
            <th>Price</th>
            <th>Sale Price</th>
            <th>Status</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((pack) => (
            <tr key={pack.id}>
              <td>{pack.package_name}</td>
              <td><img src={pack.image} alt={pack.package_name} /></td>
              <td>{pack.duration}</td>
              <td>{pack.price}</td>
              <td>{pack.sale_price}</td>
              <td>{pack.is_available ? 'Available' : 'Not Available'}</td>
              <td>{pack.category_name}</td>
              <td>
                <button onClick={() => handleEdit(pack.id)}>Edit</button>
                <button className='delete-button'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PackageList
