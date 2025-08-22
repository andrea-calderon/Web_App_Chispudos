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
import ErrorBoundaryWrapper from '../components/Generics/ErrorBoundaryWrapper';
import { TasksPage } from '../features/tasks/components/pages/TaskPage';
import { FavoritesPage } from '../features/favorites/components/pages/FavoritesPage';
import { ProfilePage } from '../features/profile/components/pages/ProfilePage';
import TermsAndConditions from '../features/auth/components/pages/TermsAndConditions';
import BusinessProfilePage from '../features/Business/Components/Organisms/BusinessProfile';
import PrivacyPolicy from '../features/auth/components/pages/PrivacyPolicy';
import ChatsComponent from '../features/Business/Components/Organisms/ChatsComponent';

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
            <Route
              path="/terms-and-conditions"
              element={<TermsAndConditions />}
            />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />

            {/* Publicly accessible pages (FIX) */}
            <Route path="/home" element={<HomePage />} />
            <Route path="/search-services" element={<SearchServicesPage />} />
            <Route path="/services/:id" element={<ServiceDetailPage />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoutesWrapper />}>
              <Route path="/service-details" element={<TaskDetailsPage />} />
              <Route path="/addProduct" element={<BusinessStepper />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/myProducts" element={<BusinessProfilePage />} />
              <Route path="/messages" element={<ChatsComponent />} />
              <Route path="/messages/:chatId" element={<ChatsComponent />} />
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
