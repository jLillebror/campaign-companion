import React, { useState, useEffect } from 'react';
import { addCharacter, fetchCampaigns } from '@/Utils/api';

const AddCharacterForm = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    class: '',
    level: '',
    strength: '',
    dexterity: '',
    constitution: '',
    intelligence: '',
    wisdom: '',
    charisma: '',
    armorClass: '',
    hitPoints: '',
    biography: '',
    miscellaneous: '',
    campaignId: null,
  });
  const [availableCampaigns, setAvailableCampaigns] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const loadCampaigns = async () => {
      try {
        const campaigns = await fetchCampaigns();
        if (campaigns?.$values) {
          setAvailableCampaigns(campaigns.$values);
        } else {
          setAvailableCampaigns([]);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    loadCampaigns();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'campaignId' ? (value ? parseInt(value, 10) : null) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await addCharacter(formData);
      setError(null);
      setSuccess('Character added successfully');
      setFormData({
        name: '',
        class: '',
        level: '',
        strength: '',
        dexterity: '',
        constitution: '',
        intelligence: '',
        wisdom: '',
        charisma: '',
        armorClass: '',
        hitPoints: '',
        biography: '',
        miscellaneous: '',
        campaignId: null,
      });
      onSuccess(data);
      onClose();
    } catch (error) {
      setError(error.message);
      setSuccess(null);
    }
  };

 
  return (
    <div className="d-flex justify-content-center">
      <div className="w-50">
        <h2>Add New Character</h2>
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
            <label htmlFor="class" className="form-label">Class:</label>
            <select
              id="class"
              name="class"
              value={formData.class}
              onChange={handleChange}
              required
              className="form-select"
            >
              <option value="">Select Class</option>
              <option value="Artificer">Artificer</option>
              <option value="Barbarian">Barbarian</option>
              <option value="Bard">Bard</option>
              <option value="Cleric">Cleric</option>
              <option value="Druid">Druid</option>
              <option value="Fighter">Fighter</option>
              <option value="Monk">Monk</option>
              <option value="Paladin">Paladin</option>
              <option value="Ranger">Ranger</option>
              <option value="Rogue">Rogue</option>
              <option value="Sorcerer">Sorcerer</option>
              <option value="Warlock">Warlock</option>
              <option value="Wizard">Wizard</option>
            </select>
          </div>
          {[
            { label: 'Level', type: 'number', name: 'level' },
            { label: 'Strength', type: 'number', name: 'strength' },
            { label: 'Dexterity', type: 'number', name: 'dexterity' },
            { label: 'Constitution', type: 'number', name: 'constitution' },
            { label: 'Intelligence', type: 'number', name: 'intelligence' },
            { label: 'Wisdom', type: 'number', name: 'wisdom' },
            { label: 'Charisma', type: 'number', name: 'charisma' },
            { label: 'Armor Class', type: 'number', name: 'armorClass' },
            { label: 'Hit Points', type: 'number', name: 'hitPoints' },
          ].map(({ label, type, name }) => (
            <div key={name} className="mb-3">
              <label htmlFor={name} className="form-label">{label}:</label>
              <input
                type={type}
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
          ))}
          <div className="mb-3">
            <label htmlFor="biography" className="form-label">Biography:</label>
            <textarea
              id="biography"
              name="biography"
              value={formData.biography}
              onChange={handleChange}
              className="form-control"
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="miscellaneous" className="form-label">Miscellaneous:</label>
            <textarea
              id="miscellaneous"
              name="miscellaneous"
              value={formData.miscellaneous}
              onChange={handleChange}
              className="form-control"
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="campaignId" className="form-label">Campaign:</label>
            <select
              id="campaignId"
              name="campaignId"
              value={formData.campaignId || ''}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Select Campaign</option>
              {Array.isArray(availableCampaigns) && availableCampaigns.map((campaign) => (
                <option key={campaign.campaignId} value={campaign.campaignId}>
                  {campaign.name}
                </option>
              ))}
            </select>
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-outline-primary me-2">Add Character</button>
            <button type="button" onClick={onClose} className="btn btn-outline-secondary">Cancel</button>
          </div>
        </form>
        {error && <p className="text-danger mt-2">{error}</p>}
        {success && <p className="text-success mt-2">{success}</p>}
      </div>
    </div>
  );
};

export default AddCharacterForm;