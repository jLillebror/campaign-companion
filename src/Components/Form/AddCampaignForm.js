import React, { useState, useEffect } from 'react';
import { createCampaign, fetchCharacters } from '@/Utils/api';

const AddCampaignForm = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    gameSystem: '',
    campaignSetting: '',
    additionalNotes: '',
    characters: [],
  });
  const [availableCharacters, setAvailableCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        const response = await fetchCharacters();
        console.log('Fetched characters:', response); // Debugging line

        // Ensure the characters are extracted from the $values property if it exists
        const characters = response.$values || response;
        console.log('Transformed characters:', characters); // Debugging line

        setAvailableCharacters(characters);
      } catch (error) {
        setError(error.message);
      }
    };

    loadCharacters();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddCharacter = () => {
    console.log('Selected character ID:', selectedCharacter); // Debugging line
    if (!selectedCharacter) {
      setError('Please select a character.');
      return;
    }

    const characterId = parseInt(selectedCharacter, 10); // Convert to integer
    const character = availableCharacters.find(c => c.characterId === characterId);
    console.log('Matched character:', character); // Debugging line
    if (character) {
      const { name, class: characterClass, biography, miscellaneous } = character;
      setFormData((prevData) => ({
        ...prevData,
        characters: [
          ...prevData.characters,
          {
            name,
            class: characterClass,
            biography,
            miscellaneous,
          },
        ],
      }));
      setSelectedCharacter('');
    } else {
      setError('Selected character not found.');
    }
  };

  const handleRemoveItem = (index, field) => {
    const list = [...formData[field]];
    list.splice(index, 1);
    setFormData({
      ...formData,
      [field]: list,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Remove characterId from characters before submission
      const submissionData = {
        ...formData,
        characters: formData.characters.map(({ characterId, ...rest }) => rest),
      };

      const data = await createCampaign(submissionData);
      setError(null);
      setFormData({
        name: '',
        description: '',
        gameSystem: '',
        campaignSetting: '',
        additionalNotes: '',
        characters: [],
      });
      onSuccess(data);
      onClose();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Create New Campaign</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="form-control"
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="gameSystem" className="form-label">Game System:</label>
          <select
            id="gameSystem"
            name="gameSystem"
            value={formData.gameSystem}
            onChange={handleChange}
            required
            className="form-select"
          >
            <option value="">Select Game System</option>
            <option value="Dungeons & Dragons 5th Edition">Dungeons & Dragons 5th Edition</option>
            <option value="Pathfinder">Pathfinder</option>
            <option value="World of Darkness">World of Darkness</option>
            <option value="Custom">Custom</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="campaignSetting" className="form-label">Campaign Setting:</label>
          <select
            id="campaignSetting"
            name="campaignSetting"
            value={formData.campaignSetting}
            onChange={handleChange}
            required
            className="form-select"
          >
            <option value="">Select Campaign Setting</option>
            <option value="Forgotten Realms">Forgotten Realms</option>
            <option value="Eberron">Eberron</option>
            <option value="Greyhawk">Greyhawk</option>
            <option value="Custom">Custom</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="additionalNotes" className="form-label">Additional Notes:</label>
          <textarea
            id="additionalNotes"
            name="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleChange}
            className="form-control"
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Characters:</label>
          <select
            value={selectedCharacter}
            onChange={(e) => {
              setSelectedCharacter(e.target.value);
              setError(null);  // Clear error when selecting a character
            }}
            className="form-select"
          >
            <option value="">Select Character</option>
            {availableCharacters.map((character) => (
              <option key={character.characterId} value={character.characterId.toString()}>
                {character.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleAddCharacter}
            className="btn btn-outline-secondary mt-2"
          >
            Add Character
          </button>
          {Array.isArray(formData.characters) && formData.characters.map((character, index) => (
            <div key={index} className="d-flex justify-content-between mt-2">
              <span>{character.name}</span>
              <button
                type="button"
                onClick={() => handleRemoveItem(index, 'characters')}
                className="btn btn-outline-danger btn-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button type="submit" className="btn btn-outline-primary me-2">Create Campaign</button>
        <button type="button" onClick={onClose} className="btn btn-outline-secondary">Cancel</button>
      </form>
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
};

export default AddCampaignForm;
