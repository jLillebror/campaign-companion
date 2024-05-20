import React, { useState, useEffect } from 'react';
import { deleteCharacter, updateCharacter, fetchNotes, fetchCampaigns } from '@/Utils/api';
import DeleteCharacter from '@/Components/Character/DeleteCharacter';

const CharacterCard = ({ character, onUpdate, onDelete }) => {
  console.log("Character Card Data: ", character);  // Add this line

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    ...character,
    notes: Array.isArray(character.notes) ? character.notes : [],
  });
  const [availableNotes, setAvailableNotes] = useState([]);
  const [availableCampaigns, setAvailableCampaigns] = useState([]);
  const [selectedNote, setSelectedNote] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    setFormData({
      ...character,
      notes: Array.isArray(character.notes) ? character.notes : [],
    });

    const loadNotesAndCampaigns = async () => {
      try {
        const notes = await fetchNotes();
        const campaigns = await fetchCampaigns();
        setAvailableNotes(Array.isArray(notes) ? notes : []);
        setAvailableCampaigns(Array.isArray(campaigns) ? campaigns : []);
      } catch (error) {
        setError(error.message);
      }
    };

    loadNotesAndCampaigns();
  }, [character]);

  const handleDelete = async () => {
    try {
      await deleteCharacter(character.characterId);
      onDelete(character.characterId);
    } catch (error) {
      console.error('Failed to delete character:', error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormData({
      ...character,
      notes: Array.isArray(character.notes) ? character.notes : [],
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'campaignId' ? (value ? parseInt(value, 10) : null) : value,
    }));
  };

  const handleAddItem = (field, item) => {
    if (item) {
      setFormData((prevData) => ({
        ...prevData,
        [field]: [...prevData[field], item],
      }));
      if (field === 'notes') setSelectedNote('');
    }
  };

  const handleRemoveItem = (field, index) => {
    setFormData((prevData) => {
      const updatedList = [...prevData[field]];
      updatedList.splice(index, 1);
      return {
        ...prevData,
        [field]: updatedList,
      };
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCharacter(character.characterId, formData);
      setError(null);
      setIsEditing(false);
      onUpdate({ ...formData, characterId: character.characterId });
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
              {/* form fields */}
            </form>
          ) : (
            <>
              <h5 className="card-title"><strong>{character.name}</strong></h5>
              <p className="card-text"><strong>Class:</strong> {character.class}</p>
              <p className="card-text"><strong>Level:</strong> {character.level}</p>
              <p className="card-text"><strong>Armor Class:</strong> {character.armorClass}</p>
              <p className="card-text"><strong>Hit Points:</strong> {character.hitPoints}</p>
              <p className="card-text"><strong>Strength:</strong> {character.strength}</p>
              <p className="card-text"><strong>Dexterity:</strong> {character.dexterity}</p>
              <p className="card-text"><strong>Constitution:</strong> {character.constitution}</p>
              <p className="card-text"><strong>Intelligence:</strong> {character.intelligence}</p>
              <p className="card-text"><strong>Wisdom:</strong> {character.wisdom}</p>
              <p className="card-text"><strong>Charisma:</strong> {character.charisma}</p>
              <p className="card-text"><strong>Biography:</strong> {character.biography}</p>
              <p className="card-text"><strong>Miscellaneous:</strong> {character.miscellaneous}</p>
              <p className="card-text"><strong>Notes:</strong> {character.notes}</p>
            </>
          )}
        </div>
        <div className="card-footer d-flex justify-content-between">
          {isEditing ? null : (
            <>
              <button onClick={handleEditClick} className="btn btn-outline-primary">Edit</button>
              <DeleteCharacter onDelete={handleDelete} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
