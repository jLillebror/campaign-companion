"use client";

import React, { useState, useEffect } from 'react';
import LoginForm from '../Components/Form/LoginForm';
import { login, logout, isLoggedIn as checkIsLoggedIn } from '../Utils/login/auth';
import { fetchData } from '@/Utils/api';
import CampaignsList from '@/Components/Campaign/CampaignsList';

const HomePage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    if (checkIsLoggedIn()) {
      setIsLoggedIn(true);
      loadCampaigns(); // Call loadCampaigns function when user is logged in
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      setIsLoggedIn(true);
      setError('');
      loadCampaigns(); // Call loadCampaigns function after successful login
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setCampaigns([]);
  };

  const loadCampaigns = async () => {
    try {
      const data = await fetchData();
      setCampaigns(data.campaigns);
    } catch (error) {
      console.error('Failed to fetch campaigns:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="mt-5">Welcome to Campaign Companion!</h1>

      {!isLoggedIn ? (
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          error={error}
          handleSubmit={handleLogin}
        />
      ) : (
        <>
          <p>You are logged in.
            Please continue onto Campaigns, Characters or Notes!
          </p>
          <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
          {campaigns && <CampaignsList campaigns={campaigns} />}
        </>
      )}
    </div>
  );
};

export default HomePage;
