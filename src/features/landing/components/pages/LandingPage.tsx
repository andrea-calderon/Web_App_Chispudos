import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LandingLayout } from '../template/LandingLayout';

export const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <LandingLayout>
      <h1>Landing Page</h1>
      <button onClick={() => navigate('/login')}>Login</button>
      <button onClick={() => navigate('/register')}>Register</button>
    </LandingLayout>
  );
};
