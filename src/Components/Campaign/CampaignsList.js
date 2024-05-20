import React, { useState, useEffect } from 'react';
import { fetchData, deleteCampaign } from '@/Utils/api';
import CampaignCard from '@/Components/Campaign/CampaignCard';

const CampaignsList = ({ campaigns, onDelete }) => {
  return (
    <div>
      {campaigns.length === 0 ? (
        <p>No campaigns found.</p>
      ) : (
        <div>
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign.campaignId} campaign={campaign} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CampaignsList;
