"use client";

import React, { useEffect, useState } from 'react';
import { fetchNotes, addNote, deleteNote } from '@/Utils/api';
import NotesList from '@/Components/Note/NoteList';
import AddNoteForm from '@/Components/Form/AddNoteForm';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function NotePage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const data = await fetchNotes();
        setNotes(Array.isArray(data) ? data : []); // Ensure notes is an array
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadNotes();
  }, []);

  const handleAddNoteSuccess = (newNote) => {
    setNotes((prevNotes) => [...prevNotes, { ...newNote, noteId: String(newNote.noteId) }]);
  };

  const handleNoteDelete = (noteId) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.noteId !== String(noteId)));
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Notes</h1>
        <button className="btn btn-primary" onClick={handleShowForm}>
          Create Note
        </button>
      </div>
      {showForm && (
        <AddNoteForm
          onClose={handleCloseForm}
          onSuccess={handleAddNoteSuccess}
        />
      )}
      <NotesList
        notes={notes}
        onDelete={handleNoteDelete}
      />
    </div>
  );
}
