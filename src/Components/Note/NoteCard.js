import React, { useState } from 'react';
import { deleteNote, updateNote } from '@/Utils/api';
import DeleteNote from '@/Components/Note/DeleteNote';

const NoteCard = ({ note, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...note });
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    try {
      await deleteNote(note.noteId);
      onDelete(note.noteId);
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormData({ ...note });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateNote(note.noteId, formData);
      setError(null);
      setIsEditing(false);
      onUpdate({ ...formData, noteId: note.noteId });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow-sm rounded">
        <div className="card-body bg-light">
          {isEditing ? (
            <form onSubmit={handleFormSubmit}>
              <div className="mb-3">
                <label htmlFor="content">Content:</label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleFormChange}
                  required
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn btn-outline-primary me-2">
                Save
              </button>
              <button type="button" onClick={handleCancelEdit} className="btn btn-outline-secondary">
                Cancel
              </button>
              {error && <p className="text-danger">{error}</p>}
            </form>
          ) : (
            <>
              <h5 className="card-title"><strong>Note</strong></h5>
              <p className="card-text">{note.content}</p>
            </>
          )}
        </div>
        <div className="card-footer d-flex justify-content-between">
          {isEditing ? null : (
            <>
              <button onClick={handleEditClick} className="btn btn-outline-primary">
                Edit
              </button>
              <DeleteNote onDelete={handleDelete} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
