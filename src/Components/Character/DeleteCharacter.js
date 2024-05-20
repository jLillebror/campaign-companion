import React from 'react';

const DeleteCharacter = ({ onDelete }) => {
  return (
    <button onClick={onDelete} className="btn btn-danger">
      Delete
    </button>
  );
};

export default DeleteCharacter;
