import { useEffect } from 'react';
import AppRoutes from './routes/routes';
import { Provider, useDispatch } from 'react-redux';
import { persistor, store } from './redux/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from '@emotion/react';
import { themes, createThemes } from './theme';
import { CssBaseline } from '@mui/material';
import { I18nextProvider } from 'react-i18next';
import i18n from './utils/i18n';
import { useGetBrandingQuery } from './services/brandingApi';
import { setBranding } from './redux/slices/brandingSlice';
import { useBranding } from './hooks/useBranding';

function BrandingLoader() {
  const dispatch = useDispatch();
  const { config } = useBranding();
  const { data } = useGetBrandingQuery();

  useEffect(() => {
    if (data && 'data' in data && data.data) {
      dispatch(setBranding(data.data));
      const overrides = data.data.copyOverrides || {};
      Object.entries(overrides).forEach(([lang, keys]) => {
        i18n.addResourceBundle(lang, 'translation', keys, true, true);
      });
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (config?.appName) {
      document.title = config.tagline
        ? `${config.appName} | ${config.tagline}`
        : config.appName;
    }
  }, [config]);

  const activeTheme = config
    ? createThemes(
        config.colorsLight,
        config.colorsDark,
        config.fontFamily,
        config.buttonBorderRadius,
      ).light
    : themes.light;

  return (
    <ThemeProvider theme={activeTheme}>
      <CssBaseline />
      <AppRoutes />
    </ThemeProvider>
  );
}

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrandingLoader />
        </PersistGate>
      </Provider>
    </I18nextProvider>
  );
}

export default App;
