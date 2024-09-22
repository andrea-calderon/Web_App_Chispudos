import { useNavigate } from 'react-router-dom';
import { UserLayout } from '../../../../components/templates/UserLayout';

export const ProfilePage = () => {
  const navigate = useNavigate();
  return (
    <UserLayout>
      <h1>Profile Page</h1>
      <button onClick={() => navigate('/home')}>Home</button>
      <button onClick={() => navigate('/')}>Landing</button>
    </UserLayout>
  );
};
