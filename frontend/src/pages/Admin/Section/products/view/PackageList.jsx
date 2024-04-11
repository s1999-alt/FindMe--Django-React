import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './package-list.css'
import { AdminAxios } from '../../../../../axios_instance/Axios_instance'


const PackageList = () => {
  const [packages, setPackages] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await AdminAxios.get('api/v1/admin/packages')
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

  const handleDelete = async (packageId) => {
    try{
      await AdminAxios.delete(`api/v1/user/packages/${packageId}`)
      const response = await AdminAxios.get('api/v1/admin/packages')
      setPackages(response.data)
    } catch(error){
      console.log('Error deleting package', error)
    }
  }

  const handleBlockUnblock = async (packageId, isActive) => {
    try {
      await AdminAxios.patch(`api/v1/admin/packages/block/${packageId}/`)
      setPackages(prevPackages =>
        prevPackages.map(pack =>
          pack.id === packageId ? {...pack, is_active: !isActive} : pack
        )
        )
    } catch (error) {
      console.error('Error updating packages')
    }
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
              <td style={{fontWeight:'bold', color: pack.is_active ? 'green' : 'red'}}>{pack.is_active ? 'Available' : 'Not Available'}</td>
              <td>{pack.category_name}</td>
              <td>
                {pack.is_active && (
                  <button style={{backgroundColor:'red'}} onClick={() => handleBlockUnblock(pack.id, pack.is_active)}>
                    Unlist 
                  </button>
                )}
                {!pack.is_active && (
                  <button onClick={() => handleBlockUnblock(pack.id , pack.is_active) }>
                    List
                  </button>
                )
                }
                <button style={{backgroundColor:'grey'}} onClick={() => handleEdit(pack.id)}>Edit</button>
                <button className='delete-button' onClick={() => handleDelete(pack.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PackageList
