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
import { ForgotPasswordPage } from '../features/auth/components/pages/ForgotPasswordPage';
import { SetNewPasswordPage } from '../features/auth/components/pages/SetNewPasswordPage';
import { OTPVerificationPage } from '../features/auth/components/pages/OTPVerificationPage';

const AppRoutes = () => {
  const authState = useAppSelector(selectAuth);
  return (
    <div>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/otp-verification" element={<OTPVerificationPage />} />
          <Route path="/set-new-password" element={<SetNewPasswordPage />} />
          <Route path="/" element={<LandingPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoutesWrapper />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default AppRoutes;
