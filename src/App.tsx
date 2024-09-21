import AppRoutes from './routes/routes';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';
import { ThemeProvider } from '@emotion/react';
import { themes } from './theme';
import { CssBaseline } from '@mui/material';
import { I18nextProvider } from 'react-i18next';
import i18n from './utils/i18n';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <ThemeProvider theme={themes.light}>
          <CssBaseline />
          <AppRoutes />
        </ThemeProvider>
      </Provider>
    </I18nextProvider>
  );
}

export default App;
