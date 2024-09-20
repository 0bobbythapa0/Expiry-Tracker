import React, { useEffect, useState } from 'react';
import Cards2 from './Cards2';
import './Expired.css'

const Unexpired = () => {
  const [unexp, setUnExp] = useState([]); // Initialize with an empty array
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchUnExpiredItems = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the JWT token
        if (!token) {
          setErrorMessage('You are not logged in.');
          return;
        }

        const response = await fetch('http://localhost:3000/unExpiredItems', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Include the token in the headers
          },
        });

        const data = await response.json();
        console.log("Fetched data:", data); // Debugging to check the data structure

        if (response.ok) {
          setUnExp(data.unexp); // Set the 'unexp' array from the response object
          setErrorMessage('');
        } else {
          setErrorMessage(data.message || 'Failed to fetch unexpired items');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setErrorMessage('An error occurred while fetching unexpired items.');
      }
    };

    fetchUnExpiredItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setErrorMessage('You are not logged in.');
        return;
      }

      const response = await fetch(`http://localhost:3000/deleteProduct/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in the headers
        },
      });

      if (response.ok) {
        setUnExp(unexp.filter(item => item._id !== id)); // Remove the deleted item from the state
      } else {
        console.error('Failed to delete item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div className='container'>
      <h1>Unexpired Items</h1>
      {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
    <div className='items'>
      {
        unexp.length > 0 ? (
          unexp.map((item, index) => (
            <Cards2
              key={index}
              quantity={item.quantity}
              productName={item.productName}
              expiryDate={item.expiryDate}
              id={item._id}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p>No unexpired items found.</p>
        )
      }
      </div>
    </div>
  );
};

export default Unexpired;
