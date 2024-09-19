import React, { useEffect, useState } from 'react';
import Cards1 from './Cards1';
import './Expired1.css';

const Expired = () => {
  const [expiredItems, setExpiredItems] = useState([]); // State for expired items
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages

  useEffect(() => {
    const fetchExpiredItems = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the JWT token
        if (!token) {
          setErrorMessage('You are not logged in.');
          return;
        }

        const response = await fetch('http://localhost:3000/expiredItems', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Include the token in the headers
          },
        });

        const data = await response.json();
        console.log("Fetched expired items:", data); // Debugging to check the data structure

        if (response.ok) {
          setExpiredItems(data.expiredItems); // Assign expired items
          setErrorMessage('');
        } else {
          setErrorMessage(data.message || 'Failed to fetch expired items');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setErrorMessage('An error occurred while fetching expired items.');
      }
    };

    fetchExpiredItems();
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
        setExpiredItems(expiredItems.filter(item => item._id !== id)); // Remove the deleted item from the state
      } else {
        console.error('Failed to delete item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div className='container'>
      <h1>Expired Items</h1>
      {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
      <div className='items'>
      {
        expiredItems.length > 0 ? (
          expiredItems.map((item, index) => (
            <Cards1
              key={index}
              productName={item.productName}
              expiryDate={item.expiryDate}
              id={item._id}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p>No expired items found.</p>
        )
      }
    </div>
    </div>
  );
};

export default Expired;
