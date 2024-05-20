// src/Utils/login/auth.js
"use client";

export const login = async (username, password) => {
  if (username === 'user' && password === 'password') {
    localStorage.setItem('loggedIn', 'true');
    return;
  } else {
    throw new Error('Invalid username or password');
  }
};

export const logout = () => {
  localStorage.removeItem('loggedIn');
};

export const isLoggedIn = () => {
  return localStorage.getItem('loggedIn') === 'true';
};
