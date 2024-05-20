import React from 'react';
import CharacterCard from '@/Components/Character/CharacterCard';

const CharactersList = ({ characters, onDelete, onUpdate }) => {
  // Ensure characters is an array
  let characterList = Array.isArray(characters) ? characters : (characters?.$values || []);

  // If characterList is not an array after all checks, set it to an empty array
  if (!Array.isArray(characterList)) {
    characterList = [];
  }

  console.log("Character List: ", characterList);  // Add this line

  return (
    <div className="row">
      {characterList.length > 0 ? (
        characterList.map((character) => (
          <CharacterCard
            key={character.characterId}
            character={character}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))
      ) : (
        <p>No characters available</p>
      )}
    </div>
  );
};

export default CharactersList;
