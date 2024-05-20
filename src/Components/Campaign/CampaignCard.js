import React, { useState, useEffect } from 'react';
import { deleteCampaign, updateCampaign, fetchCharacters } from '@/Utils/api';
import DeleteCampaign from '@/Components/Campaign/DeleteCampaign';

const CampaignCard = ({ campaign, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    ...campaign,
    characters: Array.isArray(campaign.characters) ? campaign.characters : [],
  });
  const [availableCharacters, setAvailableCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        const charactersData = await fetchCharacters();

        const characters = charactersData.$values || [];
        
        setAvailableCharacters(characters);

        // Filter characters to only include those that belong to this campaign
        const campaignCharacters = characters.filter(character => character.campaignId === campaign.campaignId);
        console.log('Filtered campaign characters:', campaignCharacters);
        
        setFormData(prevData => ({
          ...prevData,
          characters: campaignCharacters,
        }));
      } catch (error) {
        console.error('Error fetching characters:', error);
        setError(error.message);
      }
    };

    setFormData({
      ...campaign,
      characters: Array.isArray(campaign.characters) ? campaign.characters : [],
    });

    loadCharacters();
  }, [campaign]);

  const handleDelete = async () => {
    try {
      await deleteCampaign(campaign.campaignId);
      onDelete(campaign.campaignId); // Call the prop function to remove the campaign
    } catch (error) {
      console.error('Failed to delete campaign:', error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormData({
      ...campaign,
      characters: Array.isArray(campaign.characters) ? campaign.characters : [],
    }); // Reset form data to original campaign details
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddCharacter = (characterId) => {
    const character = availableCharacters.find(c => c.characterId === characterId);
    if (character) {
      setFormData((prevData) => ({
        ...prevData,
        characters: [...prevData.characters, character],
      }));
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
      await updateCampaign(campaign.campaignId, formData);
      setError(null);
      setIsEditing(false);
      onUpdate({ ...formData, campaignId: campaign.campaignId });
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
              {/* Form fields */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
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
                  onChange={handleFormChange}
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
                  onChange={handleFormChange}
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
                  onChange={handleFormChange}
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
                <label htmlFor="additionalNotes" className="form-label">Miscellaneous:</label>
                <textarea
                  id="additionalNotes"
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleFormChange}
                  className="form-control"
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="characters" className="form-label">Characters:</label>
                <select
                  value={selectedCharacter}
                  onChange={(e) => setSelectedCharacter(e.target.value)}
                  className="form-select"
                >
                  <option value="">Select Character</option>
                  {availableCharacters.map((character) => (
                    <option key={character.characterId} value={character.characterId}>
                      {character.name}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => handleAddCharacter(selectedCharacter)}
                  className="btn btn-outline-secondary mt-2"
                >
                  Add Character
                </button>
                {formData.characters.map((character, index) => (
                  <div key={index} className="d-flex justify-content-between mt-2">
                    <span>{character.name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem('characters', index)}
                      className="btn btn-outline-danger btn-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <button type="submit" className="btn btn-outline-primary me-2">Save</button>
              <button type="button" onClick={handleCancelEdit} className="btn btn-outline-secondary">Cancel</button>
              {error && <p className="text-danger">{error}</p>}
            </form>
          ) : (
            <>
              <h5 className="card-title"><strong>{campaign.name}</strong></h5>
              <p className="card-text">{campaign.description}</p>
              <p className="card-text"><strong>Game System:</strong> {campaign.gameSystem}</p>
              <p className="card-text"><strong>Setting:</strong> {campaign.campaignSetting}</p>
              <p className="card-text"><strong>Miscellaneous:</strong> {campaign.additionalNotes}</p>
              <p className="card-text"><strong>Characters:</strong> {formData.characters.length > 0 ? formData.characters.map(character => character.name).join(', ') : 'None'}</p>
            </>
          )}
        </div>
        <div className="card-footer d-flex justify-content-between">
          {isEditing ? null : (
            <>
              <button onClick={handleEditClick} className="btn btn-outline-primary">Edit</button>
              <DeleteCampaign onDelete={handleDelete} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
