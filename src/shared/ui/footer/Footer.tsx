import { useTranslation } from 'react-i18next';

import './Footer.css';

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="footer">
      <p>{t('footer.madeWithLove')} Sashamak0211</p>
    </footer>
  );
};
