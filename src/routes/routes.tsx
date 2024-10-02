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
import { useAppSelector } from '../hooks/useAppSelector';
import { selectAuth } from '../redux/slices/authSlice';
import { ProfilePage } from '../features/profile/components/pages/ProfilePage';
import { RegisterPage } from '../features/auth/components/pages/RegisterPage';
import FeatureWarranty from '../components/organisms/FeatureWarranty';
import TestimonialsSection from '../components/organisms/TestimonialsSection';
import DownloadAppSection from '../components/organisms/DownloadAppSection';

const AppRoutes = () => {
  const authState = useAppSelector(selectAuth);
  return (
    <div>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<LandingPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoutesWrapper />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </Router>
      <FeatureWarranty />
      <TestimonialsSection />
      <DownloadAppSection />
    </div>
  );
};

export default AppRoutes;
