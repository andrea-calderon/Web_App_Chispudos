import React from 'react';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { useGetExampleDataQuery } from '../../../../services/api';
import { selectAuth } from '../../../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const navigate = useNavigate();
  const authState = useAppSelector(selectAuth);
  const { data } = useGetExampleDataQuery();
  const handleProfile = () => {
    navigate('/profile');
  };
  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={handleProfile}>Profile</button>
      <pre>{JSON.stringify(authState, null, 2)}</pre>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};
