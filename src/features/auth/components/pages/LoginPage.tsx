import { useAppSelector } from '../../../../hooks/useAppSelector';
import { loginSuccess, selectAuth } from '../../../../redux/slices/authSlice';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { useGetExampleDataQuery } from '../../../../services/api';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector(selectAuth);
  const { data } = useGetExampleDataQuery();
  const navigate = useNavigate();
  const handleLogin = () => {
    console.log('Login button clicked');
    // Simulate a login API call
    const user = { id: '1', name: 'John Doe', email: 'john.doe@example.com' };
    dispatch(loginSuccess(user));
    navigate('/home');
    console.error('Login button clicked', authState);
  };
  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};
