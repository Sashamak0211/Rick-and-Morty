import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import { CharacterList, CharacterPage, NotFoundPage } from '@/pages';
import { Layout } from '@/shared';

function App() {
  const { t, i18n } = useTranslation();

  console.log('CURRENT LANG =', i18n.language);
  console.log('TEST TRANSLATION =', t('gender_male'));
  return (
    <>
      <Router basename="/Rick-and-Morty/">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<CharacterList />} />
            <Route path="character/:id" element={<CharacterPage />} />
            <Route path="/404" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
