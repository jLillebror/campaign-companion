const API_URL = 'https://localhost:7051';
const USERNAME = 'user';
const PASSWORD = 'password';

const getBasicAuthHeaders = () => {
  const basicAuth = btoa(`${USERNAME}:${PASSWORD}`);
  return {
    'Authorization': `Basic ${basicAuth}`,
    'Content-Type': 'application/json',
  };
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorResponse = await response.json().catch(() => ({
      title: 'An unexpected error occurred',
    }));
    throw new Error(errorResponse.title || 'Failed to process the request');
  }
  if (response.status === 204) {
    return {};
  }
  return response.json();
};

export const fetchData = async () => {
  const response = await fetch(`${API_URL}/api/campaigns`, {
    method: 'GET',
    headers: getBasicAuthHeaders(),
  });
  return handleResponse(response);
};

export const deleteCampaign = async (campaignId) => {
  const response = await fetch(`${API_URL}/api/campaigns/${campaignId}`, {
    method: 'DELETE',
    headers: getBasicAuthHeaders(),
  });
  return handleResponse(response);
};

export const createCampaign = async (campaign) => {
  const response = await fetch(`${API_URL}/api/campaigns`, {
    method: 'POST',
    headers: getBasicAuthHeaders(),
    body: JSON.stringify(campaign),
  });
  return handleResponse(response);
};

export const updateCampaign = async (campaignId, campaignData) => {
  const response = await fetch(`${API_URL}/api/campaigns/${campaignId}`, {
    method: 'PUT',
    headers: getBasicAuthHeaders(),
    body: JSON.stringify(campaignData),
  });
  return handleResponse(response);
};

export const fetchCharacters = async () => {
  const response = await fetch(`${API_URL}/api/characters`, {
    method: 'GET',
    headers: getBasicAuthHeaders(),
  });
  const data = await handleResponse(response);
  return data.$values || []; // Return the $values array or an empty array if not present
};

export const fetchCampaigns = async () => {
  const response = await fetch(`${API_URL}/api/campaigns`, {
    method: 'GET',
    headers: getBasicAuthHeaders(),
  });
  return handleResponse(response);
};

export const fetchNotes = async () => {
  const response = await fetch(`${API_URL}/api/notes`, {
    method: 'GET',
    headers: getBasicAuthHeaders(),
  });
  return handleResponse(response);
};

export const addCharacter = async (characterData) => {
  const response = await fetch(`${API_URL}/api/characters`, {
    method: 'POST',
    headers: getBasicAuthHeaders(),
    body: JSON.stringify(characterData),
  });
  return handleResponse(response);
};

export const updateCharacter = async (characterId, characterData) => {
  const response = await fetch(`${API_URL}/api/characters/${characterId}`, {
    method: 'PUT',
    headers: getBasicAuthHeaders(),
    body: JSON.stringify(characterData),
  });
  return handleResponse(response);
};

export const deleteCharacter = async (characterId) => {
  const response = await fetch(`${API_URL}/api/characters/${characterId}`, {
    method: 'DELETE',
    headers: getBasicAuthHeaders(),
  });
  return handleResponse(response);
};

export const addNote = async (noteData) => {
  const response = await fetch(`${API_URL}/api/notes`, {
    method: 'POST',
    headers: getBasicAuthHeaders(),
    body: JSON.stringify(noteData),
  });
  return handleResponse(response);
};

export const updateNote = async (noteId, noteData) => {
  const response = await fetch(`${API_URL}/api/notes/${noteId}`, {
    method: 'PUT',
    headers: getBasicAuthHeaders(),
    body: JSON.stringify(noteData),
  });
  return handleResponse(response);
};

export const deleteNote = async (noteId) => {
  const response = await fetch(`${API_URL}/api/notes/${noteId}`, {
    method: 'DELETE',
    headers: getBasicAuthHeaders(),
  });
  return handleResponse(response);
};
