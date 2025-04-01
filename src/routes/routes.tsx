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
import { TaskDetailsPage } from '../features/Services/components/pages/TaskDetailsPage';
import { useAppSelector } from '../hooks/useAppSelector';
import { selectAuth } from '../redux/slices/authSlice';
import PasswordRecovery from '../features/auth/components/pages/PasswordRecovery';
import RegisterPage from '../features/auth/components/pages/RegisterPage';
import ErrorPage from '../components/organisms/ErrorPage';
import { BusinessStepper } from '../features/Business/Components/pages/BusinessStepperPage';
import { BusinessProfilePage } from '../features/Business/Components/pages/BusinessProfilePage';
import ErrorBoundaryWrapper from '../components/Generics/ErrorBoundaryWrapper';

const AppRoutes = () => {
  const { isAuthenticated } = useAppSelector(selectAuth);

  return (
    <div>
      <Router>
        <ErrorBoundaryWrapper>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/login"
              element={
                isAuthenticated ? <Navigate to="/home" /> : <LoginPage />
              }
            />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/password-recovery" element={<PasswordRecovery />} />

            {/* Publicly accessible pages (FIX) */}
            <Route path="/home" element={<HomePage />} />
            <Route path="/search-services" element={<SearchServicesPage />} />
            <Route path="/services/:id" element={<ServiceDetailPage />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoutesWrapper />}>
              <Route path="/service-details" element={<TaskDetailsPage />} />
              <Route path="/stepper" element={<BusinessStepper />} />
              <Route path="/profile" element={<BusinessProfilePage />} />
            </Route>

            {/* Error Page */}
            <Route path="*" element={<ErrorPage errorCode="404" />} />
          </Routes>
        </ErrorBoundaryWrapper>
      </Router>
    </div>
  );
};

export default AppRoutes;
