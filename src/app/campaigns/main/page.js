"use client";

import React, { useEffect, useState } from 'react';
import { fetchData } from '@/Utils/api';
import CampaignsList from '@/Components/Campaign/CampaignsList';
import AddCampaignForm from '@/Components/Form/AddCampaignForm';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CampaignPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const loadCampaigns = async () => {
      try {
        const data = await fetchData();
        console.log('Fetched campaigns:', data); // Debugging line
        const transformedData = Array.isArray(data) ? data : data.$values || [];
        setCampaigns(transformedData); // Ensure data is correctly set as an array
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadCampaigns();
  }, []);

  const handleAddCampaignSuccess = (newCampaign) => {
    setCampaigns((prevCampaigns) => [...prevCampaigns, newCampaign]);
  };

  const handleCampaignDelete = (campaignId) => {
    setCampaigns((prevCampaigns) => prevCampaigns.filter((campaign) => campaign.campaignId !== campaignId));
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
        <h1>Campaigns</h1>
        <button className="btn btn-primary" onClick={handleShowForm}>
          Create Campaign
        </button>
      </div>
      {showForm && (
        <AddCampaignForm
          onClose={handleCloseForm}
          onSuccess={handleAddCampaignSuccess}
        />
      )}
      <CampaignsList
        campaigns={campaigns}
        onDelete={handleCampaignDelete}
      />
    </div>
  );
}
