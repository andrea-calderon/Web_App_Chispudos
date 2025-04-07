import { useAppSelector } from '../../../hooks/useAppSelector';
import { selectAuth } from '../../../redux/slices/authSlice';
import { RoleMap } from '../../../types/api/apiResponses';

const useAuthenticated = () => {
  const authState = useAppSelector(selectAuth);
  return authState.isAuthenticated;
};

// Nuevo hook para obtener el rol del usuario
const useUserRole = () => {
  const authState = useAppSelector(selectAuth);
  const roleNumber = authState.user?.role; // Obtener el número del rol
  return roleNumber ? RoleMap[roleNumber] : null; // Mapear a 'user', 'service' o 'admin'
};

export { useAuthenticated, useUserRole };
