import React, { useState } from 'react';
import addItem from '../addItem.json';
import Lottie from 'lottie-react';
import './AddItems.css';

const AddItems = () => {
  const [productName, setProductName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [quantity, setQuantity] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'productName') setProductName(value);
    if (name === 'expiryDate') setExpiryDate(value);
    if (name === 'quantity') setQuantity(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Retrieve the JWT token from localStorage
      if (!token) {
        setErrorMessage('You are not logged in.');
        return;
      }

      const response = await fetch('http://localhost:3000/addProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
        body: JSON.stringify({
          productName,
          expiryDate,
          quantity,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Item added successfully:', data);
        setSuccessMessage('Item added successfully!');
        setErrorMessage('');

        // Clear form fields
        setProductName('');
        setExpiryDate('');
        setQuantity('');

        // Hide success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Failed to add item');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred while adding the item');
    }
  };

  return (
    <div className="add-items">
      <div className="add-items-lottie">
        <Lottie animationData={addItem} />
      </div>
      <form onSubmit={handleSubmit}>
        <h3>Add Item</h3>
        <div className="mb-3">
          <label>Product Name</label>
          <input
            type="text"
            className="form-control"
            name="productName"
            placeholder="Enter Product"
            value={productName}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label>Enter Expiry</label>
          <input
            type="text"
            className="form-control"
            name="expiryDate"
            placeholder="MM-DD-YYYY"
            value={expiryDate}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label>Quantity</label>
          <input
            type="text"
            className="form-control"
            name="quantity"
            placeholder="Enter Quantity"
            value={quantity}
            onChange={handleInputChange}
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            ADD
          </button>
        </div>

        {successMessage && (
          <div className="alert alert-success mt-3" role="alert">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="alert alert-danger mt-3" role="alert">
            {errorMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default AddItems;