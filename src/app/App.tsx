import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { CharacterList, CharacterPage, NotFoundPage } from '@/pages';
import { Layout } from '@/shared';

import '@/shared/ui/content/Content.css';
import '@/shared/ui/text-field/TextField.css';
import '../index.css';

function App() {
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
