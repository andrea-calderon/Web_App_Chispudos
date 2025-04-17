import { UserLayout } from '../../../../components/templates/UserLayout';
import ProfileTabs from '../organisms/ProfileTabs';

export const ProfilePage = () => {
  return (
    <UserLayout>
      <ProfileTabs />
    </UserLayout>
  );
};
