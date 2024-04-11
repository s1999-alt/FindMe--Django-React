import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AdminAxios } from '../../../../axios_instance/Axios_instance';

const ItineraryListPage = () => {
  const [itineraries, setItineraries] = useState([]);

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const response = await AdminAxios.get('api/v1/admin/itineraries/');
        setItineraries(response.data);
      } catch (error) {
        console.error('Error fetching itineraries:', error);
      }
    };

    fetchItineraries();
  }, []);

  return (
    <div>
      <h2>Itinerary List</h2>
      <Link to="/admin/add-itineraries">
          <button className="add-packages-button">Add Itineraries</button> 
      </Link>
      <table>
        <thead>
          <tr>
            <th>Package</th>
            <th>Day Number</th>
            <th>Activities</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {itineraries.map((itinerary) => (
            <tr key={itinerary.id}>
              <td>{itinerary.package_details.package_name}</td>
              <td>{itinerary.day_number}</td>
              <td>{itinerary.activities}</td>
              <td>
                <Link to="">Edit</Link> {/* Replace with edit/delete actions as needed */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItineraryListPage;
