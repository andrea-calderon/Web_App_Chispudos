import AppRoutes from './routes/routes';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';
import { ThemeProvider } from '@emotion/react';
import { themes } from './theme';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={themes.light}>
        <AppRoutes />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
