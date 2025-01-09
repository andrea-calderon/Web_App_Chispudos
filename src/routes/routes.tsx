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
import { SearchServicesPage } from '../features/Services/components/pages/SearchServicesPage';
import { ServiceDetailPage } from '../features/Services/components/pages/ServiceDetailPage';
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
          {/* Public Routes */}
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
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/search-services" element={<SearchServicesPage />} />
            <Route path="/services/:id" element={<ServiceDetailPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default AppRoutes;
