import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Layout } from '@/Components';
import { CharacterList, CharacterPage, NotFoundPage } from '@/Pages';

import '@Components/Content/Content.css';
import '@Components/FilterInput/TextField.css';
import './index.css';

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
