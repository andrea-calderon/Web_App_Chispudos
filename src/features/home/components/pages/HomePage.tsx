// import { useAppSelector } from '../../../../hooks/useAppSelector';
// import { useGetExampleDataQuery } from '../../../../services/api';
// import { selectAuth } from '../../../../redux/slices/authSlice';
import { UserLayout } from '../../../../components/templates/UserLayout';
import SearchBarWithFilters from '../../../../components/organisms/SearchBar';

export const HomePage = () => {
  // const authState = useAppSelector(selectAuth);
  // const { data } = useGetExampleDataQuery();
  return (
    <UserLayout>
      <h1>Home Page</h1>
      <SearchBarWithFilters />
      {/* <pre>{JSON.stringify(authState, null, 2)}</pre>
      <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </UserLayout>
  );
};
