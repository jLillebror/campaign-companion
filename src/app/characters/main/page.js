"use client";

import React, { useEffect, useState } from 'react';
import { fetchCharacters } from '@/Utils/api';
import CharactersList from '@/Components/Character/CharacterList';
import AddCharacterForm from '@/Components/Form/AddCharacterForm';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CharacterPage() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        const data = await fetchCharacters();
        console.log('Fetched characters in CharacterPage:', data); // Add this line
        setCharacters(Array.isArray(data) ? data : []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadCharacters();
  }, []);

  const handleAddCharacterSuccess = (newCharacter) => {
    setCharacters((prevCharacters) => [...(prevCharacters || []), newCharacter]);
  };

  const handleCharacterDelete = (characterId) => {
    setCharacters((prevCharacters) => (prevCharacters || []).filter((character) => character.characterId !== characterId));
  };

  const handleCharacterUpdate = (updatedCharacter) => {
    setCharacters((prevCharacters) =>
      (prevCharacters || []).map((character) =>
        character.characterId === updatedCharacter.characterId ? updatedCharacter : character
      )
    );
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
        <h1>Characters</h1>
        <button className="btn btn-primary" onClick={handleShowForm}>
          Create Character
        </button>
      </div>
      {showForm && (
        <AddCharacterForm
          onClose={handleCloseForm}
          onSuccess={handleAddCharacterSuccess}
        />
      )}
      <CharactersList
        characters={characters}
        onDelete={handleCharacterDelete}
        onUpdate={handleCharacterUpdate}
      />
    </div>
  );
}
