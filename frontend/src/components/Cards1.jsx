import React from 'react';

const Cards1 = ({ productName, expiryDate, id, onDelete }) => {
  const handleDeleteClick = (e) => {
    e.preventDefault();
    onDelete(id); // Call the onDelete function passed from the parent component
  };

  return (
    <div className="row">
      <div className="col-sm-12">
        <div className="card m-1">
          <div className="card-body">
            <h5 className="card-title">{productName}</h5>
            <p className="card-text">
              Date of Expiry: {expiryDate}
            </p>
            <a href="#" className="btn btn-danger" onClick={handleDeleteClick}>
              DELETE
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards1;
