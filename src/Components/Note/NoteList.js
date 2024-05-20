import React from 'react';
import NoteCard from './NoteCard';

const NotesList = ({ notes, onDelete }) => {
  const handleUpdate = (updatedNote) => {
    setNotes((prevNotes) => prevNotes.map(note => note.noteId === updatedNote.noteId ? updatedNote : note));
  };

  if (!Array.isArray(notes)) {
    return <p>Error: notes is not an array</p>;
  }

  return (
    <div className="row">
      {notes.map(note => (
        <NoteCard 
          key={String(note.noteId)} 
          note={note} 
          onUpdate={handleUpdate} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
};

export default NotesList;
