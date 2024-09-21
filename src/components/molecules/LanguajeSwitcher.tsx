import React from 'react';
import { useTranslation } from 'react-i18next';
const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const changeLanguage = (lng: string) => {
    //console.log(`Changing language to: ${lng}`);
    i18n.changeLanguage(lng);
  };
  return (
    <div>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('es')}>Español</button>
    </div>
  );
};
export default LanguageSwitcher;
