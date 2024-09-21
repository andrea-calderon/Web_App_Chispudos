import React from 'react';
import { useNavigate } from 'react-router-dom';

export const ProfilePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Profile Page</h1>
      <button onClick={() => navigate('/home')}>Home</button>
      <button onClick={() => navigate('/')}>Landing</button>
    </div>
  );
};
