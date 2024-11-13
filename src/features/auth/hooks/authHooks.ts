import { useAppSelector } from '../../../hooks/useAppSelector';
import { selectAuth } from '../../../redux/slices/authSlice';

const useAuthenticated = () => {
  const authState = useAppSelector(selectAuth);
  return authState.isAuthenticated;
};

export { useAuthenticated };
