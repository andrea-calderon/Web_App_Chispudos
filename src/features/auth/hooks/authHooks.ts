import { useAppSelector } from '../../../hooks/useAppSelector';
import { selectAuth } from '../../../redux/slices/authSlice';

const useUserRole = () => {
  const authState = useAppSelector(selectAuth);

  if (!authState?.user || !authState.user.roles) {
    return null; 
  }

  const roleNames = authState.user.roles.map((role) => role.name.toLowerCase());

  return roleNames;
};

export { useUserRole };