import React from 'react';
import './Cards.css'

const Cards2 = ({ productName, expiryDate,quantity, id, onDelete }) => {
  const handleDeleteClick = (e) => {
    e.preventDefault();
    onDelete(id); // Call the onDelete function passed from the parent component
  };

  return (
    <div className="row">
      <div className="col-sm-12">
        <div className="cards m-1">
          <div className="card-body">
            <h5 className="card-title">{productName}</h5>
            <p className="card-text">
              Quantity: {quantity}
            </p>
            <p className="card-text">
              Date of Expiry: {expiryDate}
            </p>
            <button className='delete-btns' onClick={handleDeleteClick}>
            
              DELETE
            </button>
          </div>
        </div>
      </div>
    </div>
            
         
  );
};

export default Cards2;
