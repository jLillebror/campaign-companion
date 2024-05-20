// src/Components/Campaign/DeleteCampaign.js
import React from 'react';

const DeleteCampaign = ({ onDelete }) => {
  const handleDelete = async () => {
    try {
      await onDelete();
    } catch (error) {
      console.error('Failed to delete campaign:', error);
    }
  };

  return (
    <button onClick={handleDelete} className="btn btn-danger">
      Delete
    </button>
  );
};

export default DeleteCampaign;
