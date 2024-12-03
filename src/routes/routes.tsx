import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import ProtectedRoutesWrapper from '../components/molecules/ProtectedRoutesWrapper';
import { LoginPage } from '../features/auth/components/pages/LoginPage';
import { LandingPage } from '../features/landing/components/pages/LandingPage';
import { HomePage } from '../features/home/components/pages/HomePage';
import { SearchProfessionalPage } from '../features/searchProfessional/components/pages/SearchProfessionalPage';
import { useAppSelector } from '../hooks/useAppSelector';
import { selectAuth } from '../redux/slices/authSlice';
import { ProfilePage } from '../features/profile/components/pages/ProfilePage';
import PasswordRecovery from '../features/auth/components/pages/PasswordRecovery';
import RegisterPage from '../features/auth/components/pages/RegisterPage';

const AppRoutes = () => {
  const { isAuthenticated } = useAppSelector(selectAuth);
  return (
    <div>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/home" /> : <LoginPage />}
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/password-recovery" element={<PasswordRecovery />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoutesWrapper />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route
              path="/search-professional"
              element={<SearchProfessionalPage />}
            />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default AppRoutes;
