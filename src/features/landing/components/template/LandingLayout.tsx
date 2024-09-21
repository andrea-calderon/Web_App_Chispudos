import React from 'react';

import { ReactNode } from 'react';
import ResponsiveAppBar from '../organisms/AppBar';
import LanguageSwitcher from '../../../../components/molecules/LanguajeSwitcher';
import { useTranslation } from 'react-i18next';

interface Props {
  children: ReactNode;
}

export const LandingLayout = ({ children }: Props) => {
  const { t } = useTranslation();
  return (
    <div>
      <ResponsiveAppBar />
      <LanguageSwitcher />

      <h1>{t('welcome')}</h1>
      <button>{t('login')}</button>
      {children}
    </div>
  );
};
