import { UserLayout } from '../../../../components/templates/UserLayout';
import TaskTabs from '../organisms/TaskTabs';

export const TasksPage = () => {
  return (
    <UserLayout>
      <TaskTabs />
    </UserLayout>
  );
};
