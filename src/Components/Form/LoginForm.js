"use client";

import React from 'react';

const LoginForm = ({ username, setUsername, password, setPassword, error, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">Login</button>

      {error && <p className="text-danger mt-2">{error}</p>}
    </form>
  );
};

export default LoginForm;
