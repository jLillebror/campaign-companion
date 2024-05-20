import React, { useState } from 'react';
import { addNote } from '@/Utils/api';

const AddNoteForm = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({ content: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await addNote(formData);
      setError(null);
      setSuccess('Note added successfully');
      setFormData({ content: '' });
      onSuccess(data);
      onClose();
    } catch (error) {
      setError(error.message);
      setSuccess(null);
    }
  };

  return (
    <div>
      <h2>Add New Note</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">Content:</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            className="form-control"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-outline-primary me-2">Add Note</button>
        <button type="button" onClick={onClose} className="btn btn-outline-secondary">Cancel</button>
      </form>
      {error && <p className="text-danger mt-2">{error}</p>}
      {success && <p className="text-success mt-2">{success}</p>}
    </div>
  );
};

export default AddNoteForm;
